<?php

session_start();
//constant variabel
define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);
//routes definieren zodat we weten welke pagina we moeten tonen
$routes = array(
    'home' => array(
    	'controller' => 'Flowcharts',
    	'action' => 'home'
	),
    'overview' => array(
        'controller' => 'Flowcharts',
        'action' => 'overview'
    ),
    'group' => array(
        'controller' => 'Flowcharts',
        'action' => 'group'
    ),
    'add' => array(
        'controller' => 'Flowcharts',
        'action' => 'add'
    ),
    'saveFlowchart' => array(
        'controller' => 'Flowcharts',
        'action' => 'saveFlowchart'
    ),
    'loadFlowchart' => array(
        'controller' => 'Flowcharts',
        'action' => 'loadFlowchart'
    ),
    'addme' => array(
        'controller' => 'Flowcharts',
        'action' => 'addme'
    ),    
    'login' => array(
    	'controller' => 'Users',
    	'action' => 'login'
	),
    'logout' => array(
        'controller' => 'Users',
        'action' => 'logout'
    ),
    'register' => array(
        'controller' => 'Users',
        'action' => 'register'
    ),
    'listgroups' => array(
        'controller' => 'Flowcharts',
        'action' => 'listgroups'
    ),
    'groupdetail' => array(
        'controller' => 'Flowcharts',
        'action' => 'groupdetail'
    )
);
//als er geen "?page=blabla" is, gaan we gewoon naar de home pagina
if(empty($_GET['page'])) {
    $_GET['page'] = 'home';
}//als de blabla-pagina van "?page=blabla" niet bestaat, gaan we ook gewoon naar de home pagina
if(empty($routes[$_GET['page']])) {
    header('Location: index.php');
    exit();
}
$route = $routes[$_GET['page']];
$controllerName = $route['controller'] . 'Controller';
require_once WWW_ROOT . 'controller' . DS . $controllerName . ".php";
$controllerObj = new $controllerName();
$controllerObj->route = $route;
//we filteren de database vragen
$controllerObj->filter();
//render doorsturen bij ajax aanvraag
//if ( ! isset($_SERVER['HTTP_X_REQUESTED_WITH']) ) {
    $controllerObj->render();
//}
//we geven de juiste antwoorden terug en zetten alles op het scherm
//$controllerObj->render();

?>