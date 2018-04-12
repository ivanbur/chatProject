// Initialize Firebase
var config = {
	apiKey: "AIzaSyAfNcOHMO2-6wJXv--oTL3LY8sBaMtN8FM",
	authDomain: "test-366e4.firebaseapp.com",
	databaseURL: "https://test-366e4.firebaseio.com",
	projectId: "test-366e4",
	storageBucket: "test-366e4.appspot.com",
	messagingSenderId: "312399873888"
};

firebase.initializeApp(config);

var username = "";
var database = firebase.database();
var messages = [];
var messageId = 0;
database.ref("messageId").once("value").then(function(snapshot) {
	messageId = snapshot.val();
});

database.ref("messages/").once("value").then(function(snapshot) {
	messages = snapshot.val();
});


function usernameEntered() {
	if (event.keyCode == 13) {
		username = $("#username").val();

		$("#usernameEnter").remove();
		$("button").remove();
		$("br").remove();
		$("body").html("Enter your message here: <input id = \"userMessage\" onkeydown = \"sendMessage()\"></input></br><textarea id = \"theTextArea\" style = \"width: 600px;height: 700px\"></textarea></br><input id=\"sliderFontSize\" onchange=\"changingSlider()\" type=\"range\" min=\"8\" max = \"20\" value = \"12\"/>");
		
		// for (var i = 0; i < messageId; i++) {
		// 	database.ref("messages/" + messageId).once("value").then(function(snapshot) {
		// 		$("body").append("</br>" + snapshot.val());
		// 		console.log(snapshot.val());
		// 	});
		// }

		if (messageId == null) {
			messageId = 0;
		}

		if (messages == null) {
			messages = ["ADMIN: Welcome to the start of a new chat!"];
			database.ref("messages/" + messageId).set("ADMIN: Welcome to the start of a new chat!");
			database.ref("messageId").set(messageId + 1);
		}


		for (var i = 0; i < messages.length; i++) {
			$("#theTextArea").append("\n" + messages[i]);
			console.log("debug - " + messages[i]);
		}

		$("#theTextArea").animate({
    		scrollTop: $("#theTextArea").get(0).scrollHeight
		}, 0.0000001);

		$("#userMessage").focus();
	}
}

function sendMessage() {
	if (event.keyCode == 13 && $("#userMessage").val() != "" && $("#userMessage").val() != " ") {
		var userMessage = $("#userMessage").val();

		database.ref("messageId").once("value").then(function(snapshot) {
			messageId = snapshot.val();
			console.log("#1 The messageId is: " + snapshot.val());
		});

		$("#userMessage").val("");

		database.ref("messageId").set(messageId + 1);

		database.ref("messages/" + messageId).set(username + ": " + userMessage);
		
		
		// $("#theTextArea").html("");

		// //$("#theTextArea").append("\n" + messages[messageId - 1])
		// for (var i = 0; i < messages.length; i++) {
		// 	$("#theTextArea").append("\n" + messages[i]);
		// 	console.log("debug - " + messages[i]);
		// }

		// //$("#theTextArea").scrollTop($("#theTextArea").scrollHeight - $("#theTextArea").clientHeight);
		// $("#theTextArea").animate({
  //   		scrollTop: $("#theTextArea").get(0).scrollHeight
		// }, 0.0000001);
	}
}

// $(function() {
// 	$("#sliderFontSize").slider( {
// 		change: function() {
// 				console.log("testing");
// 			}
// 	});
// })

function changingSlider() {
	$("#theTextArea").css("font-size", $("#sliderFontSize").val() + "px");
}




database.ref("messages/").on("value", function(snapshot) {

	messages.push(snapshot.val()[snapshot.val().length - 1]);
	console.log("#2 The messageId is: " + messageId);
	console.log(messages);
	console.log(snapshot.val());

	$("#theTextArea").html(" ");
	for (var i = 0; i < messages.length; i++) {
		$("#theTextArea").append("\n" + messages[i]);
		console.log("debug - " + i + " - " + messages[i]);
	}
	$("#theTextArea").animate({
    	scrollTop: $("#theTextArea").get(0).scrollHeight
	}, 0.0000001);
	console.log("#3 The messageId is: " + messageId);
})

database.ref("messageId").on("value", function(snapshot) {
	messageId = snapshot.val();
})