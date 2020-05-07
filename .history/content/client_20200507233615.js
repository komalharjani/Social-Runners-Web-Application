
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
let userEmail;

/**
 *  FUNCTION TO SUBMIT NEW RUN TO DB
 */
function newRun() {
	let idRandom = (Math.random() * (10000 - 1) + 1);
	let id = Math.floor(idRandom);
	//let email = clientId;
	//CHANGE TO DYNAMIC LOGGED IN USER 
	let email = userEmail;
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
 * FUNCTION TO GET USER DATA FROM DB BASED ON LOGGED IN CLIENT
 */
// let userObject;
// async function dashboard(id) {
// 	let getResponse = await fetch(`/getUsers/${id}`)
// 	userObject = await getResponse.json();
// }
// console.log(userObject);


async function dashboard(id) {
	const response = await fetch(`/getUsers/${id}`);
	const getUser = await response.json();
	console.log(getUser);
	userEmail = getUser.email;
	console.log(getUser.name);
	//document.getElementById("hi").append(getUser.name);
	call();
}

function call() {
	console.log(userEmail);
	document.getElementById("hi").innerHTML = userEmail;
}