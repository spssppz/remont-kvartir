const apikey = '51092280-e018-4241-bc97-180570de25d4'
const coordsLocationMain = [55.737724569019754, 37.5407215]

function initMap() {
	if (document.querySelector('#footer-map')) {
		let map = new ymaps.Map('footer-map', {
			center: coordsLocationMain,
			zoom: 9,
		})

		let placemark = new ymaps.Placemark(coordsLocationMain, {}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/logo.svg',
			iconImageSize: [30, 30],
		})

		map.geoObjects.add(placemark)
	}
};

if (document.querySelector('#footer-map')) {
	window.addEventListener('load',
		() => setTimeout(() => {
			const mapScript = document.createElement('script')
			mapScript.src = `https://api-maps.yandex.ru/2.1/?load=package.standard&apikey=${apikey}&lang=ru_RU`
			document.querySelector('.wrapper').after(mapScript)
			setTimeout(() => ymaps.ready(initMap), 3000)
		}, 1000))
}