<?php  
	
class DAO{

	//DAO::variabelenaam , nut van een static variabele. overal direct aanspreekbaar
	private static $dbHost = "localhost";
	private static $dbName = "CP3-eindopdracht-2DEV2-groep3";
	private static $dbUser = "user";
	private static $dbPass = "pass";
	private static $sharedPDO;

	//enkel aanspreekbaar binnen de package(map)
	protected $pdo;

	function __construct(){
		if(empty(self::$sharedPDO)){
			self::$sharedPDO = new PDO("mysql:host=" . self::$dbHost . ";dbname=" . self::$dbName, self::$dbUser, self::$dbPass);
			self::$sharedPDO->exec("SET CHARACTER SET utf8");
			self::$sharedPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			self::$sharedPDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		}
		$this->pdo =& self::$sharedPDO;
	}

}

?>