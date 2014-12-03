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

	public function selectByGroupname($groupname){
		$sql = "SELECT *
				FROM `groups`
				WHERE `name` = :groupname";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":groupname", $groupname);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByUserId($user_id){
		$sql = "SELECT *
				FROM `groups`
				WHERE `user_ids` = :user_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":user_id", $user_id);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function getUsersFromGroup($group_id){
		$sql = "SELECT *
				FROM `groups`
				INNER JOIN `users`
				ON users.id = groups.user_ids 
				WHERE groups.id = :group_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":group_id", $group_id);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	
	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if(empty($errors)){
			$sql = "INSERT INTO `groups` (`name`, `description`, `user_ids`) 
					VALUES (:name, :description, :user_ids)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':name', $data["name"]);
			$stmt->bindValue(':description', $data["description"]);
			$stmt->bindValue(':user_ids', $data['user_ids']);
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
			$errors["name"] = "Please fill in a groupname";
		}

		if(!isset($data["description"])){
			$errors["description"] = "Please fill in a description";
		}

		/*USERS*/

		return $errors;

	}
	
}