import * as flsFunctions from "./files/functions.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
flsFunctions.isWebp();

/* Добавление класса touch для HTML если браузер мобильный */
// flsFunctions.addTouchClass();

/* Добавление loaded для HTML после полной загрузки страницы */
// flsFunctions.addLoadedClass();

/* Модули для работы с меню (Бургер) */
flsFunctions.menuInit();
// flsFunctions.closeMenuWithSwipe();

/* Модуль для плавной прокрутки к якорям */
flsFunctions.anchors();

/* Учет плавающей панели на мобильных устройствах при 100vh */
// flsFunctions.fullVHfix();

/* Модуль работы со спойлерами */
// flsFunctions.spollers();

/* lazyload */
// import './files/lazyload.js'

/* Модуль работы с табами */
flsFunctions.tabs();

/* Модуль "показать еще" */
// flsFunctions.showMore();

/* Попапы Сниппет (HTML): pl */
import './libs/popup.js'

/* Модуль параллакса мышью */
// import './libs/parallax-mouse.js'


import * as flsForms from "./files/forms/forms.js";

/* Работа с полями формы */
/* Документация: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formFieldsInit({ viewPass: false });

/* Oтправка формы */
/* Документация: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formSubmit();

/* Модуль формы "количество" */
// flsForms.formQuantity();

/* Модуль звездного рейтинга */
flsForms.formRating();

/* Модуль работы с select. */
// import './libs/select.js'

/* (В работе) Модуль работы с масками.*/
import "./files/forms/inputmask.js";

/* Модуль работы с ползунком */
/* Документация плагина: https://refreshless.com/nouislider/ */
// import "./files/forms/range.js";

/* Модуль работы с подсказками (tippy) Сниппет (HTML): tip  */
/* Документация плагина: https://atomiks.github.io/tippyjs/ */
// import "./files/tippy.js";


/*
Документация плагина: https://swiperjs.com/
Сниппет(HTML): swiper
*/
import "./files/sliders.js";


/* 
Изменение дизайна скроллбара
В HTML добавляем к блоку атрибут data-simplebar
Документация плагина: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
*/
// import './files/scroll/simplebar.js';

// Ленивая загрузка картинок
// В HTML добавляем img, video, audio, iframe но вместо src пишем data-src
// Документация плагина: https://github.com/verlok/vanilla-lazyload
// import './files/scroll/lazyload.js';

// Функции работы скроллом
import * as flsScroll from "./files/scroll/scroll.js";

// Плавная навигация по странице
// flsScroll.pageNavigation();

// Функционал добавления классов к хедеру при прокрутке
// flsScroll.headerScroll();

// Функционал липкого блока
// flsScroll.stickyBlock();

/* Документация плагина: https://fancyapps.com/fancybox/ */
import "./files/gallery.js";


/* Динамический адаптив */
// import "./libs/dynamic_adapt.js";

/* Форматирование чисел */
// import './libs/wNumb.min.js';

/* Подключаем Яндекс карту */
import "./files/map.js";

/* Подключаем файлы со своим кодом */
import "./files/script.js";