<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Метод не поддерживается']);
    exit;
}

$score = isset($_POST['score']) ? intval($_POST['score']) : 0;
$nickname = isset($_POST['nickname']) ? trim($_POST['nickname']) : '';
$server = isset($_POST['server']) ? trim($_POST['server']) : '';
$date = isset($_POST['date']) ? trim($_POST['date']) : date('Y-m-d H:i:s');

if (empty($nickname) || empty($server)) {
    echo json_encode(['error' => 'Не заполнены обязательные поля']);
    exit;
}

$data = [
    'score' => $score,
    'nickname' => $nickname,
    'server' => $server,
    'date' => $date,
    'ip' => $_SERVER['REMOTE_ADDR']
];

$filename = 'bal_' . date('Y-m-d') . '.json';
$filepath = __DIR__ . '/' . $filename;

if (!file_exists($filepath)) {
    file_put_contents($filepath, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$existingData = json_decode(file_get_contents($filepath), true) ?: [];
$existingData[] = $data;

if (file_put_contents($filepath, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true, 'filename' => $filename]);
} else {
    echo json_encode(['error' => 'Ошибка записи файла']);
}
?>