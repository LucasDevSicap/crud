<?php
$host = 'localhost';
$port = '5432';
$dbname = 'dev_crud';
$user = 'postgres';
$password = '123';

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    if ($pdo) {
        echo "Conexão com PostgreSQL foi bem-sucedida!";
    }
} catch (PDOException $e) {
    echo "Erro ao conectar ao PostgreSQL: " . $e->getMessage();
}

?>