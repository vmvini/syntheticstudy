<html>
<head>
	<!-- 
		http://stackoverflow.com/questions/25227975/easeljs-broken-panning-on-zoomed-image
	-->
	<script src="d3.min.js"></script>
	<script src="jquery112.js"></script>
	<script src="easel08.js"></script>
	<script src="Utils.js"></script>
	<script src="events.js"></script>
	<script src="StageFrame.js"></script>
	<script src="daoObjects.js"></script>
	<script src="stagefactory.js"></script>
	<script src="handlers.js"></script>

	 <link rel="stylesheet" href="sstyle.css">

</head>

<body>
<?php
	$map = $_GET['map'];
?>

	<input type="hidden" id="map" value="<?php echo $map; ?>"/>

	<canvas id="myCanvas" style="background-color:white;" >
		No Canvas supported by your browser!
	</canvas>

	<div id="textInput" >
		<div id="text" contenteditable="true">

		</div>
		<div id="enterButton">
			Enter
		</div>
	</div>

	<div id="textUpdate" >
		<div id="editText" contenteditable="true">
		</div>
		<div id="chave">
			marcar
		</div>
		<div id="editEnterButton">
			Enter
		</div>

		<div id="erase">
		</div>
	</div>

</body>

<script>

	var canvasProps = new CanvasProps("myCanvas", window.innerWidth, window.innerHeight, 7, 0.1);
	var listenerManager = new EventListenerManager();

	var stage = new createjs.Stage(canvasProps.id);
	stage.enableMouseOver();

	var map_id = document.getElementById("map").value;

	var stageManager = new StageManagement(map_id, canvasProps, stage, listenerManager );

	stageManager.enableDragCanvas();
	
	var insertTextDiv = new InsertTextDiv("textInput","text", "enterButton", stageManager, listenerManager);
	var dblClickHandler = insertTextDiv.createDblClickCanvasHandler();
	dblClickHandler();
	insertTextDiv.createEnterTextHandler();

	//criando behaviors a serem usados pelo stageManager
	 var insertTextBehavior = new InsertTextBehavior(insertTextDiv, listenerManager);
	 var zoomBehavior = new ZoomBehavior(canvasProps.canvas, stageManager, listenerManager);
	 stageManager.behaviors.push(insertTextBehavior);
	 stageManager.behaviors.push(zoomBehavior);



</script>


