<?php
use ECONAUTICA\MYAPI\USER_LIST\UserList;
require_once __DIR__ . '/vendor/autoload.php';

$userList = new UserList('econautica');
echo $userList->list();
?>