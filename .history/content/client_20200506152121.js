
function newRun() {
	let runBtn = document.getElementById("planRun");
	runBtn.onclick = function() {
		let id = "komaalharjani@gmail.com";
		let runData = new Object();
		runData.origin = document.getElementById("from");
		runData.destination = document.getElementById("to");
		runData.distance = document.getElementById("in_mile");
		runData.pace = document.getElementById("paceSubmit");
		runData.time = document.getElementById("duration_text");
		runData.date = document.getElementById("date");
		runData.startTime = document.getElementById("time");
		runData.description = document.getElementById("description");
		runData.meetingPointOne = document.getElementById("meetingPointOne");
		runData.meetingPointTwo = document.getElementById("meetingPointTwo");
		runData.maxPeople = document.getElementById("maxPeople");
		//fetch add new Run:id
		// fetch (`/addRun/${id}`,{
		// 	method: 'POST',
		// 	headers: {'Content-Type': 'application/json'},
		// 	body: JSON.stringify(runData)
		// })
		// .then(res => res.text())
		// .then(txt => alert(txt))
}
}


//REGISTER - POST
function signUp() {
	let btn = document.getElementById("addNewUserBtn");
	btn.onclick = function () { //onclick function
		let id = document.getElementById("email").value;
		let data = new Object();
		data.name = document.getElementById("name").value;
		data.password = document.getElementById("password").value;
		data.email = document.getElementById("email").value;
		data.age = document.getElementById("age").value;
		fetch(`/addUser/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(res => res.text())
			.then(txt => alert(txt))
		// document.getElementById("name").value = "";
	}
}

let text;

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
			.then(res => res.json(text))
			.then(txt => alert(txt))
			//store as variable
			//need to pass through here
			//console.log(text);
	}
}


function dashboard(){
    const getAllUsers = async function () {
		let id = 'komaalharjani@gmail.com';
		//this id needs to be defined before fetch - because you want to fetch BASED on the ID - so it must happen in login...
		console.log(id);
        const getResponse = await fetch(`/getUsers/${id}`);
        getUsers = await getResponse.json();
        let name = getUsers.name;
        let age = getUsers.age;
        document.getElementById("nameDisplay").innerHTML = name;
        document.getElementById("ageDisplay").append(age);
    }
    getAllUsers();
    
	}

//To Draw Maps that have been planned
function initMap() {
        let options = {
            zoom: 8,
            center:{lat:42.3601, lng:-71.0589}
        }
        let map = new google.maps.Map(document.getElementById('map'), options)

        //Add Markers based on input locations
        let marker = new google.maps.Marker({
            position: {lat: 42.4668, lng:-70.9495},
            map: map,

        })
	}
initMap();