<template>
	<div class="m-5">
		<h1>Welcome, {{ user.name }}</h1>
		<h3>
			Your Balance is: <strong>{{ user.balance }}</strong>
		</h3>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'CustomerHome',
	computed: mapState({
		user: 'user'
	})
}
</script>
