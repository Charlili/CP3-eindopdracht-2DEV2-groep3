<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'FlowchartsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'GroupsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UsersDAO.php';
class FlowchartsController extends Controller {
	//DAOs aanmaken
	private $flowchartDAO;
	private $groupDAO;
	private $usersDAO;

	function __construct() {
		$this->flowchartDAO = new FlowchartsDAO();
		$this->groupDAO = new GroupsDAO();
		$this->usersDAO = new UsersDAO();

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

			if(empty($_POST['invite'])){
				$errors['invite'] = 'Please invite people';
			}

			//var_dump($_POST);

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

		$this->set('users',$this->usersDAO->selectAll());
		
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
		
		$string = $this->groupDAO->selectAllUserIds($_GET['id']);

		// $old = $string[0]['user_ids'];
		// var_dump($old);
		// $user_ids = explode(", ", $old);
		// var_dump($user_ids);

		// $new = $old + $_SESSION['user']['id'];
		// var_dump($_SESSION['user']['id']);
		// var_dump($new);
	}

	public function listgroups(){

		$this->set('groups', $this->groupDAO->selectAll());
		$this->set('mygroups', $this->groupDAO->selectByUserId($_SESSION['user']['id']));

		$errors = array();

		if(!empty($_POST)){
					var_dump($_POST);

			if(empty($_POST['addme'])){
				$errors['addme'] = 'Choose a group';
			}

			if(empty($errors)){
				$addMe = array(
					"group" => $_POST['addme'],
					"user_id" => $_SESSION['user']['id']
				);

			$add = $this->groupDAO->update($_POST['addme'],$addme);
			}
		}

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

        $string = $this->groupDAO->selectAllUserIds($_GET['id']);


  		$old = $string[0]['user_ids'];
		//var_dump($old);
		$user_ids = explode(", ", $old);
		//var_dump($user_ids);

		// foreach ($user_ids as $user_id){
		// 	// $this->set('user',$this->usersDAO->selectById($user_id));
		// 	//echo '<li>'.$user_id.'</li>';
		// }

		
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