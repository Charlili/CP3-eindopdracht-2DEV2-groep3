<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'FlowchartsDAO.php';
<<<<<<< HEAD
require_once WWW_ROOT . 'dao' . DS . 'GroupsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UsersDAO.php';
=======
require_once WWW_ROOT . 'dao' . DS . 'ShapesDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'LinesDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'GroupsDAO.php';
>>>>>>> 8892989c7e4bbfcec347a60de96f04baad0fe46c
class FlowchartsController extends Controller {
	//DAOs aanmaken
	private $flowchartDAO;
	private $shapeDAO;
	private $lineDAO;
	private $groupDAO;
	private $usersDAO;

	function __construct() {
		$this->flowchartDAO = new FlowchartsDAO();
<<<<<<< HEAD
		$this->groupDAO = new GroupsDAO();
		$this->usersDAO = new UsersDAO();
=======
		$this->shapeDAO = new ShapesDAO();
		$this->lineDAO = new LinesDAO();
		$this->groupDAO = new GroupsDAO();
>>>>>>> 8892989c7e4bbfcec347a60de96f04baad0fe46c

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

		//JESAMINE: heb code aangepast zodat alleen flowcharts van user worden getoond
		if(!empty($_SESSION['user'])){
			$flowcharts = $this->flowchartDAO->selectByUserId($_SESSION['user']['id']);
			$this->set('flowcharts', $flowcharts);
		}
		//var_dump($_SESSION['user']['id']);
		
		if(!empty($_GET['id'])){
			$chosen = $this->flowchartDAO->selectById($_GET['id']);
		}	
	}
	public function loadFlowchart(){
		if(!empty($_GET['id'])){
			$chosen = $this->flowchartDAO->selectById($_GET['id']);
			if(!empty($chosen)){
				//$this->set('chosen',$chosen);
				$shapes = $this->shapeDAO->selectByFlowchartId($chosen['id']);
				$lines = $this->lineDAO->selectByFlowchartId($chosen['id']);
				$data = array(
					'flowchart' => $chosen,
					'shapes' => $shapes,
					'lines' => $lines
				);
				header('Content-Type: application/json');
    			echo json_encode($data);
    			die();
			}
		}
	}

	public function saveFlowchart(){

		//Flowchart saven

		//request valideren
		//if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
		//    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
			// I'm AJAX!

			$errors = array();
			$data = $_POST;
			$shapes = '0';
			$lines = '0';
			$groups = '0';
			$name = 'untitled';

			//als er iets is gestuurd
			if(!empty($_POST)){
				//get name
				if(!empty($data['name'])){$name = $data['name'];}
				//check if user is logged in
				if(!empty($_SESSION['user'])){
					$userId = $_SESSION['user']['id'];
				}else{
					$errors['user'] = 'Not logged in'; 
					//redirect or popup to register
					//TODO
				}
				//save flowchart
				//TODO: shape_ids en line_ids niet nodig eigenlijk want flowchart_id wordt opgeslagen bij shapes en lines
				$flowchart = array(
					'name' => $name,
					'user_id' => $userId,
					'group_ids' => ',',
					'shape_ids' => ',',
					'line_ids' => ',');
				if(empty($errors)){
					//save flowchart
					$makeFlowchart = $this->flowchartDAO->insert($flowchart);
					if(!$makeFlowchart){
						$errors['flowchart'] = $this->flowchartDAO->getValidationErrors($flowchart);
					}
					else{
						//flowchart-save succeeded
						//get flowchart id
						$flowchart_id = $makeFlowchart['id'];

						//als er shapes zijn gesaved
						if(!empty($data['shapes'])){
							foreach($data['shapes'] as $shape){
								//set shapesDAO voor elke shape
								$shapeData = array(
									'flowchart_id' => $flowchart_id,
									'x' => $shape['x'],
									'y' => $shape['y'],
									'width' => $shape['width'],
									'height' => $shape['height'],
									'color' => '200,200,200',
									'type' => $shape['type'],
									'content' => $shape['content']
								);
								$makeShape = $this->shapeDAO->insert($shapeData);
								if(!$makeShape){
									$errors['shapes'] = $this->shapeDAO->getValidationErrors($makeShape);
								}
							}
						}
						//als er lines zijn gesaved
						if(!empty($data['lines'])){
							foreach($data['lines'] as $line){
								//set linesDAO voor elke line
								$lineData = array(
									'flowchart_id' => $flowchart_id,
									'x1' => $line['x1'],
									'y1' => $line['y1'],
									'x2' => $line['x2'],
									'y2' => $line['y2'],
									'color' => '0,0,0'
								);
								$makeLine = $this->lineDAO->insert($lineData);
								if(!$makeLine){
									$errors['lines'] = $this->lineDAO->getValidationErrors($makeLine);
								}
							}
						}
					}
				}

			}
		//}
		//$this->set('errors',$errors);
		if(!empty($errors)){
			$_SESSION['error'] = 'Oh noes, the save failed!';
			var_dump($errors);
		}

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