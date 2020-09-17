import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Customer from '../views/Customer.vue'
import Banker from '../views/Banker.vue'
import CustomerHome from '../components/CustomerHome.vue'
import BankerHome from '../components/BankerHome.vue'
import Accounts from '../components/Accounts.vue'
import Transactions from '../components/Transactions.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		name: 'customer',
		path: '/customer',
		component: Customer,
		children: [
			{
				name: 'customer_home',
				path: '/',
				component: CustomerHome
			},
			{
				name: 'customer_transactions',
				path: 'transactions',
				component: Transactions
			},
			{
				name: 'customer_accounts',
				path: 'accounts',
				component: Accounts
			}
		]
	},
	{
		name: 'banker',
		path: '/banker',
		component: Banker,
		children: [
			{
				name: 'banker_home',
				path: '/',
				component: BankerHome
			},
			{
				name: 'banker_accounts',
				path: 'accounts/:userID',
				component: Accounts,
				props: true
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
