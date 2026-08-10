<?php
/**
 * Обработчик форм сайта: собирает заявку и отправляет её на почту.
 * Принимает POST, отвечает JSON. Разметка форм — атрибут data-validate, см. js/files/forms/validate.js
 */
declare (strict_types = 1);

// const MAIL_TO = 'info@pik-upgrade.ru';
const MAIL_TO       = 'garaishin.ilnaz000@yandex.ru';
const PHONE_PATTERN = '/^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}$/';

// Подписи полей для письма. Порядок ключей = порядок строк в письме,
// поля, которых нет в списке, в письмо не попадают
const FIELDS = [
    'form_title' => 'Форма',
    'name'       => 'Имя',
    'phone'      => 'Телефон',
    'rooms'      => 'Количество комнат',
    'house'      => 'Тип дома',
    'repair'     => 'Вид ремонта',
    'area'       => 'Площадь, кв.м',
];

header('Content-Type: application/json; charset=utf-8');

/** Приводит значение к строке и вырезает переводы строк — защита от инъекции почтовых заголовков */
function clean($value): string
{
    if (is_array($value)) {
        $value = implode(', ', array_map('strval', $value));
    }
    // Приведение к строке обязательно: preg_replace может вернуть null,
    // а trim(null) в PHP 8.1+ выбрасывает deprecation
    return trim((string) preg_replace('/[\r\n]+/', ' ', strip_tags((string) $value)));
}

function respond(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Метод не поддерживается']);
}

// Ловушка для ботов: поле скрыто из вёрстки, человек его не заполнит.
// Отвечаем успехом, чтобы бот не подбирал обход
if (! empty($_POST['website'])) {
    respond(200, ['ok' => true, 'message' => 'Заявка отправлена']);
}

$phone = clean($_POST['phone'] ?? '');
$name  = clean($_POST['name'] ?? '');

$errors = [];
if (! preg_match(PHONE_PATTERN, $phone)) {
    $errors[] = 'phone';
}
// Поле имени есть не во всех формах — проверяем, только если оно пришло
if (isset($_POST['name']) && $name === '') {
    $errors[] = 'name';
}
if (empty($_POST['consent'])) {
    $errors[] = 'consent';
}

if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors, 'message' => 'Проверьте заполнение полей']);
}

$rows = [];
foreach (FIELDS as $key => $label) {
    $value = clean($_POST[$key] ?? '');
    if ($value !== '') {
        $rows[] = htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
        . ': <b>' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</b>';
    }
}

$host = preg_replace('/^www\./', '', (string) ($_SERVER['HTTP_HOST'] ?? 'localhost'));
$page = htmlspecialchars((string) ($_SERVER['HTTP_REFERER'] ?? '—'), ENT_QUOTES, 'UTF-8');

$body = '<p>' . implode('<br>', $rows) . '</p>'
. '<p style="color:#777">Отправлено: ' . date('d.m.Y H:i') . '<br>Страница: ' . $page . '</p>';

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    // Отправитель обязан быть на домене сайта, иначе письмо срежет SPF
    'From: =?UTF-8?B?' . base64_encode('Сайт ' . $host) . '?= <noreply@' . $host . '>',
]);

$subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта ' . $host) . '?=';

if (! mail(MAIL_TO, $subject, $body, $headers)) {
    respond(500, ['ok' => false, 'message' => 'Не удалось отправить заявку. Позвоните нам, пожалуйста']);
}

respond(200, ['ok' => true, 'message' => 'Заявка отправлена, мы скоро свяжемся с вами']);