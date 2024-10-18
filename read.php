<?php 

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('config.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    try {
        $stmt = $pdo->prepare("SELECT * FROM developers ORDER BY id DESC");
        $stmt->execute();

        $developers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($developers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Erro ao buscar os registros: ' . $e->getMessage()]);
    }
}
