
//   1. database connector
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCSRibVfafOhcOFd360zP9wWRgfe6tvjf0",
    authDomain: "train-scheduler-45798.firebaseapp.com",
    databaseURL: "https://train-scheduler-45798.firebaseio.com",
    projectId: "train-scheduler-45798",
    storageBucket: "train-scheduler-45798.appspot.com",
    messagingSenderId: "617529535613"
  };
  firebase.initializeApp(config);// Assume the following situations.


  var database = firebase.database();

//set up variables

var name="";
var destination="";
var firstTime=""
var frequency="";



setInterval({


database.ref().on("child_added", function(childSnapshot){


    var tFrequency = childSnapshot.val().frequency;
    
    var firstTime = childSnapshot.val().firstTime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain,"m");
    nextTrain = nextTrain.format("HH:mm A");
    
  
    $("#rows-here").append("<tr> "  
    + "<td>" + childSnapshot.val().name + "</td>" 
    + "<td>" + childSnapshot.val().destination + "</td>" 
    + "<td>" + childSnapshot.val().frequency + "</td>" 
    + "<td>" + nextTrain + "</td>" 
    + "<td>" + tMinutesTillTrain + "</td>" 
    +
  
  "</tr>");
  
  
  });


//   ===================================
  

$("#add-train").on("click", function(event){
    event.preventDefault();

    name = $("#name-in").val().trim();
    destination = $("#destination-in").val().trim();
    firstTime = $("#firsTime-in").val().trim();
    frequency = $("#frequency-in").val().trim();

    database.ref().push({

      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency

  });

  $("#name-in").val("");
  $("#destination-in").val("");
  $("#firsTime-in").val("");
  $("#frequency-in").val("");

});



} ,1000);













//   When adding trains, administrators should be able to submit the following:
//   Train Name
//   Destination 
//   First Train Time -- in military time
//   Frequency -- in minutes
//   Code this app to calculate when the next train will arrive; this should be relative to the current time.
//   Users from many different machines must be able to view same train times.
//   Styling and theme are completely up to you. Get Creative!




    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));