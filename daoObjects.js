function StageFrameDAO(stageManager){

	this.stageFrame = null;

	this.retrievedStageFrame = null;

	this.stageManager = stageManager;
	
	this.getRetrievedStageFrame = function(){
		return this.retrievedStageFrame;
	};

	this.fetchOriginStageFrame = function(mapId){
		$.ajax({
			type: "POST", 
			url: "GetStageFrame.php",
			data:{'mapId':mapId },
			success: this.createGetStageFrameCallback()
		});
	};

	this.addStageFrame = function(stageFrame){
		this.stageFrame = stageFrame;

		$.ajax({
			type: "POST",
			url: "AddStageFrame.php",
			//data: {'userName':name, 'pass':pass, 'email':email},
			data: {
				'map': stageFrame.map, 
				'text': stageFrame.text, 
				'x': stageFrame.x, 
				'y': stageFrame.y, 
				'parent': returnStageFrameId(stageFrame.parentFrame), 
				'referredFrame': returnStageFrameId(stageFrame.referredFrame)
			},
			success: this.createAddCallback()
		});
	};

	function returnStageFrameId(stageFrame){
		if(stageFrame){
			console.log("id: " + stageFrame.id);
			return stageFrame.id;
		}
		return null;
	}

	this.createGetStageFrameCallback = function(){
		var that = this;
		return function(arrayStageFrame){
			//processar o array e construir o stageframe origin
			var stageFrames = jQuery.parseJSON(arrayStageFrame);
			if(stageFrames.length > 0){
				//StageFrame(map, stage2, parentFrame, referredFrame, stringtext, font, color)
				that.retrievedStageFrame = new StageFrame(stageFrames[0].map, that.stageManager.stage, null, null, stageFrames[0].text);
				that.retrievedStageFrame.id = stageFrames[0].id;
				that.stageManager.loadMap(that.retrievedStageFrame);
				for(var i = 1; i < stageFrames.length; i++){
					var child = new StageFrame(stageFrames[i].map, that.stageManager.stage, that.retrievedStageFrame, null, stageFrames[i].text, "48px Arial", "#000");
					child.id = stageFrames[i].id;
					child.x = stageFrames[i].x; 
					child.y = stageFrames[i].y;
					that.stageManager.prepareStageFrame(child);
				}

			}
			else{
				//nao possui textos salvos
				that.stageManager.startNewMap();
			}
			//limpar referencia retrievedStageFrame para que as proximas chamadas nao peguem o ultimo stageFrame recuperado
			//that.retrievedStageFrame = null; se der erro use isso.

		};
	};


	this.createAddCallback = function(){
		var that = this;
		return function(id){
			that.stageFrame.id = id;
		};
	};

}