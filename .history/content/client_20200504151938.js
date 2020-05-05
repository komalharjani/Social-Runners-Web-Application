		
//REGISTER - POST

const api = {
	endpoints: [
	  "/addUser/",
	  "/getUsers/",
	],

	get: async function (endpoint, params) {
		if (typeof (params) == "object") {
		  params = "?" + params.join("&");
		}
		try {
		  const getResponse = await fetch(this.endpoints[endpoint] + params);
		  const json = await getResponse.json();
		  return json;
		} catch (error) {
		  alert("There was a problem communicating with the API. Error: " + error);
		  console.error("There was a problem communicating with the API. Error: " + error);
		}
	  },
	  post: async function (endpoint, data) {
		try {
		  const postResponse = await fetch(this.endpoints[endpoint] + parameter + endpoint + this.key, {
			body: JSON.stringify(data),
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			method: 'POST'
		  });
		  const json = await postResponse.json();
		  return json;
		} catch (error) {
		  alert("There was a problem communicating with the  API. Error: " + error);
		  console.error("There was a problem communicating with the API. Error: " + error);
		}
	  }
	}
}

		let btn = document.getElementById("addNewUserBtn");
		btn.onclick = function(){ //onclick function
			let id = document.getElementById("email").value;
			let data = new Object();
			data.name = document.getElementById("name").value;
			data.password = document.getElementById("password").value;
			data.email = document.getElementById("email").value;
			data.age = document.getElementById("age").value;
			fetch(`/addUser/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data) 
			})
			.then (res => res.text())
			.then (txt => alert(txt))
			console.log(data);
			
			document.getElementById('loginPage').style.display='block';
		document.getElementById("name").value = "";
		document.getElementById("password").value = "";
		document.getElementById("email").value = "";
		document.getElementById("age").value = "";
		}
	
		let btnLogIn = document.getElementById("loginInBtn");
		// btnLogIn.onclick = function() {
		// 	let login = new Object();
		// 	login.email = document.getElementById("emailLogin");
		// 	login.password = document.getElementById("passwordLogin");
		// 	fetch(`getUsers/${login.email}`, {
		// 		method: 'GET',
		// 		hea
		// 	})
		// }

const getAllUsers = async function () {
	const getResponse = await fetch("/getUsers");
	getUsers = await getResponse.json();
	console.log(getUsers);
	document.getElementById("text").innerHTML = getUsers;

}
getAllUsers();