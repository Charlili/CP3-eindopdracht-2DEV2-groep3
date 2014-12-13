<?php
			
require_once __DIR__ . "/DAO.php";

class UsersDAO extends DAO{

	public function selectAll(){
		$sql = "SELECT * 
				FROM `users`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectById($id){
		$sql = "SELECT * 
				FROM `users`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id",$id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByEmail($email){
        $sql = "SELECT *
         		FROM `users`
         		WHERE `email` = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

	public function selectByUsername($username){
        $sql = "SELECT *
         		FROM `users`
         		WHERE `username` = :username";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':username', $username);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if(empty($errors)){
			$sql = "INSERT INTO `users` (`username`, `email`, `extension`, `password`) 
					VALUES (:username, :email, :extension, :password)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':username', $data["username"]);
			$stmt->bindValue(':email', $data["email"]);
			$stmt->bindValue(':extension', $data["extension"]);
			$stmt->bindValue(':password', $data["password"]);
			if($stmt->execute()){
				$lastInsertId = $this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
		}
		return false;
	}

	public function getValidationErrors($data){
		$errors = array();
		if(!isset($data["username"])){
			$errors["username"] = "please fill in a username";
		}

		if(!isset($data["email"])){
			$errors["email"] = "please fill in your email";
		}

		if(empty($data["extension"])){
			$errors["extension"] = "please fill in a extension";
		}

		if(!isset($data["password"])){
			$errors["password"] = "please fill in a password";
		}

		return $errors;

	}


	

	
}