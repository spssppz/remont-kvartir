window.addEventListener('load', () => {
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const lazyImg = entry.target
				const imgDataLazy = lazyImg.dataset.lazy
				lazyImg.setAttribute('src', imgDataLazy)

				if (lazyImg.previousElementSibling) {
					const lazySource = lazyImg.previousElementSibling
					const lazyPath = imgDataLazy.slice(0, imgDataLazy.indexOf('.'))
					lazySource.setAttribute('srcset', `${lazyPath}.webp`)
				}

				observer.unobserve(lazyImg)
			}
		})
	}, { threshold: 0.5 })

	const lazyloadImages = document.querySelectorAll('[data-lazy]')
	lazyloadImages.forEach(lazyloadImage => observer.observe(lazyloadImage))
})
