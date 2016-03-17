//Create variable to link to firebase

var trainData = new Firebase ("https://trains.firebaseio.com/");


	var trainName = "";
	var trainDestination = "";
	var trainFirst = 0;
	var trainFrequency = 0;

//add click event on grab info from form

$("#addTrainBtn").on("click", function(){

	 trainName = $("#trainName").val().trim();
	 trainDestination = $("#destination").val().trim();
	 trainFirst = moment($("#firstTrain").val().trim(), "HH:mm").subtract(1,"years").format("X");
	 trainFrequency = $("#frequency").val().trim();


	
	//variables to send data to firebase and then to clear the form

	var createTrain = {
		name: trainName,
		destination: trainDestination,
		trainFirst: firstTrain,
		frequency: trainFrequency
	}

	trainData.push(createTrain);

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");


	//stop page from reload

	return false;
// Create Error Handling

	},function(errorObject){

		console.log("Errors handled: " + errorObject.code)
	})


//Event to change the form when firebase data recieved back from firebase

trainData.on("child_added", function(childSnapshot, prevChildKey){

	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().trainFirst;
	var trainFrequency = childSnapshot.val().frequency;

	//momentJS to find out when the next train arrives

	var timeChange = moment().diff(moment.unix(trainFirst), "minutes");

	var trainArrival = trainFrequency - (timeChange % trainFrequency);

	var nextTrain = moment().add(trainArrival, "minutes").format('HH:mm');

	//change the form to reflect results from moment

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + 
		trainDestination + "</td><td>" + trainFrequency +
		 "</td><td>" + nextTrain + "</td><td>" + 
		 trainArrival + "</td></tr>");

	});