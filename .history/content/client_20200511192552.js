
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

//$('#planRun').submit = newRun();
/**
 *  FUNCTION TO SUBMIT NEW RUN TO DB
 */
function newRun() {
	let idRandom = (Math.random() * (100 - 1) + 1); //change to DB ID later
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
	console.log(runData);
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
					$("left").empty();
					getRunPosts();
					document.getElementById("distance_form").reset();
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

function getRunPosts() {
	let poll = setInterval(async function () {
		let response = await fetch(`/getRuns/`);
		if (response.status == 200) {
			let getData = await response.json();
			let getRuns = getData.runs;
			let joiners = getData.joiners;
			let comments = getData.comments;
			console.log(comments)
			for (let i = 0; i < getRuns.length; i++) {
				final.push(getRuns[i].value);
			}
			console.log(final);
			generateSquares(final, joiners, comments);
			let final = [];
		}
	}, 5000)
}

// async function getRunPosts() {
// 	let response = await fetch(`/getRuns/`);
// 	if (response.status == 200) {
// 		let getData = await response.json();
// 		let getRuns = getData.runs;
// 		let joiners = getData.joiners;
// 		let comments = getData.comments;
// 		console.log(comments)
// 		let final = [];
// 		for (let i = 0; i < getRuns.length; i++) {
// 			final.push(getRuns[i].value);
// 		}
// 		console.log(final);
// 		generateSquares(final, joiners, comments);
// 		//await getRunPosts();
// 	}
// 	// else {

// 	// }
// }


//HERE NEW FUNCTION TO FILTER AND 
//CALL GENERATE SQUARES WITH THAT DATA 
//generateSquares(filtered data)

function sortData() {
	let dataForSort = parsedObject.pulledResponse; //reassign server data to another variable
	for (let i = 0; i < dataForSort.length - 1; i++) { //loop through first row 
		for (let j = i + 1; j < dataForSort.length; j++) { //and the next row
			let iVal = source.indexOf("descending") != -1 ? dataForSort[i].votes : dataForSort[i].timestamp; //ternary condition to sort by votes or timestamp depending on event listener
			let jVal = source.indexOf("descending") != -1 ? dataForSort[j].votes : dataForSort[j].timestamp;

			//sort in ascending or descending depending on condition above
			if (
				(text.indexOf("descending") != -1 && iVal < jVal) ||
				(text.indexOf("ascending") != -1 && iVal > jVal)
			) {
				let temp = dataForSort[j];
				dataForSort[j] = dataForSort[i];
				dataForSort[i] = temp;
			}
		}
	}

	createTable(dataForSort); //recreate values in tables from sorted array of data
}


/**
 * DRAWS POSTS, RUNS AND COMMENTS FROM DATA
 * @param {*} runs 
 * @param {*} joiners 
 * @param {*} comments 
 */
function generateSquares(runs, joiners, commentsData) {
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

			let date = document.createElement("p")
			date.innerHTML = runs[i].date;
			date.className = "dateDisplay";
			table.append(date);

			let origin = document.createElement("p");
			origin.innerHTML = "From: " + runs[i].origin;
			table.append(origin);

			let destination = document.createElement("p");
			destination.innerHTML = "To: " + runs[i].destination;
			table.append(destination);

			let distance = document.createElement("p");
			distance.innerHTML = "Distance: " + runs[i].distance + " miles";
			table.append(distance);

			// let pace = document.createElement("p");
			// pace.innerHTML = "Pace: " + runs[i].pace + " miles/hour";
			// table.append(pace);

			let time = document.createElement("p");
			time.innerHTML = "Duration and Pace: " + runs[i].duration + "at " + runs[i].pace + " miles/hour";
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
					console.log(commentsData[k].id);
					console.log(runID);
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
				addComment._id = runs[i]._id;
				addComment._rev = runs[i]._rev;
				addComment.name = clientName;
				addComment.comment = com;
				if (com != "" || com == "undefined") {
					let response = await fetch(`/addComment/`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(addComment)
					})
					let getComments = await response.json();
					console.log(getComments);
					display(clientEmail);
					//getRunPosts();
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
