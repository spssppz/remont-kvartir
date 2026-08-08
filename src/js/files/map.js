const apikey = '51092280-e018-4241-bc97-180570de25d4'
const coordsLocationMain = [55.03, 82.9141955999]

function initMap() {
	if (document.querySelector('#map')) {
		let map = new ymaps.Map('map', {
			center: coordsLocationMain,
			zoom: 15,
		})

		// let placemark = new ymaps.Placemark(coordsLocationMain, {}, {
		// 	iconLayout: 'default#image',
		// 	iconImageHref: 'img/icons/location.svg',
		// 	iconImageSize: [33, 46],
		// })

		// map.geoObjects.add(placemark)
	}
};

if (document.querySelector('#contacts-map')) {
	window.addEventListener('load',
		() => setTimeout(() => {
			const mapScript = document.createElement('script')
			mapScript.src = `https://api-maps.yandex.ru/2.1/?load=package.standard&apikey=${apikey}&lang=ru_RU`
			document.querySelector('.wrapper').after(mapScript)
			setTimeout(() => ymaps.ready(initMap), 3000)
		}, 1000))
}