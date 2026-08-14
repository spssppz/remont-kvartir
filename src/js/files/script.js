import { isMobile } from "./functions.js";
import { flsModules } from "./modules.js";

/* Валидация форм с атрибутом data-validate */
import "./forms/validate.js";


// video.js
const PLAYED_CLASS = 'video--played';

document.addEventListener('click', (e) => {
	const button = e.target.closest('.video__play');
	if (!button) return;

	const block = button.closest('[data-video]');
	if (!block || block.classList.contains(PLAYED_CLASS)) return;

	playVideo(block);
});

function playVideo(block) {
	const src = block.dataset.video;
	if (!src) return;

	const video = document.createElement('video');
	video.className = 'video__player';
	video.src = src;
	video.controls = true;
	video.playsInline = true;
	video.preload = 'auto';

	block.append(video);
	block.classList.add(PLAYED_CLASS);

	// play() возвращает промис — если браузер заблокирует автозапуск,
	// пользователь просто нажмёт на нативную кнопку controls
	video.play().catch(() => { });
	video.focus();
}