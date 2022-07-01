<?php

// change the following paths if necessary
$yii=dirname(__FILE__).'/../yii/framework/yii.php';
$config=dirname(__FILE__).'/protected/config/main.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

require_once($yii);
Yii::createWebApplication($config);
define ('HOME', Yii::app()->baseUrl);
define ('ASSETS', HOME . '/assets/ovela');
define ('CSS', ASSETS . '/css/');
define ('JS', ASSETS . '/js/');
define ('IMAGES', ASSETS . '/images/');
define ('SKINS', ASSETS . '/skins/');
Yii::app()->run();
//Yii::createWebApplication($config)->run();
