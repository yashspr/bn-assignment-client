<template>
	<div class="m-5">
		<h2 class="my-4">All Customers</h2>
		<h4 class="my-4">Total Balance of All The Users: {{ total }}</h4>
		<b-alert
			v-model="alert.show"
			:variant="alert.type"
			class="my-3"
			dismissible
			>{{ alert.message }}</b-alert
		>
		<b-table
			tbody-tr-class="custom-table-row"
			striped
			hover
			@row-clicked="rowClicked"
			:items="customers"
		>
			<template v-slot:empty="">
				<h4>No Customers Found</h4>
			</template>
		</b-table>
	</div>
</template>

<script>
import { getAllCustomers, getTotalAmount } from '../services/Api'
export default {
	name: 'BankerHome',
	data: () => ({
		customers: [],
		total: 0,
		alert: {
			show: false,
			type: 'primary',
			message: ''
		}
	}),
	methods: {
		rowClicked: function(item, index, event) {
			this.$router.push({ path: `/banker/accounts/${item.id}` })
		}
	},
	mounted: async function() {
		try {
			const response = await getAllCustomers()
			if (response.status === 200) {
				this.customers = response.data
			}
			const totalBalanceResponse = await getTotalAmount()
			if (totalBalanceResponse.status === 200) {
				this.total = totalBalanceResponse.data.total
			}
		} catch (err) {
			this.alert.message = err.response.data.message
			this.alert.type = 'danger'
			this.alert.show = true
		}
	}
}
</script>

<style scoped>
.custom-table-row {
	cursor: pointer;
}
</style>
