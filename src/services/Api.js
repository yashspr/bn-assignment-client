import axios from 'axios'
import { EventBus } from './EventBus'
import router from '../router'
import store from '../store'
import jwtDecode from 'jwt-decode'

const instance = axios.create({
	baseURL: 'http://localhost:5000/',
	timeout: 1000
})

instance.interceptors.response.use(
	function(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	function(error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error.response.status === 401) {
			if (store.state.user) {
				EventBus.$emit('show-main-alert', {
					message:
						'Your JWT Token has expired or you are trying to access a protected route. Please login'
				})
				store.commit('setUser', null)
				window.localStorage.removeItem('accessToken')
			}
			storeAccessTokenInLocal(null)
			router.replace({ path: '/' })
		}

		return Promise.reject(error)
	}
)

export const setAccessToken = token => {
	if (token) {
		instance.defaults.headers = {
			...instance.defaults.headers,
			Authorization: `Bearer ${token}`
		}
		storeAccessTokenInLocal(token)
	} else {
		if (instance.defaults.headers.Authorization) {
			delete instance.defaults.headers.Authorization
		}
	}
}

/* Customer Routes */

export const customerLogin = data => {
	return instance.post('/customer/login', data)
}

export const customerSignup = data => {
	return instance.post('/customer/signup', data)
}

export const deposit = data => {
	return instance.post('/customer/deposit', data)
}

export const withdraw = data => {
	return instance.post('/customer/withdraw', data)
}

export const getTransactions = () => {
	return instance.get('/customer/transactions')
}

export const getUserDetails = () => {
	return instance.get('/customer/user')
}

/* Banker Routes */

export const bankerLogin = data => {
	return instance.post('/banker/login', data)
}

export const bankerSignup = data => {
	return instance.post('/banker/signup', data)
}

export const getTransactionsById = data => {
	return instance.get(`/banker/transactions/${data.id}`)
}

export const getTotalAmount = () => {
	return instance.get('/banker/balance/all')
}

export const getAllCustomers = () => {
	return instance.get('/banker/customers')
}

export const getBankerDetails = () => {
	return instance.get('/banker/user')
}

/* Function To Store and Retrieve Access Token in session storage */

function storeAccessTokenInLocal(token) {
	window.localStorage.setItem('accessToken', token)
}

function getAccessTokenInLocal() {
	return window.localStorage.getItem('accessToken')
}

/* Run When the page loads for first time */

;(async function() {
	if (getAccessTokenInLocal()) {
		const token = getAccessTokenInLocal()
		const decoded = jwtDecode(token)
		setAccessToken(token)
		try {
			let response = null
			if (decoded.type === 'CUSTOMER') {
				response = await getUserDetails()
			} else if (decoded.type === 'BANKER') {
				response = await getBankerDetails()
			}
			store.commit('setUser', response.data)
		} catch (err) {}
	}
})()
