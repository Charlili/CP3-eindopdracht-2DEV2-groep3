<?php
			
require_once __DIR__ . "/DAO.php";

class FlowchartsDAO extends DAO{

	public function selectAll(){
		$sql = "SELECT * 
				FROM `flowcharts`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	
	public function selectById($id){
		$sql = "SELECT * 
				FROM `flowcharts`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id",$id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByUserId($user_id){
		$sql = "SELECT * 
				FROM `flowcharts`
				WHERE `user_id` = :user_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":user_id",$user_id);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function delete($id){
		$sql = "DELETE 
				FROM `flowcharts`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id", $id);
		return $stmt->execute();
	}

	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if(empty($errors)){
			$sql = "INSERT INTO `flowcharts` (`user_id`, `group_ids`, `shape_ids`, `line_ids`, `name`) 
					VALUES (:user_id, :group_ids, :shape_ids, :line_ids, :name)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':user_id', $data["user_id"]);
			$stmt->bindValue(':group_ids', $data["group_ids"]);
			$stmt->bindValue(':shape_ids', $data["shape_ids"]);
			$stmt->bindValue(':line_ids', $data["line_ids"]);
			$stmt->bindValue(':name', $data["name"]);
			if($stmt->execute()){
				$lastInsertId = $this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
		}
		return false;
	}

	public function getValidationErrors($data){
		$errors = array();
		if(!isset($data["user_id"])){
			$errors["user_id"] = "please fill in a user_id";
		}

		if(empty($data["group_ids"])){
			$errors["group_ids"] = "please fill in a group_ids";
		}

		if(empty($data["shape_ids"])){
			$errors["shape_ids"] = "please fill in a shape_ids";
		}

		if(empty($data["line_ids"])){
			$errors["line_ids"] = "please fill in a line_ids";
		}

		if(empty($data["name"])){
			$errors["name"] = "please fill in a name";
		}
		return $errors;

	}

}
 No newline at end of file
