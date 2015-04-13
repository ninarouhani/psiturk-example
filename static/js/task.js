var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

// Task object to keep track of the current phase
var currentView;

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructions = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];

// All images & sequences to be loaded 

var indoorPractice = ["Indoor_82.jpg","Indoor_83.jpg","Indoor_84.jpg","Indoor_85.jpg","Indoor_86.jpg","Indoor_87.jpg","Indoor_88.jpg","Indoor_89.jpg","Indoor_90.jpg","Indoor_91.jpg"];
indoorPractice = _.shuffle(indoorPractice);

var outdoorPractice = ["Outdoor_88.jpg","Outdoor_89.jpg","Outdoor_90.jpg","Outdoor_91.jpg","Outdoor_92.jpg","Outdoor_93.jpg","Outdoor_94.jpg","Outdoor_95.jpg","Outdoor_96.jpg","Outdoor_97.jpg"];
outdoorPractice = _.shuffle(outdoorPractice);

var rewardPracticeLow = [5,5,5,5,5];
var rewardPracticeHigh = [10,10,10,10,10];
var locationOrderPractice = [1,1,0,0,1,1,0,1,0,1];
var computerPickPractice = [1,0,0,1,1,1,1,0,0,0];
var rewardOrderPractice = [1,0,1,0,1,1,0,0,1,0];

var zeroListening = false; // practice task
var firstListening = false; // learning task
var secondListening = false; // memory task
var thirdListening = false; // decision task
var cards = []; // array for cards
var timeoutID; // for checking focus

var indoorPictures = ["Indoor_1.jpg","Indoor_2.jpg","Indoor_3.jpg","Indoor_4.jpg","Indoor_5.jpg","Indoor_6.jpg","Indoor_7.jpg","Indoor_8.jpg","Indoor_9.jpg","Indoor_10.jpg","Indoor_11.jpg","Indoor_12.jpg","Indoor_13.jpg","Indoor_14.jpg","Indoor_15.jpg","Indoor_16.jpg","Indoor_17.jpg","Indoor_18.jpg","Indoor_19.jpg","Indoor_20.jpg","Indoor_21.jpg","Indoor_22.jpg","Indoor_23.jpg","Indoor_24.jpg","Indoor_25.jpg","Indoor_26.jpg","Indoor_27.jpg","Indoor_28.jpg","Indoor_29.jpg","Indoor_30.jpg","Indoor_31.jpg","Indoor_32.jpg","Indoor_33.jpg","Indoor_34.jpg","Indoor_35.jpg","Indoor_36.jpg","Indoor_37.jpg","Indoor_38.jpg","Indoor_39.jpg","Indoor_40.jpg","Indoor_41.jpg","Indoor_42.jpg","Indoor_43.jpg","Indoor_44.jpg","Indoor_45.jpg","Indoor_46.jpg","Indoor_47.jpg","Indoor_48.jpg","Indoor_49.jpg","Indoor_50.jpg","Indoor_51.jpg","Indoor_52.jpg","Indoor_53.jpg","Indoor_54.jpg","Indoor_55.jpg","Indoor_56.jpg","Indoor_57.jpg","Indoor_58.jpg","Indoor_59.jpg","Indoor_60.jpg","Indoor_61.jpg","Indoor_62.jpg","Indoor_63.jpg","Indoor_64.jpg","Indoor_65.jpg","Indoor_66.jpg","Indoor_67.jpg","Indoor_68.jpg","Indoor_69.jpg","Indoor_70.jpg","Indoor_71.jpg","Indoor_72.jpg","Indoor_73.jpg","Indoor_74.jpg","Indoor_75.jpg","Indoor_76.jpg","Indoor_77.jpg","Indoor_78.jpg","Indoor_79.jpg","Indoor_80.jpg","Indoor_81.jpg"];
	indoorPictures = _.shuffle(indoorPictures);

var outdoorPictures = ["Outdoor_1.jpg","Outdoor_2.jpg","Outdoor_3.jpg","Outdoor_4.jpg","Outdoor_5.jpg","Outdoor_6.jpg","Outdoor_7.jpg","Outdoor_8.jpg","Outdoor_9.jpg","Outdoor_10.jpg","Outdoor_11.jpg","Outdoor_12.jpg","Outdoor_13.jpg","Outdoor_14.jpg","Outdoor_15.jpg","Outdoor_16.jpg","Outdoor_17.jpg","Outdoor_18.jpg","Outdoor_19.jpg","Outdoor_20.jpg","Outdoor_21.jpg","Outdoor_22.jpg","Outdoor_23.jpg","Outdoor_24.jpg","Outdoor_25.jpg","Outdoor_26.jpg","Outdoor_27.jpg","Outdoor_28.jpg","Outdoor_29.jpg","Outdoor_30.jpg","Outdoor_31.jpg","Outdoor_32.jpg","Outdoor_33.jpg","Outdoor_34.jpg","Outdoor_35.jpg","Outdoor_36.jpg","Outdoor_37.jpg","Outdoor_38.jpg","Outdoor_39.jpg","Outdoor_40.jpg","Outdoor_41.jpg","Outdoor_42.jpg","Outdoor_43.jpg","Outdoor_44.jpg","Outdoor_45.jpg","Outdoor_46.jpg","Outdoor_47.jpg","Outdoor_48.jpg","Outdoor_49.jpg","Outdoor_50.jpg","Outdoor_51.jpg","Outdoor_52.jpg","Outdoor_53.jpg","Outdoor_54.jpg","Outdoor_55.jpg","Outdoor_56.jpg","Outdoor_57.jpg","Outdoor_58.jpg","Outdoor_59.jpg","Outdoor_60.jpg","Outdoor_61.jpg","Outdoor_62.jpg","Outdoor_63.jpg","Outdoor_64.jpg","Outdoor_65.jpg","Outdoor_66.jpg","Outdoor_67.jpg","Outdoor_68.jpg","Outdoor_69.jpg","Outdoor_70.jpg","Outdoor_71.jpg","Outdoor_72.jpg","Outdoor_73.jpg","Outdoor_74.jpg","Outdoor_75.jpg","Outdoor_76.jpg","Outdoor_77.jpg","Outdoor_78.jpg","Outdoor_79.jpg","Outdoor_80.jpg","Outdoor_81.jpg","Outdoor_82.jpg","Outdoor_83.jpg","Outdoor_84.jpg","Outdoor_85.jpg","Outdoor_86.jpg","Outdoor_87.jpg"];
	outdoorPictures = _.shuffle(outdoorPictures);

var rewardSequenceOutdoor1 = [1,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10];
var rewardSequenceIndoor1 = [5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2];

var rewardSequenceOutdoor2 = [2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5];
var rewardSequenceIndoor2 = [10,10,10,10,10,10,10,10,1,1,1,1,1,1,1,1];

var locationOrder = [1,1,0,1,0,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,0,1,1,0,0,1,0,1,1,0,0];
var rewardOrder = [0,1,0,1,0,0,1,1,0,1,1,0,0,1,0,1,0,1,1,0,0,1,1,0,1,0,1,0,0,1,0,1];
var computerPick = [0,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,1,1,1,0,1,1,0,];

// card object to store UX
function Card(reward, chosen, unchosen) {
	this.reward = reward;
	this.chosen = chosen;
	this.unchosen = unchosen;
}

// hide function
var hideCard = function(n) {
	$("#pic" + n).hide();
}

// show function
var showCard = function(n) {
	$("#pic" + n).show();
}

function Room() {
}

/***********
* PHASE 0  *
************/
var practiceTask = function() {

	var startTime; // time of presentation for RT calculations

	// randomize indoor and outdoor image placement
	var randomLocation = function() {
		// (for convenience)
		var item1pic, item2pic;
		
		// 1 is indoor, 2 is outdoor
		if (locationOrderPractice[practicelearningTrialCount] == 1) {
			item1pic = indoorPractice[practicelearningTrialCount];
			item2pic = outdoorPractice[practicelearningTrialCount];
			$("#pic1").attr("src", "static/images/practice/indoor/" + item1pic);
			$("#pic2").attr("src", "static/images/practice/outdoor/" + item2pic);
		}

		// 1 is outdoor, 2 is indoor
		else {
			item1pic = outdoorPractice[practicelearningTrialCount];
			item2pic = indoorPractice[practicelearningTrialCount];
			$("#pic1").attr("src", "static/images/practice/outdoor/" + item1pic);
			$("#pic2").attr("src", "static/images/practice/indoor/" + item2pic);
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
		if (!zeroListening) return;
	
		var keyCode = key.keyCode;
		var response, reward, picture, unchosen; 
		
		switch (keyCode) {
		// "1"
		case 32:
			break;
			
		default:
			response = "";
			break;
		}
			
		if (response != "") {
			zeroListening = false;
			
			window.clearTimeout(timeoutID);
			
			
			// hide cards
			hideCard(locationOrderPractice[practicelearningTrialCount]);
			$(".reward").hide();
			hideCard(1);
			hideCard(2);

			// increment counters
			practicelearningTrialCount++;
			practicelearningTrialTotalCount++;

			// show for next trial
			setTimeout(function() {
				showCard(1);
				showCard(2);
				
				// check if task is done
				if (practicelearningTrialTotalCount == practicetotalTrials) {
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
	
	var next = function () {
		setTimeout(function() {
			// show correct card
			if (computerPickPractice[practicelearningTrialCount] == 1) {
				$("#reward1").show();
				hideCard(2);
			}
			else {
				$("#reward2").show();
				hideCard(1);
			}

 			if (rewardOrderPractice[practicelearningTrialCount] == 1) {
				reward = rewardPracticeLow[practiceindoorCount];
				practiceindoorCount++;
			}
			else {
				reward = rewardPracticeHigh[practiceoutdoorCount];
				practiceoutdoorCount++;
			}

			$(".reward").text("$" + reward);
		
			// ***insert psiTurk syntax around here***
			
			// new RT
			startTime = new Date().getTime();
			zeroListening = true;
			
			// make sure participant doesn't take too long
			function slowAlert() {
				alert("Please focus on this task!");
			}
			timeoutID = window.setTimeout(slowAlert, timeLimit);
		}, showTime);
		
	}

	// finish phase I
	var finish = function() {
		firstListening = false;
		// hide everything
		hideCard(1);
		hideCard(2);
		$(".reward").hide();
		// set background to white
		$("body").css('background-color', "white");
		$("body").css('background-image', "");
		// stop accepting key presses
		$("body").unbind("keydown", responseHandler);
		// initiate second task
		learningTask();
	}
	
	// separate constant to allow variability (accessible properties for later use)
	var practicetotalTrials = 10 ;
	var hideTime = 10; // (ms)
	var showTime = 10;
	var timeLimit = 3000;

	// initialize counters
	var practicelearningTrialCount = 0;
	var practicelearningTrialTotalCount = 0;
	var practiceindoorCount = 0;
	var practiceoutdoorCount = 0;
	
	// document.body.style.backgroundColor = currentRoom.background; // alternative method
	$("body").css('background-image', 'url(static/images/Gray.jpg)'); // jQuery method

	// non-randomized image placement
	var locationChance;

	var showPage = function() {
		psiTurk.showPage("stage.html");
		locationChance = randomLocation();
		$("body").hide();
	}
	
	showPage();

	
	// hide cards
	$(".reward").hide();
	
	ready(); // start task
	
} // end learning 

// /*******************
//  * Run Task
//  ******************/

$(window).load( function(){
psiTurk.doInstructions(instructions, // a list of pages you want to display in sequence
	function() { currentview = new practiceTask(); } // what you want to do when you are done with instructions
);


});