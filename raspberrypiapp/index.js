var Firebase = require("firebase");
var db = new Firebase("https//myiot-e48e3.firebaseio.com/fermas");
db.on("value", function(shapshot){
	console.log(shapshot.val())
}, function(err){
	console.log('The read faild: ' + err.code);
})