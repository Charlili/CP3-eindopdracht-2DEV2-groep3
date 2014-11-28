<?php

class Controller {

	public $route;
	protected $viewVars = array();
	//de juiste controller aanroepen adhv index.php en daar de juiste dao's aanroepen
	public function filter() {
		call_user_func(array($this, $this->route['action']));
	}
	//alles op scherm zetten
	public function render() {
		//de html oproepen specifiek voor de url
		$this->createViewVarWithContent();
		//alle layout errond plakken zoals nav, aside, etc
		$this->renderInLayout();
		//session crap unsetten
		$this->cleanupSessionMessages();
	}
	//wordt gebruikt in de controllers om de belangrijke variabelen mee te geven die wordt opgeroepen in de html
	public function set($variableName, $value) {
		$this->viewVars[$variableName] = $value;
	}
	//redirect ipv header blabla, gewoon gemakkelijk 
	public function redirect($url) {
		header("Location: {$url}");
		exit();
	}
	//zie bovenaan bij functie render
	private function createViewVarWithContent() {
		extract($this->viewVars, EXTR_OVERWRITE);
		ob_start();
		require WWW_ROOT . 'view' . DS . strtolower($this->route['controller']) . DS . $this->route['action'] . '.php';
		$content = ob_get_clean();
		$this->set('content', $content);
	}

	private function renderInLayout() {
		extract($this->viewVars, EXTR_OVERWRITE);
		include WWW_ROOT . 'view' . DS . 'layout.php';
	}

	private function cleanupSessionMessages() {
		unset($_SESSION['info']);
		unset($_SESSION['error']);
	}

}