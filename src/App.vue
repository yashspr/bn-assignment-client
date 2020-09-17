<template>
	<div id="app">
		<Navbar />
		<router-view />
		<b-alert
			v-model="alert.show"
			class="position-fixed fixed-top m-0 rounded-0"
			style="z-index: 2000;"
			:variant="alert.type"
			dismissible
		>
			{{ alert.message }}
		</b-alert>
	</div>
</template>

<script>
import Navbar from './components/Navbar'
import { EventBus } from './services/EventBus'
import { setAlertProps } from './utils/alerts'

export default {
	name: 'App',

	components: {
		Navbar
	},

	data: () => ({
		alert: {
			show: false,
			message: '',
			type: 'primary'
		}
	}),

	mounted: function() {
		EventBus.$on('show-main-alert', (err, customMessage) => {
			setAlertProps(err, this.alert, customMessage)
		})
	}
}
</script>
