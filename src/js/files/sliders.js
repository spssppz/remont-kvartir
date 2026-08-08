/* Документация слайдера: https://swiperjs.com/ */

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay
*/

function initSliders() {
	if (document.querySelector('.certificates__slider')) {
		new Swiper('.certificates__slider', {
			modules: [Navigation, Pagination],
			slidesPerView: 'auto',
			spaceBetween: 0,
			speed: 800,

			pagination: {
				el: '.certificates__pagination',
				clickable: true,
			},

			navigation: {
				prevEl: '.certificates__slider-btn_prev',
				nextEl: '.certificates__slider-btn_next',
			},
		})
	}
	const workerSliders = document.querySelectorAll('.workers__slider')
	workerSliders.forEach(workerSlider => {
		if (workerSlider) {
			new Swiper(workerSlider, {
				modules: [Navigation, Pagination],
				slidesPerView: 'auto',
				spaceBetween: 0,
				speed: 800,

				pagination: {
					el: workerSlider.parentElement.querySelector('.workers__pagination'),
					clickable: true,
				},

				navigation: {
					prevEl: workerSlider.parentElement.querySelector('.workers__slider-btn_prev'),
					nextEl: workerSlider.parentElement.querySelector('.workers__slider-btn_next'),
				},
			})
		}

	})
	if (document.querySelector('.partners__slider') && window.innerWidth < 992) {
		new Swiper('.partners__slider', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			speed: 800,

		})
	}
	if (document.querySelector('.works-price__slider') && window.innerWidth < 768) {
		new Swiper('.works-price__slider', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			speed: 800,

		})
	}
}

window.addEventListener("load", () => initSliders())