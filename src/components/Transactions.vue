<template>
	<div class="m-5">
		<b-nav pills class="justify-content-center">
			<b-nav-item :active="withdraw" @click="withdraw = true"
				>Withdraw</b-nav-item
			>
			<b-nav-item :active="!withdraw" @click="withdraw = false"
				>Deposit</b-nav-item
			>
		</b-nav>

		<div v-if="withdraw">
			<Withdraw />
		</div>
		<div v-if="!withdraw">
			<Deposit />
		</div>
	</div>
</template>

<script>
import DepositVue from './Deposit.vue'
import WithdrawVue from './Withdraw.vue'
export default {
	name: 'Transactions',
	components: {
		Deposit: DepositVue,
		Withdraw: WithdrawVue
	},
	data: () => ({
		withdraw: true
	})
}
</script>
