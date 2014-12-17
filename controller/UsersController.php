<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'js/vendor/phpass' . DS . 'Phpass.php';
require_once WWW_ROOT . 'js/vendor/php-image-resize' . DS . 'ImageResize.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'UsersDAO.php';

class UsersController extends Controller {
	//DAOs aanmaken
	private $usersDAO;

	function __construct() {
		$this->usersDAO = new UsersDAO();

	}
	
	public function register(){
		
		$errors = array();

		
		if(!empty($_POST)) {

			if(empty($_POST['username'])) {
				$errors['username'] = 'Please enter a username';
			}

			if(empty($_POST['email'])) {
				$errors['email'] = 'Please enter your email';
			} else {
				$existing = $this->usersDAO->selectByEmail($_POST["email"]);

				if(!empty($existing)) {
					$errors['email'] = 'Email address is already in use';
				}
			}

			if(empty($_POST['password'])) {
				$errors['password'] = 'Please enter a password';
			}

			if($_POST['confirm_password'] != $_POST['password']) {
				$errors['confirm_password'] = 'Passwords do not match';
			}
			//IMAGE FUNCTIONALITEIT
			$errorImage = "";

			if(empty($_POST['image'])){
                if(!empty($_FILES['image']['error'])){
                    $errorImage = 'Something went wrong, please try again';
                }
                
                if(empty($errorImage)){
                    $size = getimagesize($_FILES['image']['tmp_name']);
                    if(empty($size)){
                        $errorImage = 'Uploaded file is not an image';
                    }
                }

                //MAX SIZE
                
                if($errorImage == ""){
                	$loc = WWW_ROOT . 'uploads' . DS . $_POST['username'];
                	$dotPos = strrpos($_FILES['image']['name'],'.');
                    $name = substr($_FILES['image']['name'],0,$dotPos);
                    $extension = substr($_FILES['image']['name'],$dotPos+1);
                    
                    $sourceFile = $_FILES['image']['tmp_name'];
                    $destFile = $loc . DS . $_POST['username']. ".". $extension;

                    //move_uploaded_file($sourceFile, $destFile);

                    
                    if(!file_exists($loc)){
                    	mkdir(WWW_ROOT . 'uploads' . DS . $_POST['username']);
                    }

                    
        
                    $image = new Eventviva\ImageResize($sourceFile);
                    $image->save($loc . DS . $_POST['username'] . '.' . $extension);
                    $image->resizeToHeight(100);
                    //$image->save(WWW_ROOT . 'uploads' . DS . $name . '_th.' . $extension);
                    $image->save($loc . DS . $_POST['username'] . '_th.' . $extension);
                }else{
                	$loc = WWW_ROOT . 'uploads' . DS . $_POST['username'];
                	if(!file_exists($loc)){
                    	mkdir(WWW_ROOT . 'uploads' . DS . $_POST['username']);
                    }
                	$sourceFile = WWW_ROOT . 'uploads' . DS . 'addprofilepic.jpg';
                	$extension = 'jpg';
                	$image = new Eventviva\ImageResize($sourceFile);
                    $image->save($loc . DS . $_POST['username'] . '.' . $extension);
                    $image->resizeToHeight(100);
                    //$image->save(WWW_ROOT . 'uploads' . DS . $name . '_th.' . $extension);
                    $image->save($loc . DS . $_POST['username'] . '_th.' . $extension);	
                }
            }

			if(empty($errors)) {

				$hasher = new \Phpass\Hash;
				$passwordHash = $hasher->hashPassword($_POST['password']);

				$newUser = array(
					"email"=>$_POST['email'],
					"password"=>$passwordHash,
					"username"=>$_POST['username'],
					"extension"=>$extension
				);

				$user = $this->usersDAO->insert($newUser);
				if(!empty($user)) {
					$_SESSION['info'] = 'Registration successful';
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

	public function login(){

		$errors = array();

		if(!empty($_POST)){
			if(empty($_POST['username'])) {
				$errors['username'] = 'Please enter your username';
			}
			if(empty($_POST['password'])) {
				$errors['password'] = 'Please enter your password';
			}
			if(empty($errors)){
				
				$existing = $this->usersDAO->selectByUsername($_POST['username']);
				//var_dump($existing);

				if(!empty($existing)){
					$hasher = new \Phpass\Hash;
					if ($hasher->checkPassword($_POST['password'], $existing['password'])) {
						//ingelogd
						$_SESSION['user'] = $existing;
						$this->redirect('index.php?page=index');
						exit;
					} else { 
						$_SESSION['error'] = 'That user doesnt exist. Do you want to register?';
						$this->redirect('index.php?page=register');
						exit;
					}
				}else{
					$_SESSION['error'] = 'That user doesnt exist. Do you want to register?';
					$this->redirect('index.php?page=register');
					exit;
				}
			}else{
					$_SESSION['error'] = 'Please fill in your username -and- password.';
					$this->redirect('index.php?page=home');

					
			}
		}
		
		
		$this->set('errors',$errors);
		// if(empty($_SESSION['book'])){
		// 	unset($_SESSION['book']);
		// 	$this->redirect("index.php");}
		// else{

		// 	$this->redirect("index.php?page=book");
			
		// }
		

	}

	public function logout(){
		unset($_SESSION['user']);
		$_SESSION['info'] = 'logged out';
		$this->redirect('index.php');
		
	}

	public function checkLoggedIn(){
		if(!empty($_SESSION['user'])){
			//voor ajax call altijd echo gebruiken ipv return
			//ajax verwacht tekst terug, dus echo.
			echo true;
		}
		echo false;

	}

}