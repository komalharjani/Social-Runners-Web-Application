
//HIDE DASHBOARD FROM VIEW WHEN NOT LOGGED IN

let clientId;
var userEmail;

$('dashboardPage').hide();

let loggedIn = false;
function load() {
	//get LoggedIn array from server
	if (loggedIn.state = false);
	$(document).ready(function () {
		$('#dashboardPage').hide();
	});
}

/**
 *  FUNCTION TO SUBMIT NEW RUN TO DB
 */
//fix count
function newRun() {
	let idRandom = (Math.random() * (10000 - 1) + 1);
	let id = Math.floor(idRandom);
	let runData = new Object();
	runData.title = document.getElementById("titleRun").value;
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
	runData.name = document.getElementById("hiName").innerHTML;
	if (runData.title != "" || runData.date != "" || runData.startTime != "") {
		fetch(`/addRun/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(runData)
		})
			.then(res => res.text())
			.then(txt => {
				if (txt == `Run Uploaded`) {
					alert(txt);
					document.getElementById("closeModal").onclick();
					//Clear or Refresh DIV HERE or clear and then call getRUn 
					getRunPosts();
					document.getElementById("distance_form").reset();
					showSecond();
					//reset form here -- prevent submission twice
				}
				else {
					alert(`Not Uploaded. Please try again`);
				}
			});
	}
	else (alert("Fill out required fields: Title, Date, Time"))
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

	const response = await fetch(`/getUsers/${id}`);
	const getPost = await response.json();
	$('#hiName').text(getPost.name);
	$('#ageDisplay').text(getPost.age);
	$('#emailDisplay').text(getPost.email);
	clientId = getPost.name;
}

/**
 * Get Run Posts, Comments and Joins
 */

//Error Handling
async function getRunPosts() {
	let response = await fetch(`/getRuns/`);
	if (response.status == 200) {
		let getData = await response.json();
		console.log(getData);
		let getRuns = getData.runs;
		let joiners = getData.joiners;
		let comments = getData.comments;
		let runs = [];
		//push in order of 
		for (let i = 0; i < getRuns.length; i++) {
			runs.push(getRuns[i].value);
		}
		//generateSquares(runs, joiners, comments);

	}
	//swtich cases to manipulate data
}

setInterval(getRunPosts, 3000);


/**
 * DRAWS POSTS, RUNS AND COMMENTS FROM DATA
 * @param {*} runs 
 * @param {*} joiners 
 * @param {*} comments 
 */

let table;

function generateSquares(runs, joiners, commentsData) {
	$('#left').empty();
	let arrayLength = runs.length;
	if (arrayLength > 0) {
		//show filter
		for (let i = 0; i < arrayLength; i++) {
			table = document.createElement("div");
			// let map = document.createElement("div");
			table.className = "runPostsStyle";
			// map.className = "mapStyle";
			//Sort by date run

			let title = document.createElement("h1")
			title.innerHTML = runs[i].title + " (" + runs[i].distance + " miles)";
			title.className = "postTitle";
			table.append(title);

			let user = document.createElement("p");
			user.innerHTML = "Uploaded by : " + runs[i].name;
			table.append(user);

			let date = document.createElement("p")
			date.innerHTML = runs[i].date;
			date.className = "dateDisplay";
			table.append(date);

			let origin = document.createElement("p");
			origin.innerHTML = "From: " + runs[i].origin;
			origin.className = "toFrom";
			table.append(origin);

			let destination = document.createElement("p");
			destination.innerHTML = "To: " + runs[i].destination;
			destination.className = "toFrom";
			table.append(destination);

			// let pace = document.createElement("p");
			// pace.innerHTML = "Pace: " + runs[i].pace + " miles/hour";
			// table.append(pace);

			let time = document.createElement("p");
			time.innerHTML = "Duration: At pace " + runs[i].pace + " it would take approximately " + runs[i].duration;
			table.append(time);

			let description = document.createElement("p");
			description.innerHTML = "Description: " + runs[i].description;
			if (runs[i].description != "") {
				table.append(description);
			}

			let runJoiners = document.createElement("p");
			let label = document.createElement("p");
			label.innerHTML = "Users joined: "
			label.style.fontWeight = "bold";
			table.append(label);

			let usersJoined = document.createElement("p");
			table.append(usersJoined);

			let joinsPerRunCount = 0;
			let runsPerUserCount = 0;
			let names = [];
			let clientEmail = document.getElementById("emailDisplay").innerText;

			let usersRuns = document.createElement("p");

			//RENDERING NUMBER USERS WHO HAVE JOINED AND THEIR NAMES
			let runID = runs[i]._id;
			if (joiners.length > 0) {
				for (let j = 0; j < joiners.length; j++) {
					if (joiners[j].id == runID) { //if they haven't already joined
						joinsPerRunCount++;
						runJoiners.innerHTML = "Number of users Joined: " + joinsPerRunCount;
						names.push(joiners[j].name);
					}
					else if (joiners[j].email == clientEmail) {
						runsPerUserCount++;
						document.getElementById("noRunsJoin").innerHTML = "Number of runs joined: " + runsPerUserCount;
						usersRuns.innerHTML = joiners[j].title;
						//number of total miles run - based on previous runs 
						//link to their runs here?
					}
				}
			}

			table.append(usersRuns);
			names.sort();
			usersJoined.innerHTML = names.join(", ");
			table.append(runJoiners);

			//CLICK JOIN FUNCTION
			let joinRun = document.createElement("button");
			joinRun.innerText = "Join Run";
			let runOwnerEmail = runs[i].userEmail;
			joinRun.onclick = function () {
				let clientName = document.getElementById("hiName").innerText;
				if (clientEmail == runOwnerEmail) {
					alert("You cannot join your own run");
				}
				else {
					let joinRun = new Object();
					joinRun.email = clientEmail;
					joinRun.name = clientName;
					joinRun.runID = runs[i]._id;
					joinRun.type = "joins";
					fetch(`/addParticipant/`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(joinRun)
					})
						.then(res => res.text())
						.then(txt => alert(txt))
				}
			}
			table.append(joinRun);

			//DISPLAY COMMENTS
			//MODAL BELOW
			let modal = document.createElement("div");
			modal.className = "modal";
			table.append(modal);

			let close = document.createElement("button");
			close.innerText = "Close"
			close.onclick = function () {
				modal.style.display = "none";
			}
			modal.append(close);

			let viewComments = document.createElement('button');
			viewComments.className = "readMore";
			viewComments.innerText = "View Comments";
			table.append(viewComments);
			viewComments.onclick = function () {
				modal.style.display = "block";
				modal.style.width = "width: auto";
				modal.style.opacity = "0.98"
				modal.style.height = "500px";

			}

			let commentPost = document.createElement("div");
			let titleDisplay = document.createElement("p");
			titleDisplay.innerText = runs[i].title;
			titleDisplay.className = "title";
			commentPost.className = "commentPost";
			modal.append(commentPost);
			commentPost.append(titleDisplay);

			if (commentsData.length > 0) {
				for (let k = 0; k < commentsData.length; k++) {
					if (commentsData[k].id == runID) {
						let commentSingle = document.createElement("div");
						commentSingle.style.backgroundColor = "black";
						commentSingle.style.padding = "5px";
						let commentDisplay = document.createElement("p");
						commentDisplay.innerHTML = "Comment: " + commentsData[k].comment + " - Posted by User: " + commentsData[k].name;
						commentPost.appendChild(commentSingle);
						commentSingle.append(commentDisplay);

					}
				}
			}

			//WRITE COMMENTS
			let comments = document.createElement('input')
			comments.setAttribute('type', 'text');
			comments.style.backgroundColor = "whitesmoke";
			comments.style.borderRadius = "5px";
			comments.style.height = "80px";
			comments.placeholder = "Write a Comment...";
			comments.className = ("infoclass");
			let com = comments.value = $('#comments'.toString()).text();
			table.append(comments);

			let submit = document.createElement('button');
			submit.className = "submitComment";
			submit.innerText = "Submit";
			submit.onclick = async function () {
				let clientEmail = document.getElementById("emailDisplay").innerText;
				let clientName = document.getElementById("hiName").innerText;
				let com = comments.value; //CHANGE TO PROPER COMMENT
				let addComment = new Object();
				addComment.email = clientEmail;
				addComment.runId = runs[i]._id;
				addComment.name = clientName;
				addComment.comment = com;
				addComment.type = "comments"
				if (com != "" || com == "undefined") {
					let response = await fetch(`/addComment/`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(addComment)
					})
					let getComments = await response.json();
					display(clientEmail);
					$('#dashboardPage').show();
				}
				else {
					alert("You cannot post an empty comment.");
				}
			}
			table.append(comments);
			table.append(submit);

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