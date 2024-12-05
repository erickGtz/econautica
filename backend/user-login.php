<?php
use ECONAUTICA\MYAPI\INI_SES\login;
require_once __DIR__ . '/vendor/autoload.php';

    $login = new login('econautica');
    $login->autenticar($_POST );
    echo $login->getData();
?>