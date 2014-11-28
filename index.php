<?php



session_start();
//constant variabel
define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);
//routes definieren zodat we weten welke pagina we moeten tonen
$routes = array(
    'home' => array(
    	'controller' => 'Posts',
    	'action' => 'index'
	),
    'page_id' => array(
    	'controller' => 'Bla',
    	'action' => 'BlaFunctie'
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
//we geven de juiste antwoorden terug en zetten alles op het scherm
$controllerObj->render();

?>