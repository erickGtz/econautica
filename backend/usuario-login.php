<?php
use ECONAUTICA\MYAPI\INI_SES\Login;
require_once __DIR__ . '/vendor/autoload.php';

    $login = new Login('econautica');
    $login->autenticar($_POST );
    echo $login->getData();
?>