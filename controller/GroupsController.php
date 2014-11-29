<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'GroupDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UsersDAO.php';

class GroupsController extends Controller {
	//DAOs aanmaken
	private $groupDAO;
	private $usersDAO;

	function __construct() {
		$this->groupDAO = new GroupDAO();
		$this->usersDAO = new UsersDAO();

	}
	public function groups() {
		//index page

	}

	public function groupdetail(){

		$group =false;
        if(!empty($_GET['id'])){
            $group =$this->groupDAO->selectById($_GET['id']);
        }
    
        if(empty($group)){
            $_SESSION['error'] = 'Group does not exist';
            $this->redirect('home.php');
        }

        $this->set('group',$group);

	}

	public function addgroup(){
		$errors = array();
		
		if(!empty($_POST)) {
			if(empty($_POST['groupname'])) {
				$errors['groupname'] = 'Please enter the groupname';
			} else {
				$existing = $this->usersDAO->selectByEmail($_POST["groupname"]);

				if(!empty($existing)) {
					$errors['groupname'] = 'Groupname is already in use';
				}
			}

			if(empty($_POST['description'])) {
				$errors['description'] = 'Please enter a description';
			}

			if(empty($errors)) {

				$newGroup = array(
					"name"=>$_POST['groupname'],
					"description"=>$_POST['description']
				);

				$group = $this->groupDAO->insert($newGroup);
				if(!empty($group)) {
					$_SESSION['info'] = 'New group added';
					$registered = $this->usersDAO->selectByEmail($user['email']);
					$_SESSION['user']=$registered;
					if(empty($_SESSION['book'])){$this->redirect("index.php");}
					else{
						$this->redirect("index.php?page=book");
						unset($_SESSION['book']);
					}
					exit();
				} else {
					$errors = $this->usersDAO->getValidationErrors($newUser);
					$_SESSION['error'] = 'Registration failed';
				}
			} else {
				$_SESSION['error'] = 'Please complete the form';
			}
			$this->set('errors',$errors);
		}
	}

}