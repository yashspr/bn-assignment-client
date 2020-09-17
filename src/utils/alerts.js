export const setAlertProps = (err, alertProps, customMsg) => {
	alertProps.message = err
		? err.response
			? err.response.data.message
			: err.message
		: customMsg
	alertProps.type = err ? 'danger' : 'primary'
	alertProps.show = true
}
