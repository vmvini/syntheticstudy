function StageFrameDAO(){

	this.stageFrame = null;

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

	this.createAddCallback = function(){
		var that = this;
		return function(id){
			that.stageFrame.id = id;;
		};
	};

}