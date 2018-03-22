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
var messageId = null;
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
		$("body").html("Enter your message here: <input id = \"userMessage\" onkeydown = \"sendMessage()\"></input></br>");
		
		// for (var i = 0; i < messageId; i++) {
		// 	database.ref("messages/" + messageId).once("value").then(function(snapshot) {
		// 		$("body").append("</br>" + snapshot.val());
		// 		console.log(snapshot.val());
		// 	});
		// }

		for (var i = 0; i < messages.length; i++) {
			$("body").append("</br>" + messages[i]);
			console.log("debug - " + messages[i]);
		}

		console.log(messages);

		

		$("#userMessage").focus();
	}
}

function sendMessage() {
	if (event.keyCode == 13) {
		var userMessage = $("#userMessage").val();
		console.log(userMessage);
		$("#userMessage").val("");
		database.ref("messages/" + messageId).set(username + ": " + userMessage);
		database.ref("messages/" + messageId).on("value", function(snapshot) {
			messages.push(snapshot.val());
		});
		messageId++;
		database.ref("messageId").set(messageId);
		$("body").append("</br>" + messages[messageId - 1])
	}
	
}