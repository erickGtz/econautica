<?php
use ECONAUTICA\MYAPI\EDIT_USER\UserEdit;
require_once __DIR__ . '/vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST;
    $userEdit = new UserEdit('econautica');
    echo $userEdit->edit($data);
}
?>