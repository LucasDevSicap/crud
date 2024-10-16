<?php
header('Access-Control-Allow-Origin: *');
require_once('config.php');


if($response===TRUE){
    echo json_encode(["message"=>"Usuário atualizado com sucesso"]);

}else{
   echo json_encode(["message"=>"Erro ao atualizar usuário"]);
}





?>