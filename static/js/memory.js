/***********
* PHASE 2  *
************/

memoryTask = function() {
	
	// assuming indoor/outdoor are sampled from equally...
	// var oldIndoor = indoorPictures.slice(0, (learningTask.totalTrials / 2));
	var newIndoor = indoorPictures.slice(33);
	// var oldOutdoor = outdoorPictures.slice(0, (learningTask.totalTrials / 2));
	var newOutdoor = outdoorPictures.slice(33);

	var chosen = []; // computer chosen
	var unchosen = []; // computer not chosen (but shown)
	var foils = newIndoor.concat(newOutdoor); // participant has never seen
	console.log(chosen);
	console.log(unchosen); 
	console.log(foils);


var timeLimit = 3000;

	console.log(cards);
	// keep track of how many shown in block
	var chosenCount = 0;
	var unchosenCount = 0;
	var foilCount = 0;
	
	for (var i = 0; i < cards.length; i++) {
		chosen[i] = cards[i].picture;
		unchosen[i] = cards[i].unchosen;
	}
	
	function SequentialBlock(first, after) {
		this.first = first;
		this.after = after;
	}
	
	var startTime; // time of presentation for RT calculations
	
	// item memory task
	var itemMemory = function() {
		
		var ready = function() {
			var answer = confirm("Ready for Phase II?");
			if (answer == true) {
				$("body").focus().keydown(responseHandler); // turn on response handler
				next();
			}
			if (answer == false) {
				ready();
			}
		}
		
		var responseHandler = function(key) {
			if (!secondListening) return;
			
			var keyCode = key.keyCode;
			var response;

			switch (keyCode) {
			// "y"
			case 89:
				response = "yes";
				break;
			// "n"
			case 78:
				response = "no"
				break;
			default:
				response = "";
				break;
			}

			if (response != "") {
				secondListening = false;
				
				window.clearTimeout(timeoutID);
				
				// hide
				$(".memory").hide();
				
				// confidence rating
				var confidence = prompt("On scale from 1 to 10, how confident are you in your judgment?");
				
				// increment counters
				memoryTrialTotalCount++;
				
				setTimeout(function() {
					if (memoryTrialTotalCount == (totalTrials / 2)) {
						alert("INSTRUCTION!");
					}
					// check if task is done
					if (memoryTrialTotalCount == totalTrials) {
						finish();
					}
					else {
						imageSelection();
						next();
					}
				}, delayTime);
			}
		}
		
		var next = function() {
			$("#memoryPicture").attr("src", + currentImage);
			$("#memoryPicture").show();

			// show familiar
			$("#memoryQuestion").text("Press \'y\' if this image is new, \'n\' if this image is old");
			$("#memoryQuestion").show();
			
			startTime = new Date().getTime();
			secondListening = true;
			
			// make sure participant doesn't take too long
			function slowAlert() {
				alert("Please focus on this task!");
			}
			timeoutID = window.setTimeout(slowAlert, timeLimit);
		}
		
		var imageSelection = function() {
			var rand = _.random(0, 2);
			
			// chosen
			if (rand == 0) {
				if (chosenCount == maxChosen) {
					imageSelection();
				}
				else {
					currentImage = chosen[chosenCount];
					chosenCount++;
				}
			}
			
			// unchosen
			else if (rand == 1) {
				if (unchosenCount == maxUnchosen) {
					imageSelection();
				}
				else {
					currentImage = unchosen[unchosenCount];
					unchosenCount++;
				}
			}
			
			// foil
			else if (rand == 2) {
				if (foilCount == maxFoils) {
					imageSelection();
				}
				else {
					currentImage = foils[foilCount];
					foilCount++;
				}
			}
		}
		
		var finish = function() {
			$(".memory").hide();
			$("body").unbind("keydown", responseHandler);
			sequenceMemory();
		}
		
		// constants
		// this.totalRooms = 2;
		this.totalTrials = 32;
		// this.trialsPerRoom = totalTrials / totalRooms;
		this.delayTime = 10;
		var maxChosen = 16;
		var maxUnchosen = 12;
		var maxFoils = 28;
		var currentImage;
		imageSelection();
		
		this.memoryTrialTotalCount = 0;
		// this.roomCount = 0;
		
		ready();
	}
	
	// sequence memory task
	var sequenceMemory = function() {
		console.log("Sequence Memory!");
		
		var ready = function() {
			var answer = confirm("Ready for Phase III?");
			if (answer == true) {
				$("body").focus().keydown(responseHandler); // turn on response handler
				next();
			}
			if (answer == false) {
				ready();
			}
		}
		
		var responseHandler  = function(key) {
			if (!secondListening) return;

			var keyCode = key.keyCode;
			var response, first, after;

			switch (keyCode) {
			// "1"
			case 49:
				// differentiate selected
				if (locationChance < 0.5) {
					first = currentBlock.first;
					after = currentBlock.after;
				}
				else {
					first = currentBlock.after;
					after = currentBlock.first;
				}
				break;
				
			// "2"
			case 50:
				// differentiate selected
				if (locationChance < 0.5) {
					first = currentBlock.after;
					after = currentBlock.first;
				}
				else {
					first = currentBlock.first;
					after = currentBlock.after;
				}
				break;

			default:
				response = "";
				break;
			}

			if (response != "") {
				secondListening = false;
				
				window.clearTimeout(timeoutID);
				
				// hide
				$("#sequencePic1").hide();
				$("#sequencePic2").hide();
				$("#sequenceQuestion").hide();
				
				// increment counters
				sequenceTrialTotalCount++;
				currentBlock = chosenSplice[sequenceTrialTotalCount];
				
				setTimeout(function() {
					if (sequenceTrialTotalCount == (this.totalTrials / 2)) {
						alert("INSTRUCTION!");
					}
					// check if task is done
					if (sequenceTrialTotalCount == this.totalTrials) {
						finish();
					}
					else {
						randomLocation();
						next();
					}
				}, delayTime);
			}
		}
		
		var next = function() {
			$("#sequencePic1").show();
			$("#sequencePic2").show();
			
			// show sequence
			$("#sequenceQuestion").text("Press \'1\' if the left image came first, \'2\' if the right image came first");
			$("#sequenceQuestion").show();
			
			startTime = new Date().getTime();
			secondListening = true;
			
			// make sure participant doesn't take too long
			function slowAlert() {
				alert("Please focus on this task!");
			}
			timeoutID = window.setTimeout(slowAlert, timeLimit);
		}
		
		var finish = function() {	
			$(".sequence").hide();
			$("body").unbind("keydown", responseHandler);
			console.log("READY FOR 3???")
		}
		
		var randomLocation = function() {
			locationChance = Math.random();
		
			// 1 is indoor, 2 is outdoor
			if (locationChance < 0.5) {
				$("#sequencePic1").attr("src", + currentBlock.first);
				$("#sequencePic2").attr("src", + currentBlock.after);
			}	

			// 1 is outdoor, 2 is indoor
			else {
				$("#sequencePic1").attr("src", + currentBlock.after);
				$("#sequencePic2").attr("src", + currentBlock.first);
			}
			
			return locationChance;
		}
		
		// constants
		// this.totalRooms = 2;
		this.totalTrials = 8; // (2 per room)
		this.trialsPerRoom = totalTrials / totalRooms;
		this.delayTime = 10;
		
		var sequenceTrialTotalCount = 0;
		
		var currentBlock = chosenSplice[sequenceTrialTotalCount];
		
		var locationChance = randomLocation();
		
		ready();
	}
	
	// because I can't figure out how to access this variable...
	var sequenceTotalTrials = 8;
	
	// pick out sequence
	var chosenSplice = [];
	// splice low (first room)
	for (var i = 0; i < (sequenceTotalTrials / 2); i++) {
		var randLo = _.random(0, ((chosen.length / 2) - 2));
		var afterRand = _.random(randLo, ((chosen.length / 2) - 1));
		var afterChosen = chosen.splice(afterRand + 1, 1);
		var firstChosen = chosen.splice(randLo, 1);
		var tempBlock = new SequentialBlock(firstChosen, afterChosen);
		chosenSplice[i] = tempBlock;
	}
	var decrementingCounter = sequenceTotalTrials / 2;
	// splice high (second room)
	for (var i = (sequenceTotalTrials / 2); i < sequenceTotalTrials; i++) {
		var randHi = _.random(((chosen.length / 2) + decrementingCounter), chosen.length - 2);
		var afterRand = _.random(randHi + 1, chosen.length - 1);
		var afterChosen = chosen.splice(afterRand, 1);
		var firstChosen = chosen.splice(randHi, 1);
		var tempBlock = new SequentialBlock(firstChosen, afterChosen);
		chosenSplice[i] = tempBlock;
		decrementingCounter--;
	}

	
	chosen = _.shuffle(chosen);
	unchosen = _.shuffle(unchosen);
	foils = _.shuffle(foils);
	
	// constants
	var totalTrials = 48;
	
	itemMemory();
}
