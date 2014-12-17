<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'js/vendor/php-image-resize' . DS . 'ImageResize.php';

//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'FlowchartsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'GroupsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UsersDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ShapesDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'LinesDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'GroupsDAO.php';
class FlowchartsController extends Controller {
	//DAOs aanmaken
	private $flowchartDAO;
	private $shapeDAO;
	private $lineDAO;
	private $groupDAO;
	private $usersDAO;

	function __construct() {
		$this->flowchartDAO = new FlowchartsDAO();
		$this->groupDAO = new GroupsDAO();
		$this->usersDAO = new UsersDAO();
		$this->shapeDAO = new ShapesDAO();
		$this->lineDAO = new LinesDAO();
		$this->groupDAO = new GroupsDAO();

	}
	public function home() {
		//index page

	}
	public function uploadFile(){

		$sourceFile = $_FILES["SelectedFile"]['tmp_name'];
        $destFile = WWW_ROOT . 'uploads' . DS . $_FILES["SelectedFile"]['name'];
        move_uploaded_file($sourceFile, $destFile);
        $dest = 'uploads' . DS . $_FILES["SelectedFile"]['name'];
        
        $dotPos = strrpos($_FILES["SelectedFile"]['name'],'.');
        $name = substr($_FILES["SelectedFile"]['name'],0,$dotPos);
        $extension = substr($_FILES["SelectedFile"]['name'],$dotPos+1);
     	$dest = 'uploads' . DS . $name . "." . $extension;

        echo "<input type='hidden' id='sourceFile' value= '{$dest}' />";
        //echo "<input type='hidden' id='destFile' value= {$destFile}/>";

        //$image = new Eventviva\ImageResize($destFile);
        //$image->resizeToHeight(100);
        //$image->save(WWW_ROOT . 'uploads' . DS . $name . '_th.' . $extension);
        //$image->save(WWW_ROOT . 'uploads' . DS . $name . $extension);

	}
	public function add() {
		//add group

		$errors = array();
		
		if(!empty($_POST)) {
			//var_dump($_POST);
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
			$userString = $_SESSION['user']['id'];
			if(!empty($_POST['invite'])){
				$userString = implode(", ",$_POST['invite']);

			}

			//var_dump($userString);

			if(empty($errors)) {

				$newGroup = array(
					"name"=>$_POST['groupname'],
					"description"=>$_POST['description'],
					"user_ids"=>$userString
				);

				$group = $this->groupDAO->insert($newGroup);

				if(!empty($group)) {
					$_SESSION['info'] = 'New group added';
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
	public function sendInvite(){
		/*$mailTo = $_POST['emailTo'];
		$mailFrom = $_POST['emailFrom'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];*/
		var_dump($_POST);
		$to = $_POST['email'];
		$subject = "HTML email";

		$message = '
			<html>
			<head>
			<title>Come join us at Whiteboard!</title>
			 
			<style type="text/css"></style></head>
			<body style="
			font-family: Arial, Helvetical, sans-serif;
			">
			<p style="
			font-size: 1.2em;
			">Hi '.$to.',</p>
			<p><span style="text-transform:capitalize;font-weight: bolder;">CharlotteVanroelen</span> has invited you to join them at <a href="student.howest.be/charlotte.vanroelen/20142015/CPIII/whiteboard/index.php?page=home" title="Click to go to the Whiteboard app!" style="
			display: inline-block;
			padding:  20px;
			background-color: #faf05b;
			color:  black;
			text-decoration: none;
			transform: rotate(2deg);
			font-size: 1.2em;
			">Whiteboard.</a></p>
			<p style="
			color: rgb(0, 176, 151);
			">Whiteboard is an application where you can make flowcharts and share them in group.</p>
			<div style="
			background-color: #faf05b;
			display:  block;
			width: 400px;
			height: 100px;
			padding: 50px;
			position:  relative;
			font-size: 1.2em;
			transform: rotate(-2deg);
			">
				<p style="
			transform: rotate(3deg);
			">Come join my group <a href="student.howest.be/charlotte.vanroelen/20142015/CPIII/whiteboard/index.php?page=group&amp;groupid='.$_POST["groupId"].'&amp;detailid='.$_POST["groupId"].'" title="Click to go to their group!" style="
			background-color: #00b097;
			color:  white;
			text-decoration: none;
			padding:  20px;
			">'.$_POST["groupName"].'!</a></p>
				<p style="
			float: right;
			font-size: 0.8em;
			bottom: 1px;
			right: 15px;
			position: absolute;
			">- CharlotteVanroelen</p>
				</div>

			</body></html>
		';

		// Always set content-type when sending HTML email
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

		// More headers
		$headers .= 'From: <charlotte.vanroelen@student.howest.be>' . "\r\n";
		$headers .= 'Cc: jesamine.deprez@hotmail.com' . "\r\n";

		$mailed = mail($to,$subject,$message,$headers);
		//var_dump($mailed);
		//echo $message;
		//$_SESSION['info'] = 'Email sent to that person.';
		//$this->redirect('index.php?page=home');
		//location.reload();			
		//mail($mailTo, $subject, $message, "From: ".$mailFrom);
	}
	public function saveImage(){
		/*var system = require('system');
 
		// Web Address (URL) of the page to capture
		//var url  = system.args[1];
		 var url = "http://localhost/CPIII/CPIII_whiteboard/index.php?page=overview&id=35";
		 var page = 'testingThis' + '.png';
		// File name of the captured image
		//var file = system.args[2]  + ".png";
		 
		var page = require('webpage').create();
		 
		// Browser size - height and width in pixels
		// Change the viewport to 480x320 to emulate the iPhone
		page.viewportSize = { width: 1200, height : 800 };
		 
		// Set the User Agent String 
		// You can change it to iPad or Android for mobile screenshots
		page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5";
		 
		// Render the screenshot image
		page.open ( url, function ( status ) {
		  if ( status !== "success") {
		       console.log("Could not open web page : " + url);
		       phantom.exit();
		   } else {
		       window.setTimeout ( function() {
		          page.render(file);
		          console.log("Download the screenshot : " + file);
		          phantom.exit();
		       }, 1000);
		   }
		});*/
	}
	public function group() {
		//group page: overview of users and flowchart

		$group =false;
        if(!empty($_GET['groupid'])){
            $group =$this->groupDAO->selectById($_GET['groupid']);
        }

        if(empty($group)){
            $_SESSION['error'] = 'Group does not exist';
            $this->redirect('index.php');
        }
        $this->set('group',$group);
        if(!empty($_GET['id'])){
			$chosen = $this->flowchartDAO->selectById($_GET['id']);
			$this->set('chosen', $chosen);
		}

        //$this->set('users',$this->groupDAO->getUsersFromGroup($_GET['groupid']));

        $string = $this->groupDAO->selectAllUserIds($_GET['groupid']);
        $old = $string[0]['user_ids'];
        $user_ids = explode(", ", $old);

        $users = array();

        foreach($user_ids as $user_id){
        	$user = $this->usersDAO->selectById($user_id);
        	//var_dump($flowcharts);
        	$flowcharts = $this->flowchartDAO->selectByGroupIdAndUserId($_GET['groupid'],$user['id']);
        	//var_dump($flowcharts);
        	if(!empty($flowcharts)){
        		//var_dump('hello');
        		$user['flowcharts'] = array();
        		foreach($flowcharts as $flowchart){
        			array_push($user['flowcharts'],$flowchart);
        		}
        		//var_dump($user);
        	}
        	//var_dump($flowchart);
        	//$user['flowcharts']$flowchart);
        	array_push($users, $user);

        }

        //show flowcharts from group
        //$this->set('flowcharts',$this->flowchartDAO->selectByGroupId($_GET['groupid']));

        $detail = false;

        //detailpagina
        if(!empty($_GET['detailid'])){
        	$detail = $this->groupDAO->selectById($_GET['detailid']);
			$this->set('detail',$detail);
        }
        //var_dump($users);
        $this->set('users',$users);
	}

	public function listgroups(){

		$this->set('groups', $this->groupDAO->notInGroupYet($_SESSION['user']['id']));
		$this->set('mygroups', $this->groupDAO->selectByUserId($_SESSION['user']['id']));

		$errors = array();

	}

	public function addme(){
		$errors = array();
		$data = $_POST;

		if(empty($errors)){

			$test = $this->groupDAO->selectAllUserIds($data['addme']);

			$old = $test[0]['user_ids'];
			$user_ids = explode(", ", $old);
			$new = $old .', '. $_SESSION['user']['id'];

		 	$addMe = array(
		 		"group" => $data['addme'],
		 		"user_id" => $new
			);

			$add = $this->groupDAO->update($_POST['addme'],$addMe);
			if(!empty($add)){
				$_SESSION['info'] = 'You have been added to the group';
				$this->redirect('index.php?page=listgroups');
			}else{
				$_SESSION['error'] = 'Something went wrong';
			}

		}
		
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
			$this->set('chosen', $chosen);
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
			$group = '';
			$name = 'untitled';
			$color = '#ddd';
			//var_dump($data);

			//als er iets is gestuurd
			if(!empty($_POST)){
				//get name
				//var_dump($data['name']);
				if(!empty($data['name'])){$name = $data['name'];}
				//check if user is logged in
				if(!empty($_SESSION['user'])){
					$userId = $_SESSION['user']['id'];
				}else{
					$errors['user'] = 'Not logged in'; 
					//redirect or popup to register
					//TODO
				}
				if(!empty($_POST['groupId'])){
						$group = $_POST['groupId'];
					}
				//save flowchart
				//TODO: shape_ids en line_ids niet nodig eigenlijk want flowchart_id wordt opgeslagen bij shapes en lines
				$flowchart = array(
					'name' => $name,
					'user_id' => $userId,
					'group_id' => $group,
					'shape_ids' => ',',
					'line_ids' => ',');
				if(empty($errors)){
					//save group_id

					//save flowchart
					if(!empty($_POST['id'])){
						$existing = $this->flowchartDAO->selectById($_POST['id']);
					
						//var_dump($existing);
						if($existing && $existing['user_id'] == $_SESSION['user']['id']){
							$this->flowchartDAO->delete($_POST['id']);
						}
					}
					//$existing = $this->flowchartDAO->selectById
					$makeFlowchart = $this->flowchartDAO->insert($flowchart);
					if(!$makeFlowchart){
						$errors['flowchart'] = $this->flowchartDAO->getValidationErrors($flowchart);
					}else{
						//flowchart-save succeeded
						//get flowchart id
						$flowchart_id = (int)$makeFlowchart['id'];
						//var_dump($data['shapes']);
						//als er shapes zijn gesaved
						if(!empty($data['shapes'])){
							//var_dump($data['shapes']);
							foreach($data['shapes'] as $shape){
								//var_dump($shape['x']);
								//set shapesDAO voor elke shape
								$shapeData = array(
									'flowchart_id' => $flowchart_id,
									'x' => (int)$shape['x'],
									'y' => (int)$shape['y'],
									'width' => (int)$shape['width'],
									'height' => (int)$shape['height'],
									'color' => $shape['color'],
									'type' => $shape['type'],
									'content' => $shape['content']
								);
								var_dump($shapeData);
								$makeShape = $this->shapeDAO->insert($shapeData);
								var_dump($makeShape);
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
									'x1' => (int)$line['x1'],
									'y1' => (int)$line['y1'],
									'x2' => (int)$line['x2'],
									'y2' => (int)$line['y2'],
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