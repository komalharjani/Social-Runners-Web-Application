
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

let runs = [{
	"id": '9',
	"origin": 'Covent Garden, London, UK',
	"destination": 'Royal Leamington Spa, UK',
	"distance": '88.34',
	"pace": '4',
	"time": '22 hour(s) and 5 minute(s).',
	"date": '',
	"startTime": '',
	"description": '',
	"meetingPointOne": '',
	"meetingPointTwo": '',
	"maxPeople": '',
	"type": 'run'
}, {
	"id": '9',
	"origin": 'Covent Garden, London, UK',
	"destination": 'Royal Leamington Spa, UK',
	"distance": '88.34',
	"pace": '4',
	"time": '22 hour(s) and 5 minute(s).',
	"date": '',
	"startTime": '',
	"description": '',
	"meetingPointOne": '',
	"meetingPointTwo": '',
	"maxPeople": '',
	"type": 'run'
}, {
	"id": '9',
	"origin": 'Covent Garden, London, UK',
	"destination": 'Royal Leamington Spa, UK',
	"distance": '88.34',
	"pace": '4',
	"time": '22 hour(s) and 5 minute(s).',
	"date": '',
	"startTime": '',
	"description": '',
	"meetingPointOne": '',
	"meetingPointTwo": '',
	"maxPeople": '',
	"type": 'run'
}];

function generateSquares() {
	let arrayLength = runs.length;
	if (arrayLength > 0) {
		for (let i = 0; i < arrayLength; i++) {
			let table = document.createElement("div");
			table.className = "runPostsStyle";

			let origin = document.createElement("p");
			origin.innerHTML = "Origin: " + runs[i].origin;
			table.append(origin);

			let destination = document.createElement("p");
			destination.innerHTML = "Destination: " + runs[i].destination;
			table.append(destination);

			let distance = document.createElement("p");
			distance.innerHTML = "Distance: " + runs[i].distance;
			table.append(distance);

			//append map

			// table.style.width = '50%'
			// let br = document.createElement("br");
			// table.innerHTML = "Origin: " + runs[i].origin + br + "Destination" + runs[i].destination;
			// table.setAttribute('background-color', 'red');

			<button onclick="readMore()" id="myBtn">Read more</button>
			let readMore = document.createElement("button");
			readMore.innerText = "Read More";
			readMore.className = "readMore";
			readMore.onclick
			var divContainer = document.getElementById("runPosts");
			divContainer.appendChild(table);
		}
	}
}
generateSquares();

function readMore() {
	var dots = document.getElementById("dots");
	var moreText = document.getElementById("more");
	var btnText = document.getElementById("myBtn");
  
	if (dots.style.display === "none") {
	  dots.style.display = "inline";
	  btnText.innerHTML = "Read more";
	  moreText.style.display = "none";
	} else {
	  dots.style.display = "none";
	  btnText.innerHTML = "Read less";
	  moreText.style.display = "inline";
	}
  }

// function generateDynamicTable(){
// 	  var noOfContacts = runs.length;
// 	  if(noOfContacts>0){
// 		  // CREATE DYNAMIC TABLE.
// 		  var table = document.createElement("table");
// 		  table.style.width = '10px';
// 		  table.style.height = '10px';
// 		  table.style.backgroundColor = 'red';
// 		  table.setAttribute('border', '1');
// 		  table.setAttribute('cellspacing', '0');
// 		  table.setAttribute('cellpadding', '5');

// 		  // retrieve column header ('Name', 'Email', and 'Mobile')

// 		  var col = []; // define an empty array
// 		  for (var i = 0; i < noOfContacts; i++) {
// 			  for (var key in runs[i]) {
// 				  if (col.indexOf(key) === -1) {
// 					  col.push(key);
// 				  }
// 			  }
// 		  }

// 		  // CREATE TABLE HEAD .
// 		  var tHead = document.createElement("thead");	

// 		  // CREATE ROW FOR TABLE HEAD .
// 		  var hRow = document.createElement("tr");

// 		  // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
// 		  for (var i = 0; i < col.length; i++) {
// 				  var th = document.createElement("th");
// 				  th.innerHTML = col[i];
// 				  hRow.appendChild(th);
// 		  }
// 		  tHead.appendChild(hRow);
// 		  table.appendChild(tHead);

// 		  // CREATE TABLE BODY .
// 		  var tBody = document.createElement("tbody");	

// 		  // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
// 		  for (var i = 0; i < noOfContacts; i++) {

// 				  var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .

// 				  for (var j = 0; j < col.length; j++) {
// 					  var td = document.createElement("td");
// 					  td.innerHTML = runs[i][col[j]];
// 					  bRow.appendChild(td);
// 				  }
// 				  tBody.appendChild(bRow)

// 		  }
// 		  table.appendChild(tBody);	


// 		  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
// 		  var divContainer = document.getElementById("myContacts");
// 		  divContainer.innerHTML = "";
// 		  divContainer.appendChild(table);

// 	  }	
//   }
  //generateDynamicTable();