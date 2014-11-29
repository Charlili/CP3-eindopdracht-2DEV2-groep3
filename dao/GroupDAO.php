<?php
			
require_once __DIR__ . "/DAO.php";

class GroupDAO extends DAO{

	public function selectAll(){
		$sql = "SELECT * 
				FROM `groups`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectById($id){
		$sql = "SELECT * 
				FROM `groups`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id",$id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if(empty($errors)){
			$sql = "INSERT INTO `groups` (`name`, `description`) 
					VALUES (:name, :description)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':name', $data["name"]);
			$stmt->bindValue(':description', $data["description"]);
			if($stmt->execute()){
				$lastInsertId = $this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
		}
		return false;
		/*USERS*/
	}

	public function getValidationErrors($data){
		$errors = array();
		if(!isset($data["name"])){
			$errors["name"] = "please fill in a groupname";
		}

		if(!isset($data["description"])){
			$errors["description"] = "please fill in a description";
		}

		/*USERS*/

		return $errors;

	}
	
}