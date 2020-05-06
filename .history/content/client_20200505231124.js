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
		.then(alert(body));

			// .then(res => res.text())
			// .then(txt => alert(txt))
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
        console.log(getUsers);
        document.getElementById("nameDisplay").innerHTML = name;
        document.getElementById("ageDisplay").append(age);
        console.log(getUsers.name, getUsers.age);
    }
    getAllUsers();
    
    }