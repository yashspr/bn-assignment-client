<template>
	<div class="m-5">
		<h2 class="my-4">Accounts</h2>
		<b-alert
			v-model="alert.show"
			:variant="alert.type"
			class="my-3"
			dismissible
			>{{ alert.message }}</b-alert
		>
		<b-table striped hover :items="transactions" show-empty>
			<template v-slot:empty="">
				<h4>No Transactions Found</h4>
			</template>
		</b-table>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getTransactions, getTransactionsById } from '../services/Api'
import { setAlertProps } from '../utils/alerts'

export default {
	name: 'Accounts',
	data: () => ({
		transactions: [],
		alert: {
			show: false,
			type: 'primary',
			message: ''
		}
	}),
	computed: mapState({
		user: 'user'
	}),
	props: ['userID'],
	methods: {
		async fetchTransactions() {
			if (this.user && this.user.type === 'CUSTOMER') {
				try {
					const response = await getTransactions()
					if (response.status === 200) {
						this.transactions = response.data
					}
				} catch (err) {
					setAlertProps(err, this.alert)
				}
			} else if (this.user && this.user.type === 'BANKER') {
				const id = this.userID
				try {
					const response = await getTransactionsById({ id })
					if (response.status === 200) {
						this.transactions = response.data
					}
				} catch (err) {
					setAlertProps(err, this.alert)
				}
			}
		}
	},
	mounted: function() {
		this.fetchTransactions()
	},
	watch: {
		user: function() {
			this.fetchTransactions()
		}
	}
}
</script>
