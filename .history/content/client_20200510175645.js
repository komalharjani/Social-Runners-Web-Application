
//HIDE DASHBOARD FROM VIEW WHEN NOT LOGGED IN

let clientId;
var userEmail;

$('dashboardPage').hide();

let loggedIn = false;

function load() {
	if (loggedIn = false);
	$(document).ready(function () {
		$('#dashboardPage').hide();
	});
}

$('#results_form').submit(function (e) {

	newRun();
});
/**
 *  FUNCTION TO SUBMIT NEW RUN TO DB
 */
function newRun() {
	let idRandom = (Math.random() * (100 - 1) + 1);
	let id = Math.floor(idRandom);
	let runData = new Object();
	runData.title = document.getElementById("titleRun").innerHTML;
	runData.origin = document.getElementById("from").innerHTML;
	runData.destination = document.getElementById("to").innerHTML;
	runData.distance = document.getElementById("in_mile").innerHTML;
	runData.pace = document.getElementById("paceSubmit").innerHTML;
	runData.duration = document.getElementById("duration_text").innerHTML;
	runData.date = document.getElementById("date").value;
	runData.startTime = document.getElementById("time").value;
	runData.description = document.getElementById("description").value;
	runData.meetingPointOne = document.getElementById("meetingPointOne").value;
	runData.meetingPointTwo = document.getElementById("meetingPointTwo").value;
	runData.comments = '';
	runData.userEmail = document.getElementById("emailDisplay").innerHTML;
	runData.type = "run";
	console.log(runData);
	fetch(`/addRun/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(runData)
	}).then(res => res.text())
		.then(txt => {
			if (txt == `Run Uploaded`) {
				alert(txt);
				document.getElementById("closeModal").onclick();
				getRunPosts();
			}
			else {
				alert('Oops! Your details do not match any on record.');
			}
	//Refresh Form SomeHoW
});
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
		let response = fetch(`/addUser/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(res => res.text())
			.then(txt => alert(txt))
	}
	getRunPosts();
}

/**
 * FUNCTION TO LOG IN AND CALL DASHBOARD
 */
let login = function () {//onclick function
	let id = document.getElementById("emailLogin").value;
	let auth = new Object();
	auth.email = document.getElementById("emailLogin").value;
	console.log(auth.email);
	auth.password = document.getElementById("passwordLogin").value;
	fetch(`/userLogin/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(auth)
	}).then(res => res.text())
		.then(txt => {
			if (txt == `User Added`) {
				display(auth.email);
				getRunPosts();
				$('#LoginPage').hide();
				$('#dashboardPage').show();
			}
			else {
				alert('Oops! Your details do not match any on record.');
			}
		})
}


/**
 * FUNCTION TO LOG OUT
 */
function logout() {
	loggedIn = false;
	window.location.replace("./index.html");
}

async function display(id) {
	let response = await fetch(`/getUsers/${id}`);
	let getPost = await response.json();
	console.log(getPost);
	$('#hiName').text(getPost.name);
	$('#ageDisplay').text(getPost.age);
	$('#emailDisplay').text(getPost.email);
	clientId = getPost.name;
}

/**
 * Get Run Posts, Comments and Joins
 */
async function getRunPosts() {
	let response = await fetch(`/getRuns/`);
	let getData = await response.json();
	let getRuns = getData.runs;
	let joiners = getData.joiners;
	let comments = getData.comments;
	console.log(comments)
	console.log(joiners);
	let final = [];
	for (let i = 0; i < getRuns.length; i++) {
		final.push(getRuns[i].value);
	}
	console.log(final);
	generateSquares(final, joiners);
}

function generateSquares(runs, joiners) {
	let arrayLength = runs.length;
	if (arrayLength > 0) {
		for (let i = 0; i < arrayLength; i++) {
			let table = document.createElement("div");
			// let map = document.createElement("div");
			table.className = "runPostsStyle";
			// map.className = "mapStyle";
			//Sort by date run

			let title = document.createElement("h1")
			title.innerHTML = runs[i].title;
			title.className = "postTitle";
			table.append(title);

			let origin = document.createElement("p");
			origin.innerHTML = "Origin: " + runs[i].origin;
			table.append(origin);

			let destination = document.createElement("p");
			destination.innerHTML = "Destination: " + runs[i].destination;
			table.append(destination);

			let distance = document.createElement("p");
			distance.innerHTML = "Distance: " + runs[i].distance + "miles";
			table.append(distance);

			let pace = document.createElement("p");
			pace.innerHTML = "Pace: " + runs[i].pace + " miles/hour";
			table.append(pace);

			let time = document.createElement("p");
			time.innerHTML = "Time: " + runs[i].duration;
			table.append(time);

			let description = document.createElement("p");
			description.innerHTML = "Description: " + runs[i].description;
			table.append(description);

			let count = 0;
			let runJoiners = document.createElement("p");
			table.append(runJoiners);

			//RENDERING USERS WHO HAVE JOINED
			let runID = runs[i]._id;
			if (joiners.length > 0) {
				for (let j = 0; j < joiners.length; j++) {
					if (joiners[j].id == runID) { //if they haven't already joined
						count++;
						runJoiners.innerHTML = "Number of users Joined: " + count;
						}
					}
				}

				

			let joinRun = document.createElement("button");
			joinRun.innerText = "Join Run";
			let runOwnerEmail = runs[i].userEmail;
			joinRun.onclick = function () {
				//request email
				let clientEmail = document.getElementById("emailDisplay").innerText;
				let clientName = document.getElementById("hiName").innerText;
				if (clientEmail == runOwnerEmail) {
					alert("You cannot join your own run");
				}
				else {
					let joinRun = new Object();
					joinRun.email = clientEmail;
					joinRun._id = runs[i]._id;
					joinRun._rev = runs[i]._rev;
					joinRun.name = clientName;
					fetch(`/addParticipant/`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(joinRun)
					})
					.then(res => res.text())
					.then(txt => alert(txt))
					//reload div
				}
			}
			table.append(joinRun);

			let comments = document.createElement("input");
			comments.setAttribute('type', 'text');
			comments.style.backgroundColor = "white";
			comments.style.height = "100px";
			comments.placeholder = "Write a Comment...";
			comments.className = ("infoclass");
			table.append(comments);

			let submit = document.createElement('button');
			submit.className = "readMore";
			submit.innerText = "Submit";
			table.append(submit);
			submit.onclick = async function() {
				let clientEmail = document.getElementById("emailDisplay").innerText;
				let clientName = document.getElementById("hiName").innerText;
				let com = "Comment"; //CHANGE TO PROPER COMMENT
				console.log(com);
				let addComment = new Object();
				addComment.email = clientEmail;
				addComment._id = runs[i]._id;
				addComment._rev = runs[i]._rev;
				addComment.name = clientName;
				addComment.comment = com;
				if(com != "" || com == "undefined") {
				let response = await fetch(`/addComment/`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(addComment)
					})
					let getComments = await response.json();
					console.log(getComments);
				}
				else {
					alert("You cannot post an empty comment.");
				}
					//reload div
			}

			let viewComments = document.createElement('button');
			viewComments.className = "readMore";
			viewComments.innerText = "View Comments";
			table.append(viewComments);
			viewComments.onclick = function () {

			}

			//INSERT MAP OR WEATHER API

			var divContainer = document.getElementById("left");
			divContainer.appendChild(table);
		}
	}
}

async function display(id) {
	let response = await fetch(`/getUsers/${id}`);
	let getPost = await response.json();
	$('#hiName').text(getPost.name);
	$('#ageDisplay').text(getPost.age);
	$('#emailDisplay').text(getPost.email);
	clientId = getPost.name;
}
