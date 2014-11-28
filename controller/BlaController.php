<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'BlaDAO.php';
class BlaController extends Controller {
	//DAOs aanmaken
	private $blaDAO;

	function __construct() {
		$this->blaDAO = new BlaDAO();

	}


	/* //voorbeeld functie
	public function index() {
		//if empty $_GET['id'], empty[$_POST], empty($post['id']), empty($_SESSION["user"]), empty($errors), 

		$this->set('posts', $this->postDAO->selectTopPosts());
		//$this->redirect("index.php?page=detail&id={$_GET["id"]}");
		//$this->set('errors',$errors);

			}
	*/


	/* //voorbeeld private functie dat wordt aangeroepen in de class zelf
	private function handleCommentPost($newsitem) {
	}
*/

}