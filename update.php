<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('config.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Captura os dados do formulário
    $id = $_POST['id']; // Captura o ID do desenvolvedor a ser atualizado
    $name = $_POST['name'];
    $cpf = $_POST['cpf'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $stack = $_POST['stack'];
    $observacao = $_POST['observacao'];
    
    try {
        // Prepara a instrução SQL para atualização
        $stmt = $pdo->prepare("UPDATE public.developers 
            SET nome = :nome, cidade = :cidade, observacao = :observacao, 
                estado = :estado, nivel = :nivel, cpf = :cpf, 
                telefone = :telefone, email = :email 
            WHERE id = :id");

        // Vincula os parâmetros
        $stmt->bindParam(':id', $id, PDO::PARAM_INT); // Certifique-se de que o ID é um inteiro
        $stmt->bindParam(':nome', $name);
        $stmt->bindParam(':cidade', $cidade);
        $stmt->bindParam(':observacao', $observacao);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':nivel', $stack);
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':telefone', $telephone);
        $stmt->bindParam(':email', $email);

        // Executa a atualização
        $stmt->execute();

        echo json_encode(['message' => 'Atualização realizada com sucesso!']);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Erro ao atualizar: ' . $e->getMessage()]);
    }
}
