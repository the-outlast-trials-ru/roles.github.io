<?php
// set-maintenance.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'enable') {
        // Включаем режим обслуживания
        file_put_contents('maintenance.txt', '1');
        echo json_encode(['success' => true, 'status' => 'enabled']);
    } 
    elseif ($action === 'disable') {
        // Выключаем режим обслуживания
        if (file_exists('maintenance.txt')) {
            unlink('maintenance.txt');
        }
        echo json_encode(['success' => true, 'status' => 'disabled']);
    }
    elseif ($action === 'check') {
        // Проверяем статус
        $enabled = file_exists('maintenance.txt');
        echo json_encode(['success' => true, 'maintenance' => $enabled]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
