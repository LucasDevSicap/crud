<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('config.php');

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    try {
        $stmt = $pdo->prepare("DELETE FROM developers WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        echo json_encode(["message" => "Usuário removido com sucesso!"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao remover o usuário: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "ID não informado."]);
}
?>
