/***********
* PHASE 1  *
************/

learningTask = function() {

	var startTime; // time of presentation for RT calculations

	// randomize indoor and outdoor image placement
	var randomLocation = function() {
		// (for convenience)
		
		// 1 is indoor, 2 is outdoor
		if (locationOrder[learningTrialTotalCount] == 1) {
			item1pic = indoorPictures[learningTrialTotalCount];
			item2pic = outdoorPictures[learningTrialTotalCount];
			$("#pic1").attr("src", "static/images/" + item1pic);
			$("#pic2").attr("src", "static/images/" + item2pic);
		}

		// 1 is outdoor, 2 is indoor
		else {
			item1pic = outdoorPictures[learningTrialTotalCount];
			item2pic = indoorPictures[learningTrialTotalCount];
			$("#pic1").attr("src", "static/images/" + item1pic);
			$("#pic2").attr("src", "static/images/" + item2pic);
		}
	}

	var randomSequence = function() {
		// randomizing risk level

		sequenceChance = Math.random();
		
		// low risk first, high risk second
		if (sequenceChance < 0.5) {
			rewardSequenceOutdoor= rewardSequenceOutdoor1;
			rewardSequenceIndoor = rewardSequenceIndoor1;
		}	

		// high risk first, low risk second
		else {
			rewardSequenceOutdoor = rewardSequenceOutdoor2;
			rewardSequenceIndoor = rewardSequenceIndoor2;
		}
	}

	var ready = function() {
		var answer = confirm("Ready?");
		if (answer == true) {
			$("body").focus().keydown(responseHandler); // turn on response handler
			$("body").show();
			next();
		}
		if (answer == false) {
			ready();
		}
	}
	
	var responseHandler = function(key) {
		if (!firstListening) return;
	
		var keyCode = key.keyCode;
		var response, reward, chosen, unchosen; // later used for psiTurk
	
		switch (keyCode) {
		// "1"
		case 32:
			break;
			
		default:
			response = "";
			break;
		}
			
		if (response != "") {
			firstListening = false;
			
			window.clearTimeout(timeoutID);
			
			// save items for future reference
			var card = new Card(reward, chosen, unchosen);
			cards[learningTrialTotalCount] = card;

			// hide cards
			hideCard(locationOrder[learningTrialTotalCount]);
			$(".reward").hide();
			hideCard(1);
			hideCard(2);
			
			// increment counters
			learningTrialCount++;
			learningTrialTotalCount++;
			
			// show for next trial
			setTimeout(function() {
				showCard(1);
				showCard(2);
				// check whether to advance to next room
				if (learningTrialCount == trialsPerRoom) {
					nextRoom();
				}
				// set room
				currentRoom = rooms[roomCount];
				// as long as rooms not exhausted, continue
				if (roomCount != totalRooms) {
					$("body").css('background-image', "url(static/images/" + currentRoom.context + ")");
				}
				
				// check if task is done
				if (learningTrialTotalCount == totalTrials) {
					finish();
				}
				else {
					// reassigns next pictures
					locationChance = randomLocation();
					next();
				}
			}, hideTime);
		}
	}

	next = function () {
		setTimeout(function() {

			// show correct card
			if (computerPick[learningTrialTotalCount] == 1) {
				$("#reward1").show();
				hideCard(2);
				chosen = item1pic;
				unchosen = item2pic;
			}
			else {
				$("#reward2").show();
				hideCard(1);
				chosen = item2pic; 
				unchosen = item1pic;
			}

			if (rewardOrder[learningTrialTotalCount] == 1) {
				reward = rewardSequenceIndoor[indoorCount];
				indoorCount++;
			}
			else {
				reward = rewardSequenceOutdoor[outdoorCount];
				outdoorCount++;
			}
		
			card = new Card(reward, chosen, unchosen);
			cards[learningTrialTotalCount] = card;
			console.log(Card);

			// show reward
			$(".reward").text("$" + reward);

			// ***insert psiTurk syntax around here***
			
			// new RT
			startTime = new Date().getTime();
			firstListening = true;
			
			// make sure participant doesn't take too long
			function slowAlert() {
				alert("Please focus on this task!");
			}
			timeoutID = window.setTimeout(slowAlert, timeLimit);
		}, showTime);
		
	}
	
	// next room
	var nextRoom = function() {
		learningTrialCount = 0;
		roomCount++;
	}
	
	// finish phase I
	var finish = function() {
		firstListening = false;
		// hide everything
		hideCard(1);
		hideCard(2);
		// $("#computer").hide();
		$(".reward").hide();
		// set background to white
		$("body").css('background-color', "white");
		$("body").css('background-image', "");
		// stop accepting key presses
		$("body").unbind("keydown", responseHandler);
		// initiate second task
		memoryTask();
	}
	
	// separate constant to allow variability (accessible properties for later use)
	var totalRooms = 2;
	var totalTrials = 32;
	var trialsPerRoom = totalTrials / totalRooms;
	var hideTime = 10; // (ms)
	var showTime = 10;
	var timeLimit = 6000;

	// sample rooms
	var room1 = new Room;
	var room2 = new Room;
	
	// contexts
	var context1 = "White.jpg"
	var context2 = "Purple.jpg"

	// randomize rooms
	var rooms = [room1, room2];
	rooms = _.shuffle(rooms);

	// randomize context order
	var contexts = [context1, context2]
	contexts = _.shuffle(contexts);
	// assign backgrounds/scenes to rooms
	for (i = 0; i < totalRooms; i++) {
		rooms[i].context = contexts[i];
	}
	
	// initialize counters
	var learningTrialCount = 0;
	var learningTrialTotalCount = 0;
	var indoorCount = 0;
	var outdoorCount = 0;
	
	// set first room
	var roomCount = 0;
	var currentRoom = rooms[roomCount];
	
	// document.body.style.backgroundColor = currentRoom.background; // alternative method
	$("body").css('background-image', "url(static/images/" + currentRoom.context + ")"); // jQuery method

	// randomize first image placement
	var locationChance;
	var randomSequence;

	var showPage = function() {
		psiTurk.showPage("stage.html");
		locationChance = randomLocation();
		sequenceChance = randomSequence();
		$("body").hide();
		$(".reward").hide();
	}
	
	showPage();
	
	// hide cards

	
	ready(); // start task
	
} // end learning 