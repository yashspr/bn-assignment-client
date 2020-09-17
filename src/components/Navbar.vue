<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand href="#" @click="goHome"
				>Binary Numbers Assignment</b-navbar-brand
			>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse v-if="!user" id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-button
						v-b-modal.bankermodal
						size="sm"
						class="my-2 my-sm-0 mx-2"
						>Banker</b-button
					>
					<b-button
						v-b-modal.customermodal
						size="sm"
						class="my-2 my-sm-0"
						>Customer</b-button
					>

					<BankerModal id="bankermodal" />
					<CustomerModal id="customermodal" />
				</b-navbar-nav>
			</b-collapse>

			<b-collapse
				v-if="user && user.type === 'CUSTOMER'"
				id="nav-collapse"
				is-nav
			>
				<b-navbar-nav class="ml-auto">
					<b-button
						size="sm"
						class="my-2 my-sm-0 mx-2"
						@click="goToTransactions"
						>Transactions</b-button
					>

					<b-button
						size="sm"
						class="my-2 my-sm-0 mx-2"
						@click="goToAccounts"
						>Accounts</b-button
					>

					<b-button
						v-b-modal.customermodal
						size="sm"
						class="my-2 my-sm-0 mx-2"
						type="submit"
						@click="logout"
						>Logout</b-button
					>

					<b-badge variant="secondary" class="balance"
						>Your Balance: {{ user.balance }}</b-badge
					>
				</b-navbar-nav>
			</b-collapse>

			<b-collapse
				v-if="user && user.type === 'BANKER'"
				id="nav-collapse"
				is-nav
			>
				<b-navbar-nav class="ml-auto">
					<b-button
						v-b-modal.customermodal
						size="sm"
						class="my-2 my-sm-0 mx-2"
						type="submit"
						@click="logout"
						>Logout</b-button
					>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import BankerAuthModal from './BankerAuthModal'
import CustomerAuthModal from './CustomerAuthModal'
import { mapState } from 'vuex'
import { setAccessToken } from '../services/Api'

export default {
	name: 'Navbar',
	components: {
		BankerModal: BankerAuthModal,
		CustomerModal: CustomerAuthModal
	},
	computed: mapState({
		user: 'user'
	}),
	methods: {
		goHome: function() {
			this.$router.push({ path: '/' })
		},
		goToTransactions: function() {
			this.$router.push({ path: '/customer/transactions' })
		},
		goToAccounts: function() {
			this.$router.push({ path: '/customer/accounts' })
		},
		goToBankerTransactions: function() {},
		logout: function() {
			this.$store.commit('setUser', null)
			setAccessToken(null)
			this.$router.replace({ path: '/' })
		}
	}
}
</script>

<style scoped>
.balance {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
