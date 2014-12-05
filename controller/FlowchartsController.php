<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'FlowchartsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ShapesDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'LinesDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'GroupsDAO.php';
class FlowchartsController extends Controller {
	//DAOs aanmaken
	private $flowchartDAO;
	private $shapeDAO;
	private $lineDAO;
	private $groupDAO;

	function __construct() {
		$this->flowchartDAO = new FlowchartsDAO();
		$this->shapeDAO = new ShapesDAO();
		$this->lineDAO = new LinesDAO();
		$this->groupDAO = new GroupsDAO();

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

		//JESAMINE: heb code aangepast zodat alleen flowcharts van user worden getoond
		if(!empty($_SESSION['user'])){
			$flowcharts = $this->flowchartDAO->selectByUserId($_SESSION['user']['id']);
			$this->set('flowcharts', $flowcharts);
		}
		//var_dump($_SESSION['user']['id']);
		
		if(!empty($_GET['id'])){
			$chosen = $this->flowchartDAO->selectById($_GET['id']);
			if(!empty($chosen)){
				$this->set('chosen',$chosen);
			}



		}

		

		
	}
	public function saveFlowchart(){

		//Flowchart saven

		//request valideren
		if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
		    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
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
				$name = $data['name'];
				//check if user is logged in
				if(!empty($_SESSION['user'])){
					$userId = $_SESSION['user']['id'];
				}else{
					$errors['user'] = 'Not logged in'; 
					//redirect or popup to register
					//TODO
				}
				//save flowchart
				//TODO: shape_ids en line_ids niet nodig eigenlijk want flwochart_id wordt opgeslagen bij shapes en lines
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
		}
		//$this->set('errors',$errors);
		if(!empty($errors)){
			$_SESSION['error'] = 'Oh noes, the save failed!';
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