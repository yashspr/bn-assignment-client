<template>
	<div>
		<router-view />
	</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
	name: 'Customer',
	components: {},
	data: () => ({}),
	computed: mapState({
		user: 'user'
	})
}
</script>
