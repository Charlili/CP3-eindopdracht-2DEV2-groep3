<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'FlowchartDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'GroupDAO.php';
class FlowchartsController extends Controller {
	//DAOs aanmaken
	private $flowchartDAO;
	private $groupDAO;

	function __construct() {
		$this->flowchartDAO = new FlowchartDAO();
		$this->groupDAO = new GroupDAO();

	}
	public function home() {
		//index page

	}
	public function add() {
		//add group

		$errors = array();
		
		if(!empty($_POST)) {
			if(empty($_POST['groupname'])) {
				$errors['groupname'] = 'Please enter the groupname';
			} else {
				$existing = $this->groupDAO->selectByGroupname($_POST['groupname']);

				if(!empty($existing)) {
					$errors['groupname'] = 'Groupname is already in use';
				}
			}

			if(empty($_POST['description'])) {
				$errors['description'] = 'Please enter a description';
			}

			// if(empty($_POST['invite'])) {
			// 	$errors['invite'] = 'Please invite someone';
			// }


			if(empty($errors)) {

				$newGroup = array(
					"name"=>$_POST['groupname'],
					"description"=>$_POST['description'],
					"user_ids"=>$_SESSION['user']['id']
				);

				$group = $this->groupDAO->insert($newGroup);

				if(!empty($group)) {
					$_SESSION['info'] = 'New group added';
					// $registered = $this->usersDAO->selectByEmail($user['email']);
					// $_SESSION['user']=$registered;
					// if(empty($_SESSION['book'])){$this->redirect("index.php");}
					// else{
					// 	$this->redirect("index.php?page=book");
					// 	unset($_SESSION['book']);
					// }
					$this->redirect('index.php?page=listgroups');
					exit();
				} else {
					$errors = $this->groupDAO->getValidationErrors($newGroup);
					$_SESSION['error'] = 'Adding failed';
				}
			} else {
				$_SESSION['error'] = 'Please complete the form';
			}
			$this->set('errors',$errors);
		}
		
	}
	public function group() {
		//group page: overview of users and flowchart

		$group =false;
        if(!empty($_GET['id'])){
            $group =$this->groupDAO->selectById($_GET['id']);
        }
    
        if(empty($group)){
            $_SESSION['error'] = 'Group does not exist';
            $this->redirect('index.php');
        }

        $this->set('group',$group);
        $this->set('users',$this->groupDAO->getUsersFromGroup($_GET['id']));
		
	}

	public function listgroups(){

		$this->set('groups', $this->groupDAO->selectByUserId($_SESSION['user']['id']));

	}

	public function groupdetail(){
		$group =false;
        if(!empty($_GET['id'])){
            $group =$this->groupDAO->selectById($_GET['id']);
        }

        if(empty($group)){
            $_SESSION['error'] = 'Group does not exist';
            $this->redirect('index.php');
        }

        $this->set('group',$group);
	}
	public function overview() {
		//overview of your flowcharts

		//call class

		$this->set('flowcharts', $this->flowchartDAO->selectAll());

		$flowchart = false;
		if(!empty($_GET['id'])){
			$flowchart = $this->flowchartDAO->selectById($_GET['id']);
		}

		$this->set('flowchart',$flowchart);
		
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