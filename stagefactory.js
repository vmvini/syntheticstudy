
//CanvasProps objeto que tem o Canvas e suas propriedades
function CanvasProps(id, width, height, max_zoom, min_zoom){
	this.id = id;
	this.width = width;
	this.height = height;
	this.max_zoom = max_zoom;
	this.min_zoom = min_zoom;
	this.canvas = document.getElementById(id);
	this.canvas.width = width;
	this.canvas.height = height;  


	this.getTarget = function(){
		return { name : this.id, element : this.canvas };
	}; 



}


//StageManagment objeto que gerencia o stage
function StageManagement(mapId, canvasProps, stage, listenerManager){

	this.canvasProps = canvasProps;
	this.stage = stage;
	this.listenerManager = listenerManager;
	this.behaviors = [];
	this.mapId = mapId;
	this.dao = new StageFrameDAO();

	//primeiro frame pai de todos os outros do mapId não possui conteúdo.
	this.currentFrame = new StageFrame(this.mapId, this.stage, null, null, "origin"); 
	//persistir no mysql através do StageFrameDAO
	this.dao.addStageFrame(this.currentFrame);

	this.originFrame = this.currentFrame;
	

	this.createTextHitArea = function(textElement){
		

	}

	this.addText = function(stringtext, x, y){
		//constructor StageFrame(map, stage2, parentFrame, referredFrame, stringtext, font, color)
		var label1 = new StageFrame(this.mapId, this.stage, this.currentFrame, null, stringtext, "48px Arial", "#000");
		label1.x = x;
		label1.y = y;
		label1.alpha = 1;
		label1.lineWidth = 1000;

		this.dao.addStageFrame(label1);


		var hit = new createjs.Shape();

		hit.graphics.beginFill("#000").drawRect(0, 0, label1.getBounds().width + 10, label1.getMeasuredHeight() + 10);
		label1.hitArea = hit;

		for(var x = 0; x < this.behaviors.length; x++){
			this.behaviors[x].applyTo(label1);
		}
		
		this.currentFrame.addChildFrame(label1);
		this.currentFrame.drawLastInserted(); //é melhor mudar para drawLastInserted

		
	};

	this.translateMouseCoordinates = function(displayObject, x, y){
		return displayObject.globalToLocal(x, y);
	};


	this.setInitialScale = function(){
		this.stage.scaleX = 0.1;
		this.stage.scaleY = 0.1;
	}

	this.setEndScale = function(){
		this.stage.scaleX = 6.8;
		this.stage.scaleY = 6.8;
	}

	this.zoomLimitsBehavior  = function(lastMouseOverFrame){
		if(this.stage.scaleX >= this.canvasProps.max_zoom){
			


			this.currentFrame = lastMouseOverFrame;
			this.currentFrame.saveFrameState();
			this.setInitialScale();

			//this.stage.setTransform(point.x, point.y);
			
			this.currentFrame.drawChilds();

			//retirar zoom
			var event;
			event = document.createEvent("HTMLEvents");
    		event.initEvent("mouseout", true, true);
   			event.eventName = "mouseout";
   			this.currentFrame.dispatchEvent(event);

   			



		}
		else if(this.stage.scaleX <= this.canvasProps.min_zoom){
			if(!this.currentFrame.parentFrame){
				//se o pai do current frame for null, significa que esta no quadro inicial
				this.setInitialScale();
				this.stage.setTransform(0,0);
			}
			else{
				
				this.currentFrame.restoreFrameState();
				this.currentFrame = this.currentFrame.parentFrame;
				this.currentFrame.drawChilds();
				
			}
		}

	};


	this.enableDragCanvas = function(){
		var that = this;
		this.stage.addEventListener("stagemousedown", function(e) {
			var subThat = that;
			var offset={x:that.stage.x-e.stageX,y:that.stage.y-e.stageY};
			that.stage.addEventListener("stagemousemove",function(ev) {

				subThat.stage.x = ev.stageX+offset.x;
				subThat.stage.y = ev.stageY+offset.y;
				subThat.stage.update();
			});
			subThat.stage.addEventListener("stagemouseup", function(){

				subThat.stage.removeAllEventListeners("stagemousemove");
			});
		});
	};
	

	




}

