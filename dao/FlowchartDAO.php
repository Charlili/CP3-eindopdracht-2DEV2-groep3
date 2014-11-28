<?php
			
require_once __DIR__ . "/DAO.php";

class FlowchartDAO extends DAO{

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
			$sql = "INSERT INTO `flowcharts` (`eig1`, `eig2`, `eig3`, `eig4`, `eig5`) 
					VALUES (:eig1, :eig2, :eig3, :eig4, :eig5)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':eig1', $data["eig1"]);
			$stmt->bindValue(':eig2', $data["eig2"]);
			$stmt->bindValue(':eig3', $data["eig3"]);
			$stmt->bindValue(':eig4', $data["eig4"]);
			$stmt->bindValue(':eig5', $data["eig5"]);
			if($stmt->execute()){
				$lastInsertId = $this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
		}
		return false;
	}

	public function getValidationErrors($data){
		$errors = array();
		if(!isset($data["eig1"])){
			$errors["eig1"] = "please fill in a eig1";
		}

		if(!isset($data["eig2"])){
			$errors["eig2"] = "please fill in a eig2";
		}

		if(empty($data["eig3"])){
			$errors["eig3"] = "please fill in a eig3";
		}

		if(!isset($data["eig4"])){
			$errors["eig4"] = "please fill in a eig4";
		}

		if(!isset($data["eig5"])){
			$errors["eig5"] = "please fill in a eig5";
		}
		return $errors;

	}

}