<?php

header('Access-Control-Allow-Origin: *');
require_once('config.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $cpf = $_POST['cpf'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $especialidade = $_POST['especialidade'];
    $stack = $_POST['stack'];
    $linguagens = $_POST['linguagens'];
    $nivel = $_POST['nivel'];

    echo($name);

    // Aqui você pode adicionar a lógica para salvar os dados no banco de dados

    // Retorne uma resposta
    echo json_encode(['message' => 'Cadastro realizado com sucesso!']);
}
?>
