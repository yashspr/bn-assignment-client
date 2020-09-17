import { setAlertProps } from './alerts'

export const validateNumber = (input, alertProps) => {
	if (isNaN(Number(input))) {
		setAlertProps(
			{
				message: 'Enter a valid Number'
			},
			alertProps
		)
		return false
	}
	return true
}
