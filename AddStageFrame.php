<?php
$servername = "localhost";
$username = "root";
$password = "iniv10x";
$db = "syntheticstudy";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

/*
'map': stageFrame.map, 
				'text': stageFrame.text, 
				'x': stageFrame.x, 
				'y': stageFrame.y, 
				'parent': returnStageFrameId(stageFrame.parentFrame), 
				'referredFrame': returnStageFrameId(stageFrame.referredFrame)
*/

function addStageFrame($con, $map, $text, $x, $y, $parent, $referredFrame){
	$statement = "INSERT INTO stageframe(map, text, x, y, parent, referredFrame) VALUES ('$map', '$text', '$x', '$y', '$parent', '$referredFrame')";
	$con->query($statement);
	echo $con->insert_id; 

}

addStageFrame($conn, $_REQUEST['map'], $_REQUEST['text'], $_REQUEST['x'], $_REQUEST['y'], $_REQUEST['parent'], $_REQUEST['referredFrame']);

?>