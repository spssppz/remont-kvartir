import * as noUiSlider from 'nouislider';

if (document.querySelector('.price-catalog__slider')) {
	const priceSlider = document.querySelector('.price-catalog__slider')

	const priceFrom = +priceSlider.dataset.from
	const priceTo = +priceSlider.dataset.to
	const priceMin = +priceSlider.dataset.min
	const priceMax = +priceSlider.dataset.max

	noUiSlider.create(priceSlider, {
		start: [priceFrom, priceTo],
		connect: true,
		range: {
			'min': priceMin,
			'max': priceMax
		},
		format: {
			to: n => parseFloat(n).toFixed(0),
			from: n => parseFloat(n).toFixed(0)
		}
	})

	const inputFrom = document.querySelector('.price-catalog__input_from')
	const inputTo = document.querySelector('.price-catalog__input_to')

	inputFrom.addEventListener('change', setPriceValues)
	inputTo.addEventListener('change', setPriceValues)

	function setPriceValues() {
		let priceStartValue
		let priceEndValue

		inputFrom.value != '' ? priceStartValue = inputFrom.value : null
		inputTo.value != '' ? priceEndValue = inputTo.value : null

		priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
	}

	priceSlider.noUiSlider.on('update', (values, handle) => {
		(handle) ? inputTo.value = values[handle] : inputFrom.value = values[handle]
	})
}
