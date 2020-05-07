
//HIDE DASHBOARD FROM VIEW WHEN NOT LOGGED IN

//To Draw Maps that have been planned
// function initMap() {
//         let options = {
//             zoom: 8,
//             center:{lat:42.3601, lng:-71.0589}
//         }
//         let map = new google.maps.Map(document.getElementById('map'), options)

//         //Add Markers based on input locations Origin and Destination -- later
//         let marker = new  google.maps.Marker({
//             position: {lat: 42.4668, lng:-70.9495},
//             map: map,
//         })
// 	}
// initMap();

let clientId;
var userEmail;

/**
 *  FUNCTION TO SUBMIT NEW RUN TO DB
 */
function newRun() {
	let idRandom = (Math.random() * (10 - 1) + 1);
	let id = Math.floor(idRandom);
	//let email = clientId;
	//CHANGE TO DYNAMIC LOGGED IN USER 
	//let id = "komaalharjani@gmail.com";
	let runData = new Object();
	runData.origin = document.getElementById("from").innerHTML;
	runData.destination = document.getElementById("to").innerHTML;
	runData.distance = document.getElementById("in_mile").innerHTML;
	runData.pace = document.getElementById("paceSubmit").innerHTML;
	runData.time = document.getElementById("duration_text").innerHTML;
	runData.date = document.getElementById("date").value;
	runData.startTime = document.getElementById("time").value;
	runData.description = document.getElementById("description").value;
	runData.meetingPointOne = document.getElementById("meetingPointOne").value;
	runData.meetingPointTwo = document.getElementById("meetingPointTwo").value;
	runData.maxPeople = document.getElementById("maxPeople").value;
	//runData.userEmail = email;
	runData.type = "run";
	console.log(runData);
	fetch(`/addRun/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(runData)
	})
		.then(res => res.text())
		.then(txt => alert(txt))
	//Refresh Form SomeHoW
}

/**
 * FUNCTION TO SIGN UP
 */
function signUp() {
	let btn = document.getElementById("addNewUserBtn");
	btn.onclick = async function () { //onclick function
		let id = document.getElementById("email").value;
		let data = new Object();
		data.name = document.getElementById("name").value;
		data.password = document.getElementById("password").value;
		data.email = document.getElementById("email").value;
		data.age = document.getElementById("age").value;
		let response = fetch(`/addUser/:${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(res => res.text())
			.then(txt => alert(txt))
	}
}

/**
 * FUNCTION TO LOG IN AND CALL DASHBOARD
 */
function login() {
	let btnLogIn = document.getElementById("loginInBtn");
	btnLogIn.onclick = function () { //onclick function
		let id = document.getElementById("emailLogin").value;
		let auth = new Object();
		auth.email = document.getElementById("emailLogin").value;
		auth.password = document.getElementById("passwordLogin").value;
		fetch(`/userLogin/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(auth)
		})
			.then(function (response) {
				if (response.status == 200) {
					//window.location.replace("./dashboard.html");
					clientId = id;
					dashboard(id);
				}
				else {
					alert("Failed to Login.");
				}
			})
	}
}

/**
 * FUNCTION TO LOG OUT
 */
function logout() {
	loggedIn = false;
	window.location.replace("./index.html");
}

/**
 * FUNCTION TO CONSOLE USER WITH ASSOCIATED ID
 * @param {*} id 
 */
let data = async function (id) {
	const response = await fetch(`/getUsers/${id}`);
	return await response.json();
	// console.log(getUser);
	// userEmail = getUser.email;
	//document.getElementById("hi").append(getUser.name);
	call();
}

// /**
//  * FUNCTION TO CONSOLE RUNS BASED ON EMAIL
//  * @param {} id 
//  */
async function displayRuns() {
	let id = "7838";
	const response = await fetch(`/getRuns/${id}`);
	const getResp = await response.json();
	console.log(getResp.status);
	// const response = await fetch(`/getUsers/${id}`);
	// const getUser = await response.json();
	// console.log(getUser);
	// userEmail = getUser.email;
	// //document.getElementById("hi").append(getUser.name);
	// call();
}

async function runsDis() {
	id = 9;
	const response = await fetch(`/getRuns/${id}`);
	console.log(response);
	return await response.json();
}
//runsDis();

let obj = {
	id: '9',
	origin: 'Covent Garden, London, UK',
	destination: 'Royal Leamington Spa, UK',
	distance: '88.34',
	pace: '4',
	time: '22 hour(s) and 5 minute(s).',
	date: '',
	startTime: '',
	description: '',
	meetingPointOne: '',
	meetingPointTwo: '',
	maxPeople: '',
	type: 'run'
};

// //var obj = JSON.parse(JsonData);
// var tmp = '';
// $.each(obj, function (key, value) {
// 	tmp += '<div class="col-md-4 col-sm-4">';
// 	tmp += '    <div class="well">';
// 	tmp += '      <h5>' + value.title + '</h5>';
// 	tmp += '      <a href="' + value.filePath + '" target="_blank"><img data-toggle="tooltip" data-placement="left" title="Click to open data" src="' + value.imagePath + '" height="100%" width="100%"/></a>    ';
// 	tmp += '    </div>';
// 	tmp += '  </div>';
// });

// $('#main').prepend(tmp);

var JsonData = '[{"title":"3G","filePath":"https://example.com","imagePath":"images/3GQoS.jpg"}, {"title":"4G", "filePath":"https://example.com", "imagePath":"images/4GQoS.jpg"} ]';

var obj = JSON.parse( JsonData );

var tmp = '';
$.each( obj, function( key, value ) {
  tmp += '<div class="col-md-4 col-sm-4">';
  tmp += '    <div class="well">';
  tmp += '      <h5>' + value.title + '</h5>';
  tmp += '      <a href="' + value.filePath + '" target="_blank"><img data-toggle="tooltip" data-placement="left" title="Click to open data" src="' + value.imagePath + '" height="100%" width="100%"/></a>    ';        
  tmp += '    </div>';
  tmp += '  </div>';
});

$('#main').prepend(tmp);