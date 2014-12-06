<?php
			
require_once __DIR__ . "/DAO.php";

class LinesDAO extends DAO{

	public function selectAll(){
		$sql = "SELECT * 
				FROM `lines`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	

	public function selectById($id){
		$sql = "SELECT * 
				FROM `lines`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id",$id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByFlowchartId($flowchart_id){
        $sql = "SELECT *
         		FROM `lines`
         		WHERE `flowchart_id` = :flowchart_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':flowchart_id', $flowchart_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

	public function delete($id){
		$sql = "DELETE 
				FROM `lines`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id", $id);
		return $stmt->execute();
	}

	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if(empty($errors)){
			$sql = "INSERT INTO `lines` (`flowchart_id`, `x1`, `y1`, `x2`, `y2`, `color`) 
					VALUES (:flowchart_id, :x1, :y1, :x2, :y2, :color)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':flowchart_id', $data["flowchart_id"]);
			$stmt->bindValue(':x1', $data["x1"]);
			$stmt->bindValue(':y1', $data["y1"]);
			$stmt->bindValue(':x2', $data["x2"]);
			$stmt->bindValue(':y2', $data["y2"]);
			$stmt->bindValue(':color', $data["color"]);
			if($stmt->execute()){
				$lastInsertId = $this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
		}
		return false;
	}

	public function getValidationErrors($data){
		$errors = array();
		if(!isset($data["flowchart_id"])){
			$errors["flowchart_id"] = "please fill in a flowchart_id";
		}

		if(!isset($data["x1"])){
			$errors["x1"] = "please fill in a x1";
		}
		if(!isset($data["y1"])){
			$errors["y1"] = "please fill in a y1";
		}
		if(!isset($data["x2"])){
			$errors["x2"] = "please fill in a x2";
		}
		if(!isset($data["y2"])){
			$errors["y2"] = "please fill in a y2";
		}
		return $errors;

	}

}