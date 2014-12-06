<?php
			
require_once __DIR__ . "/DAO.php";

class ShapesDAO extends DAO{

	public function selectAll(){
		$sql = "SELECT * 
				FROM `shapes`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	

	public function selectById($id){
		$sql = "SELECT * 
				FROM `shapes`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id",$id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByFlowchartId($flowchart_id){
        $sql = "SELECT *
         		FROM `shapes`
         		WHERE `flowchart_id` = :flowchart_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':flowchart_id', $flowchart_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

	public function delete($id){
		$sql = "DELETE 
				FROM `shapes`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id", $id);
		return $stmt->execute();
	}

	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if(empty($errors)){
			$sql = "INSERT INTO `shapes` (`flowchart_id`, `x`, `y`, `width`, `height`, `color`, `type`, `content`) 
					VALUES (:flowchart_id, :x, :y, :width, :height, :color, :type, :content)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':flowchart_id', $data["flowchart_id"]);
			$stmt->bindValue(':x', $data["x"]);
			$stmt->bindValue(':y', $data["y"]);
			$stmt->bindValue(':width', $data["width"]);
			$stmt->bindValue(':height', $data["height"]);
			$stmt->bindValue(':color', $data["color"]);
			$stmt->bindValue(':type', $data["type"]);
			$stmt->bindValue(':content', $data["content"]);
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

		if(!isset($data["x"])){
			$errors["x"] = "please fill in a x";
		}
		if(!isset($data["y"])){
			$errors["y"] = "please fill in a y";
		}
		if(!isset($data["width"])){
			$errors["width"] = "please fill in a width";
		}
		if(!isset($data["height"])){
			$errors["height"] = "please fill in a height";
		}

		if(empty($data["type"])){
			$errors["type"] = "please fill in a type";
		}

		if(empty($data["content"])){
			$errors["content"] = "please fill in a content";
		}
		return $errors;

	}

}