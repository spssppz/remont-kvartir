import IMask from 'imask'

document.querySelectorAll('.phone').forEach(phoneInput => {
	const mask = IMask(phoneInput, {
		mask: '+{7}(000) 000-00-00'
	})

	phoneInput.addEventListener('mouseenter', () => {
		if (!phoneInput.value) {
			mask.value = '+7('
		}
	})

	phoneInput.addEventListener('mouseleave', () => {
		if (mask.unmaskedValue === '7') {
			mask.value = ''
		}
	})
})