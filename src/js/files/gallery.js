/* Документация плагина: https://fancyapps.com/fancybox/ */
import { Fancybox } from '@fancyapps/ui'

Fancybox.bind('[data-fancybox]', {
	infinite: true
})

/*
Галерея проекта. На ссылке достаточно указать количество снимков:
	<a href="img/projects/1/01.jpg" data-images="18">
Файлы в папке пронумерованы подряд (01.jpg, 02.jpg ...), поэтому список
собирается из href первого снимка — дублировать все пути в разметке не нужно.
*/
document.addEventListener('click', e => {
	const link = e.target.closest('a[data-images]')
	if (!link) return

	const total = Number(link.dataset.images)
	const first = link.getAttribute('href')
	if (!total || !first) return

	e.preventDefault()

	// "img/projects/1/01.jpg" -> "img/projects/1/"
	const folder = first.replace(/[^/]+$/, '')
	const caption = link.querySelector('span')?.textContent.trim() ?? ''

	const slides = Array.from({ length: total }, (_, i) => ({
		src: `${folder}${String(i + 1).padStart(2, '0')}.jpg`,
		type: 'image',
		caption
	}))

	Fancybox.show(slides, { infinite: true })
})
