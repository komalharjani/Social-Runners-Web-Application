
//HIDE DASHBOARD FROM VIEW WHEN NOT LOGGED IN

let clientId;

function newRun() {
	let idRandom = (Math.random() * (10000 - 1) + 1);
	let id = Math.floor(idRandom);
	//let email = clientId;
	let email = "komaalharjani@gmail.com";
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
	runData.userEmail = email;
	runData.type = "run";
	console.log(runData);
	fetch(`/addRun/:${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(runData)
	})
		.then(res => res.text())
		.then(txt => alert(txt))
	//clear all text
	//if response success
	//document.final-form.reset();
	//window.location.replace("./dashboard.html");
	//close modal
}

// //REGISTER - POST
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
					window.location.replace("./dashboard.html");
					clientId = id;
					dashboard(id);
				}
				else {
					alert("Failed to Login.");
				}
			})
	}
}

function logout() {
	loggedIn = false;
	window.location.replace("./index.html");
}

let userObject;

async function dashboard(id) {
	let getResponse = await fetch(`/getUsers/${id}`);
	userObject = await getResponse.json();
	console.log(userObject);
}
console.log(userObject);


// async function getRuns() {
// 	let id = "3049";
// 	let getResponse = await fetch(`/getRuns/${id}`);
// 	let getText = await getResponse.json();
// 	console.log(getText);
// }
// getRuns();

// function updateDashboard() {
// 	if (loggedIn) {
// 		document.getElementById("nameDisplay").innerHTML = userObject.name;
// 	}
// }

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

