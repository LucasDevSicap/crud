<?php 

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('config.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Verifica se o ID foi passado na URL
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        try {
            // Prepara a consulta com um parâmetro
            $stmt = $pdo->prepare("SELECT * FROM developers WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $developer = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verifica se o desenvolvedor foi encontrado
            if ($developer) {
                echo json_encode($developer, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(['message' => 'Desenvolvedor não encontrado.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['message' => 'Erro ao buscar os registros: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['message' => 'ID não fornecido.']);
    }
} else {
    echo json_encode(['message' => 'Método não permitido.']);
}
