/*
Валидация форм. Подключается к <form data-validate>, правила задаются атрибутами:
- required на текстовом поле — не должно быть пустым
- required на чекбоксе — должен быть отмечен
- class="phone" — значение должно совпасть с маской целиком (см. inputmask.js)
Поле с ошибкой получает класс err, он снимается, как только поле начали исправлять.
*/

const ERROR_CLASS = 'err';
// Соответствует маске '+{7}(000) 000-00-00' из inputmask.js
const PHONE_PATTERN = /^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}$/;

const isFieldValid = field => {
	if (field.type === 'checkbox') return field.checked;

	const value = field.value.trim();
	if (!value) return false;
	// Незаполненная до конца маска — та же ошибка, что и пустое поле
	if (field.classList.contains('phone')) return PHONE_PATTERN.test(value);

	return true;
};

const setError = (field, hasError) => field.classList.toggle(ERROR_CLASS, hasError);

const validateForm = form => {
	let firstInvalid = null;

	form.querySelectorAll('[required]').forEach(field => {
		const isValid = isFieldValid(field);
		setError(field, !isValid);
		if (!isValid && !firstInvalid) firstInvalid = field;
	});

	if (firstInvalid) firstInvalid.focus();
	return !firstInvalid;
};

const setStatus = (form, message, isError = false) => {
	const status = form.querySelector('[data-form-status]');
	if (!status) return;
	status.textContent = message;
	status.classList.toggle(ERROR_CLASS, isError);
};

const sendForm = async form => {
	const button = form.querySelector('[type="submit"]');

	form.classList.add('_sending');
	if (button) button.disabled = true;
	setStatus(form, '');

	try {
		const response = await fetch(form.action, { method: 'POST', body: new FormData(form) });
		// Если PHP отдал ошибку или 404, в ответе придёт HTML вместо JSON
		const result = await response
			.json()
			.catch(() => ({ ok: false, message: 'Сервер вернул неожиданный ответ' }));

		if (!result.ok) throw new Error(result.message || 'Не удалось отправить заявку');

		form.reset();
		// reset не уведомляет IMask, маска останется со старым значением
		form.querySelectorAll('.phone').forEach(input => input.dispatchEvent(new Event('input')));
		setStatus(form, result.message);
	} catch (error) {
		setStatus(form, error.message, true);
	} finally {
		form.classList.remove('_sending');
		if (button) button.disabled = false;
	}
};

document.querySelectorAll('form[data-validate]').forEach(form => {
	// Свои сообщения вместо браузерных подсказок
	form.setAttribute('novalidate', '');

	form.addEventListener('submit', e => {
		e.preventDefault();
		if (!validateForm(form)) return;
		sendForm(form);
	});

	// input — для текстовых полей, change — для чекбокса
	['input', 'change'].forEach(eventName => {
		form.addEventListener(eventName, e => {
			if (e.target.classList.contains(ERROR_CLASS)) setError(e.target, false);
		});
	});
});
