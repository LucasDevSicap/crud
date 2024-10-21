<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('config.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Captura os dados do formulário
    $name = $_POST['name'];
    $cpf = $_POST['cpf'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $stack = $_POST['stack'];
    $observacao = $_POST['observacao'];

    try {
        // Corrigido: adicionar o parêntese que faltava no final da instrução VALUES
        $stmt = $pdo->prepare("INSERT INTO public.developers 
            (nome, cidade, observacao, funcao, estado, nivel, cpf, telefone, email) 
            VALUES (:nome, :cidade, :observacao, :funcao, :estado, :nivel, :cpf, :telefone, :email)");

        $stmt->bindParam(':nome', $name);
        $stmt->bindParam(':cidade', $cidade);
        $stmt->bindParam(':funcao', $especialidade);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':nivel', $stack);
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':telefone', $telephone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':observacao', $observacao);

        $stmt->execute();

        echo json_encode(['message' => 'Cadastro realizado com sucesso!']);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Erro ao cadastrar: ' . $e->getMessage()]);
    }
}
