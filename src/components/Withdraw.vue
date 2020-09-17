<template>
	<div class="m-5">
		<h2 class="mb-4">Withdraw</h2>
		<b-alert
			v-model="alert.show"
			:variant="alert.type"
			class="my-3"
			dismissible
			>{{ alert.message }}</b-alert
		>
		<div class="m-auto">
			<b-form @submit="onSubmit">
				<b-form-group
					id="input-group-1"
					label="Amount To Withdraw:"
					label-for="input-1"
				>
					<b-form-input
						id="input-1"
						v-model="amount"
						type="number"
						step="0.01"
						min="0.01"
						required
						number
						no-wheel
						placeholder="Enter email"
					></b-form-input>
				</b-form-group>

				<b-button variant="primary" type="submit">Withdraw</b-button>
			</b-form>
		</div>
	</div>
</template>

<script>
import { withdraw } from '../services/Api'
import { validateNumber } from '../utils/forms'

export default {
	name: 'Withdraw',
	data: () => ({
		amount: 0,
		alert: {
			show: false,
			message: '',
			type: 'primary'
		}
	}),
	methods: {
		onSubmit: async function(event) {
			event.preventDefault()
			if (!validateNumber(this.amount, this.alert)) {
				this.amount = 0
				return
			}
			try {
				const response = await withdraw({ amount: this.amount })
				if (response.status === 200) {
					this.alert.message = 'Successfully Withdrawed'
					this.alert.type = 'primary'
					this.$store.commit('setBalance', response.data.newBalance)
				}
			} catch (err) {
				this.alert.message = err.response.data.message
				this.alert.type = 'danger'
			}
			this.alert.show = true
		}
	}
}
</script>
