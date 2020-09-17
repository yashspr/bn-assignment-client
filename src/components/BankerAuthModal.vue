<template>
	<b-modal
		@hidden="reset"
		v-model="visible"
		hide-footer
		:id="id"
		title="Banker"
	>
		<b-nav pills class="justify-content-center">
			<b-nav-item :active="showLogin" @click="showLogin = true"
				>Login</b-nav-item
			>
			<b-nav-item :active="!showLogin" @click="showLogin = false"
				>Signup</b-nav-item
			>
		</b-nav>
		<b-alert
			v-model="alert.show"
			:variant="alert.type"
			class="my-3"
			dismissible
			>{{ alert.message }}</b-alert
		>
		<div v-if="showLogin">
			<b-form @submit="onLoginHandler">
				<b-form-group
					id="input-group-1"
					label="Email address:"
					label-for="email"
				>
					<b-form-input
						id="email"
						v-model="login.email"
						type="email"
						required
						placeholder="Enter email"
					></b-form-input>
				</b-form-group>

				<b-form-group
					id="input-group-2"
					label="Your Password:"
					label-for="password"
				>
					<b-form-input
						id="password"
						type="password"
						v-model="login.password"
						required
						placeholder="Enter password"
					></b-form-input>
				</b-form-group>
				<b-button type="submit" variant="primary">Submit</b-button>
			</b-form>
		</div>
		<div v-if="!showLogin">
			<b-form @submit="onSignupHandler">
				<b-form-group
					id="input-group-1"
					label="Your name:"
					label-for="name"
				>
					<b-form-input
						id="name"
						v-model="signup.name"
						type="text"
						required
						placeholder="Enter Name"
					></b-form-input>
				</b-form-group>

				<b-form-group
					id="input-group-1"
					label="Email address:"
					label-for="email"
				>
					<b-form-input
						id="email"
						v-model="signup.email"
						type="email"
						required
						placeholder="Enter email"
					></b-form-input>
				</b-form-group>

				<b-form-group
					id="input-group-2"
					label="Your Password:"
					label-for="password"
				>
					<b-form-input
						id="password"
						type="password"
						v-model="signup.password"
						required
						placeholder="Enter password"
					></b-form-input>
				</b-form-group>

				<b-form-group
					id="input-group-2"
					label="Confirm Your Password:"
					label-for="confirmpassword"
				>
					<b-form-input
						id="confirmpassword"
						type="password"
						v-model="signup.confirmPassword"
						required
						placeholder="Enter password again"
					></b-form-input>
				</b-form-group>
				<b-button type="submit" variant="primary">Submit</b-button>
			</b-form>
		</div>
	</b-modal>
</template>

<script>
import { bankerLogin, bankerSignup, setAccessToken } from '../services/Api'
import { setAlertProps } from '../utils/alerts'

export default {
	props: {
		id: String
	},
	data: () => ({
		showLogin: true,
		login: {
			email: '',
			password: ''
		},
		signup: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		alert: {
			show: false,
			type: 'primary',
			message: ''
		},
		visible: false
	}),
	methods: {
		onLoginHandler: async function() {
			event.preventDefault()
			try {
				const response = await bankerLogin({
					email: this.login.email,
					password: this.login.password
				})
				if (response.status === 200) {
					this.$store.commit('setUser', response.data.user)
					setAccessToken(response.data.token)
					this.visible = false
					setAlertProps(null, this.alert, 'Successfully logged in')
					this.$router.replace({ path: '/banker' })
				}
			} catch (err) {
				setAlertProps(err, this.alert)
			}
		},
		onSignupHandler: async function() {
			event.preventDefault()
			if (this.signup.password !== this.signup.confirmPassword) {
				setAlertProps(
					{ message: 'Make sure your passwords are matching' },
					this.alert
				)
				return
			}
			try {
				const response = await bankerSignup({
					name: this.signup.name,
					email: this.signup.email,
					password: this.signup.password
				})
				if (response.status === 201) {
					setAlertProps(
						null,
						this.alert,
						'Successfully signed up. You can now login'
					)
				}
			} catch (err) {
				setAlertProps(err, this.alert)
			}
		},
		reset: function() {
			this.login = {
				email: '',
				password: ''
			}
			this.signup = {
				email: '',
				password: '',
				confirmPassword: '',
				name: ''
			}
			this.alert = {
				show: false,
				type: 'primary',
				message: ''
			}
		}
	}
}
</script>
