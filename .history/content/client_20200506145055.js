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


function buildRun() {
	$(function () {
		// add input listeners
		google.maps.event.addDomListener(window, 'load', function () {
			var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
			var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

			google.maps.event.addListener(from_places, 'place_changed', function () {
				var from_place = from_places.getPlace();
				var from_address = from_place.formatted_address;
				$('#origin').val(from_address);
			});

			google.maps.event.addListener(to_places, 'place_changed', function () {
				var to_place = to_places.getPlace();
				var to_address = to_place.formatted_address;
				$('#destination').val(to_address);
			});
		});

		// calculate distance
		function calculateDistance() {
			var origin = $('#origin').val();
			var destination = $('#destination').val();
			//Create a New Service Object
			var service = new google.maps.DistanceMatrixService();
			//Get the Data Below
			service.getDistanceMatrix(
				{
					origins: [origin],
					destinations: [destination],
					travelMode: google.maps.TravelMode.WALKING,
					unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
				}, callback);
		}
		// get distance results
		function callback(response, status) {
			if (status != google.maps.DistanceMatrixStatus.OK) {
				$('#result').html(err);
			} else {
				var origin = response.originAddresses[0];
				var destination = response.destinationAddresses[0];
				if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
					$('#result').html("There is no route between " + origin + " and " + destination);
				} else {
					var distance = response.rows[0].elements[0].distance;
					//define own duration and pace here and consolelog
					var duration = response.rows[0].elements[0].duration;
					console.log(response.rows[0].elements[0].distance);
					var distance_in_mile = distance.value / 1609.34; // the mile
					var duration_text = duration.text;
					var duration_value = duration.value;
					$('#in_mile').text(distance_in_mile.toFixed(2));
					$('#duration_text').text(duration_text);
					$('#duration_value').text(duration_value);
					$('#from').text(origin);
					$('#to').text(destination);
				}
			}
		}
		// print results on submit the form
		$('#distance_form').submit(function (e) {
			e.preventDefault();
			calculateDistance();
		});


	});
}

//To Draw Maps that have been planned
// function initMap() {
//         let options = {
//             zoom: 8,
//             center:{lat:42.3601, lng:-71.0589}
//         }
//         let map = new google.maps.Map(document.getElementById('map'), options)

//         //Add Markers based on input locations
//         let marker = new google.maps.Marker({
//             position: {lat: 42.4668, lng:-70.9495},
//             map: map,

//         })
// 	}

// 	initMap();