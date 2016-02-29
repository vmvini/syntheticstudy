<html>
<head>
	


	


</head>

<body>

<?php
		
	
		$servername = "localhost";
		$username = "root";
		$password = "iniv10x";
		$db = "syntheticstudy";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $db);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 
		echo "Connected successfully";

		if($_POST['map_name']){
			addMap($conn, $_POST['map_name']);
		}

		function addMap($con, $name){	
			$statement = "INSERT INTO map(name) VALUES ('$name')";
			$con->query($statement);
		}

		function showMaps($con){
			$statement = "SELECT id, name FROM map";
			$result = $con->query($statement);
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()){ 
					?>
						<li>
							<a href="freeArea.php?map=<?php echo $row['id']; ?> "> <?php echo $row["name"] ?> </a>
						</li>
					<?php
				}
			}
		} 

?>




	<div id="maps">
		<ul>
			<?php showMaps($conn) ?>
		</ul>
	</div>

	<div id="newMap">
		novo mapa:
		<form action="index.php" method="post">
			<input type="text" id="map_name" name="map_name" /> 
			<input type="submit" value="criar mapa"/>
		</form>
	</div>


	</body>
</html>