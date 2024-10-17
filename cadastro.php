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
    $especialidade = $_POST['especialidade'];
    $stack = $_POST['stack'];
    $linguagens = json_encode($_POST['linguagens']); // Converte para JSON
    $observacao = $_POST['observacao'];

    try {
        // Prepara a consulta SQL
        $stmt = $pdo->prepare("INSERT INTO public.developers 
            (nome, cidade, observacao, funcao, estado, nivel, cpf, telefone, email, linguagens) 
            VALUES (:nome, :cidade, :observacao, :funcao, :estado, :nivel, :cpf, :telefone, :email, :linguagens)");

        // Associa os parâmetros
        $stmt->bindParam(':nome', $name);
        $stmt->bindParam(':cidade', $cidade);
        $stmt->bindParam(':funcao', $especialidade); // Alterado para VARCHAR
        $stmt->bindParam(':estado', $estado); // Alterado para VARCHAR
        $stmt->bindParam(':nivel', $stack); // Alterado para VARCHAR
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':telefone', $telephone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':linguagens', $linguagens);
        $stmt->bindParam(':observacao', $observacao);

        // Executa a inserção
        $stmt->execute();

        // Retorna uma resposta em JSON
        echo json_encode(['message' => 'Cadastro realizado com sucesso!']);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Erro ao cadastrar: ' . $e->getMessage()]);
    }
}
?>
