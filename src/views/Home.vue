<template>
	<div class="home">
		<div v-if="!user">
			<h4 class="m-4">Please login or signup to continue</h4>
		</div>
		<div v-if="user">
			<router-view />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
	name: 'Home',
	components: {},
	data: () => ({}),
	computed: mapState({
		user: 'user'
	}),
	methods: {
		redirect() {
			if (this.user) {
				if (this.user.type === 'CUSTOMER') {
					this.$router.replace({ path: '/customer/transactions' })
				} else if (this.user.type === 'BANKER') {
					this.$router.replace({ path: '/banker' })
				}
			}
		}
	},
	mounted: function() {
		this.redirect()
	},
	updated: function() {
		this.redirect()
	}
}
</script>
