
function newRun() {
	let runBtn = document.getElementById("planRun");
	runBtn.onclick = function() {
		let idRandom = (Math.random() * (10000 - 1) + 1);
		let id = Math.floor(idRandom);
		let email = "komaalharjani@gmail.com";
		let runData = new Object();
		runData.origin = document.getElementById("from").value;
		runData.destination = document.getElementById("to").value;
		// runData.distance = document.getElementById("in_mile").value;
		// runData.pace = document.getElementById("paceSubmit").value;
		// runData.time = document.getElementById("duration_text").value;
		// runData.date = document.getElementById("date").value;
		// runData.startTime = document.getElementById("time").value;
		// runData.description = document.getElementById("description").value;
		// runData.meetingPointOne = document.getElementById("meetingPointOne").value;
		// runData.meetingPointTwo = document.getElementById("meetingPointTwo").value;
		// runData.maxPeople = document.getElementById("maxPeople").value;
		runData.userEmail = email;
		console.log(runData);
		fetch (`/addRun/${id}`,{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(runData)
		})
		.then(res => res.text())
		.then(txt => alert(txt))
}
}

//Sign Up - but data is lost
// function signUp() {
// 	let btn = document.getElementById("addNewUserBtn");
// 	btn.onclick = function () { //onclick function
// 		//let id = document.getElementById("email").value;
// 		let data = new Object();
// 		data.name = document.getElementById("name").value;
// 		data.password = document.getElementById("password").value;
// 		data.email = document.getElementById("email").value;
// 		data.age = document.getElementById("age").value;
// 		fetch(`/usersPost`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(data)
// 		})
// 			.then(res => res.text())
// 			.then(txt => alert(txt))
// 		// document.getElementById("name").value = "";
// 	}
// }


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
		let response = fetch(`/addUser/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let res = response.json()
		console.log(res);
			// .then(res => res.json())
			// .then(data => console.log(JSON.stringify(data, null, "\t")))
			// .then(txt => alert(txt))
			// console.log(res);
		// document.getElementById("name").value = "";
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
		.then(function(response) {
			if(response.status == 200) {
				alert("Login Success.");
				dashboard(id);
				window.location.replace("./dashboard.html");
			}
			else {
				alert("Failed to Login.");
			}
		})
		// .then(res => res.text())
		// .then(txt => alert(txt))
		//if res == 200 == 
			//store as variable
			//need to pass through here
			//console.log(text);
	}
}

let userObject;
function dashboard(id){
    async function getUsers() {
		console.log(id);
        const getResponse = await fetch(`/getUsers/${id}`);
		getUsers = await getResponse.json();
		console.log(getUsers);
		userObject = getUsers;
	}
	getUsers();
	// updateDashboard();
}
//Update name and Age


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


// function hello() {
// 	let id = "komaalharjani@gmail.com";
// 	fetch(`/hello/${id}`, {
// 	});
// }