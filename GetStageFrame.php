<?php
$servername = "localhost";
$username = "root";
$password = "iniv10x";
$db = "syntheticstudy";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

function getOriginStageFrame($con, $mapId){
	$stageFrames = array();

	$statement = "SELECT * FROM stageframe WHERE map = '$mapId' AND parent = 0";
	$result = $con->query($statement);
	$linha = $result->fetch_assoc();
	$stageFrames[0] = array("id" => $linha["id"],
							"map" => $linha["map"], 
							"text" => $linha["text"],
							"x" => $linha["x"],
							"y" => $linha["y"],
							"parent" => $linha["parent"],
							"referredFrame" => $linha["referredFrame"] );
	$count = 1;


	$statement = "SELECT * FROM stageframe WHERE map = '$mapId' AND parent = " . $stageFrames[0]["id"];
	
	$result = $con->query($statement);
	if($result->num_rows > 0){
		while($row = $result->fetch_assoc()){
			$stageFrames[$count++] = array("id" => $row["id"],
							"map" => $row["map"], 
							"text" => $row["text"],
							"x" => $row["x"],
							"y" => $row["y"],
							"parent" => $row["parent"],
							"referredFrame" => $row["referredFrame"] );
		}
	}
	echo json_encode($stageFrames);
}

getOriginStageFrame($conn, $_REQUEST['mapId']);

?>