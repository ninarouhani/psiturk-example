/***********
* PHASE 3  *
************/

var choiceTask = function() {
	
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
	
	var responseHandler  = function(key) {
		if (!firstListening) return;

		var keyCode = key.keyCode;
		var response, reward, picture;

		switch (keyCode) {
			// "1"
		case 49:
			key = 1;
			response = currentRoom.deck1;
			hideCard(2);
			break;

			// "2"
		case 50:
			key = 2;
			response = currentRoom.deck2;
			hideCard(1);
			break;

		default:
			response = "";
			break;
		}

		if (response != "") {
			console.log("Trial: " + (learningTrialCount + 1))
			firstListening = false;

			reward = response.reward();
			$("#reward").text(reward);
			$("#reward").show();

			var rt = new Date().getTime() - startTime

			// create card for later use
			var card = new Card(reward, picture);
			cards[learningTrialCount] = card;

			setTimeout(function() {
				hideCard(key);
			}, showTime);

			setTimeout(function() {
				locationChance = randomLocation();
				// $(".item1").attr("src", directory1 + item1pic[learningTrialCount])
				// $(".item2").attr("src", directory2 + item2pic[learningTrialCount])
				$(".item1")
				showCard(1);
				showCard(2);
			}, showTime*3)

			// export subject data

			// psiTurk.recordTrialData(
				// 	{'learningTrialCount':learningTrialCount,
				// 	'response':response,
				// 	'reward':reward,
				// 	'rt':rt
				// });

				// check trial count and proceed accordingly
				roomAutomator();
				// imageUpdate();
			}
		}

		// "next trial" function
		var roomAutomator = function() {
			// advance
			learningTrialCount++;
			roomTrialCount++;

			// check trials
			if (roomTrialCount == (trialsPerRoom)) { // subtract by 1 because computers start at 0
				roomCount++;
				// learningSequence();
				// reset trial room
				roomTrialCount = 0;
			}

			// check rooms
			if (learningTrialCount == totalTrials) {
				finish();
			}

			// maintain or reset room and background color
			currentRoom = rooms[roomCount];
			if (roomCount != totalRooms) {
				$("body").css('background-image', "url(static/images/" + currentRoom.context +")");
			}

			// allow events
			setTimeout(function() { firstListening = true; }, showTime*3);
			startTime = new Date().getTime();
		}

		// change image with trial
		// var imageUpdate = function() {
		// 	$(".item").attr("src", "static/images/" + pictures[imageCount]);
		// 	imageCount++;
		// }
		
		var next = function() {
			thirdListening = true; // start listening
		}
		
		// turn off response handler
		var finish = function() {12
			firstListening = false;
			// hide everything
			hideCard(1);
			hideCard(2);
			$("#welcome").hide();
			// set background to white
			$("body").css('background-color', "white");
			$("body").css('background-image', "");
			// stop accepting key presses
			$("body").unbind("keydown", responseHandler);
			// initiate second task
			memoryTask();
		}
	startTime = new Date().getTime(); // initialize first rt
}