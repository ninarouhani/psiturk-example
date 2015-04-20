/***********
* PHASE 2  *
************/

memoryTask = function() {
	
	var newIndoor = indoorPictures.slice(32);
	var newOutdoor = outdoorPictures.slice(32);

	var chosen = []; // computer chosen
	var unchosen = []; // computer not chosen (but shown)
	var foils = newIndoor.concat(newOutdoor); // participant has never seen
		foils = _.shuffle(foils);

	// keep track of how many shown in block
	var chosenCount = 0;
	var unchosenCount = 0;
	var foilCount = 0;
	var memoryTrialTotalCount = 0;

	var timeLimit = 3000;

	for (var i = 0; i < cards.length; i++) {
		chosen[i] = cards[i].chosen;
		unchosen[i] = cards[i].unchosen;
	}
	
	var chosenitem = [];
	var unchosenitem = []; 
	var sequenceitem1 = [];
	var sequenceitem2 = [];

	var chosenitem = [chosen[0],chosen[2],chosen[4],chosen[6],chosen[8],chosen[10],chosen[12],chosen[14],chosen[16],chosen[18],chosen[20],chosen[22],chosen[24],chosen[26],chosen[28],chosen[30]];
		chosenitem = _.shuffle(chosenitem);

	var unchosenitem = [unchosen[0],unchosen[3],unchosen[6],unchosen[9],unchosen[12],unchosen[15],unchosen[18],unchosen[21],unchosen[24],unchosen[27],unchosen[29],unchosen[31]];
		unchosenitem = _.shuffle(unchosenitem);

	var memoryorder = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
		memoryorder = _.shuffle(memoryorder);

	var sequenceitem1 = [chosen[1],chosen[3],chosen[5],chosen[7],chosen[9],chosen[11],chosen[13],chosen[15]];
		sequenceitem1 = _.shuffle(sequenceitem1);

	var sequenceitem2 = [chosen[17],chosen[19],chosen[21],chosen[23],chosen[25],chosen[27],chosen[29],chosen[31]];
		sequenceitem2 = _.shuffle(sequenceitem2);

	var sequenceorder = [1,1,1,1,0,0,0,0];
		sequenceorder = _.shuffle(sequenceorder);	

	var preferenceleft = [];
	var preferenceright = [];

	// var memoryreward = function() {
		
	// 	if (sequenceChance < 0.5) { //lowriskfirst 
	// 		preferenceleft = [chosen[7],chosen[]];
	// 		preferenceright = [chosen[1],chosen[]];
	// 	}
	// 	else {
	// 		preferenceleft = [];
	// 		preferenceright = [];
	// 	}
	// }
	
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
			case 78:
				response = "new";
				break;
			// "n"
			case 79:
				response = "old"
				break;
			default:
				response = "";
				break;
			}

			if (response != "") {
				secondListening = false;
				// secondListening2 = true;
				// (!secondListening2) return;
				
				window.clearTimeout(timeoutID);
				
				setTimeout(function() {

				next2();
					
				}, delayTime);
			}
		}
		
		var next = function() {
			$("#memoryPicture").attr("src", "static/images/" + currentImage);
			$("#memoryPicture").show();

			// show familiar
			$("#memoryQuestion").text("\'n\' if new, \'o\' if old.");
			$("#memoryQuestion").show();
			
			startTime = new Date().getTime();
			secondListening = true;
			
			// make sure participant doesn't take too long
			function slowAlert() {
				alert("Please focus on this task!");
			}
			timeoutID = window.setTimeout(slowAlert, timeLimit);
		}

		var responseHandler2 = function(key) {
			if (!secondListening2) return;
			
			var keyCode = key.keyCode;
			var response;

			switch (keyCode) {
			// 1
			case 49:
				response = "1";
				break;
			// 2
			case 50:
				response = "2"
				break;
			// 3
			case 51:
				response = "3";
				break;
			// 4
			case 52:
				response = "4";
				break;

			default:
				response = "";
				break;
			}

			if (response != "") {
				secondListening2 = false;
				// (!secondListening2) return;
				
				window.clearTimeout(timeoutID);

				// // increment counters
				memoryTrialTotalCount++;
				
				setTimeout(function() {
					if (memoryTrialTotalCount == itemtotalTrials) {
						finish();
					}
					else {
						imageSelection();
						next();
					}
				}, delayTime);
			}
		}

		var next2 = function() {

			// show confidence
				$("#memoryQuestion").hide();
				$("#memoryQuestion").text("(1) completely certain, (2) very sure, (3) pretty sure, (4) guessing");
				$("#memoryQuestion").show();
			
			startTime = new Date().getTime();
			$("body").focus().keydown(responseHandler2);
			secondListening2 = true;
			
			// make sure participant doesn't take too long
			function slowAlert() {
				alert("Please focus on this task!");
			}
			timeoutID = window.setTimeout(slowAlert, timeLimit);
		}
		
		var imageSelection = function() {
			
			// chosen
				if (memoryorder[memoryTrialTotalCount] == 0) {
					currentImage = chosenitem[chosenCount];
					chosenCount++;
				}		
			
			// unchosen
				else if (memoryorder[memoryTrialTotalCount] == 1) {
					currentImage = unchosenitem[unchosenCount];
					unchosenCount++;
				}
			
			// foil
				else if (memoryorder[memoryTrialTotalCount] == 2) {
					currentImage = foils[foilCount];
					foilCount++;
				}
		}
		
		var finish = function() {
			$("#memoryPicture").hide();
			$("#memoryQuestion").hide();
			$("body").unbind("keydown", responseHandler);
			sequenceMemory();
		}
		
		// constants
		itemtotalTrials = 56;
		this.delayTime = 10;
		var maxChosen = 16;
		var maxUnchosen = 12;
		var maxFoils = 28;
		var currentImage;
		imageSelection();
		
		// memoryorder();
		ready();
	}
	

	// sequence memory task
	var sequenceMemory = function() {
		console.log("Sequence Memory!");
		var sequenceTrialTotalCount = 0;
		
		var ready2 = function() {
			var answer = confirm("Ready for Phase III?");
			if (answer == true) {
				$("body").focus().keydown(responseHandler); // turn on response handler
				randomSequence();
				next3();
			}
			if (answer == false) {
				ready2();
			}
		}
	
		var randomSequence = function() {

			if (sequenceorder[sequenceTrialTotalCount] == 1) {
				sequenceimage1 = sequenceitem1[sequenceroom1count];
				sequenceimage2 = sequenceitem1[sequenceroom1count+1]; 
				$("#pic1").attr("src", "static/images/" + sequenceimage1);
				$("#pic2").attr("src", "static/images/" + sequenceimage2);
				sequenceroom1count+=2;
			}	

			// 1 is outdoor, 2 is indoor
			else {
				sequenceimage1 = sequenceitem2[sequenceroom2count];
				sequenceimage2 = sequenceitem2[sequenceroom2count+1]; 
				$("#pic1").attr("src", "static/images/" + sequenceimage1);
				$("#pic2").attr("src", "static/images/" + sequenceimage2);
				sequenceroom2count+=2;
			}
		}

		var responseHandler  = function(key) {
			if (!secondListeningseq) return;

			var keyCode = key.keyCode;
			var response, first, after;

			switch (keyCode) {
			// "1"
			case 49:
				response = "left first";
				break;
			case 50:
				response = "right first";
				break;
			default:
				response = "";
				break;
			}

			if (response != "") {
				secondListening = false;
				
				window.clearTimeout(timeoutID);
				
				// hide
				$("#pic1").hide();
				$("#pic2").hide();
				$("#memoryQuestion").hide();
				$("#computer").hide();
				
				// increment counters
				sequenceTrialTotalCount++;
				
				setTimeout(function() {
					// check if task is done
					if (sequenceTrialTotalCount == seqtotalTrials) {
						finish();
					}
					else {
						randomSequence();
						next3();
					}
				}, delayTime);
			}
		}
		
		var next3 = function() {
			$("#pic1").show();
			$("#pic2").show();
			
			// show sequence
			$("#computer").text("Press \'1\' if the left image came first, \'2\' if the right image came first.");
			$("#computer").show();
			
			startTime = new Date().getTime();
			secondListeningseq = true;
			
			// make sure participant doesn't take too long
			function slowAlert() {
				alert("Please focus on this task!");
			}
			timeoutID = window.setTimeout(slowAlert, timeLimit);
		}
		
		var finish = function() {	
			$(".deck").hide();
			$("body").unbind("keydown", responseHandler);
			console.log("READY FOR 3???")
			choiceTask();
		}
		
		// constants
		seqtotalTrials = 8; // (2 per room)
		this.delayTime = 10;
		

		var sequenceroom1count= 0;
		var sequenceroom2count= 0;
		var sequenceimage1;
		var sequenceimage2;

		ready2();
	}
	
	// constants
	var totalTrials = 64;

	itemMemory();
}
