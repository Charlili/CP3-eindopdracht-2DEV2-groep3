<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'FlowchartDAO.php';
class FlowchartsController extends Controller {
	//DAOs aanmaken
	private $flowchartDAO;

	function __construct() {
		$this->flowchartDAO = new FlowchartDAO();

	}
	public function home() {
		//index page

	}
	public function add() {
		//add group
		
	}
	public function group() {
		//group page: overview of users and flowchart
		
	}
	public function overview() {
		//overview of your flowcharts

		//call class
		
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