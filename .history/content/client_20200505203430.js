		
//REGISTER - POST
function signUp() {

		let btn = document.getElementById("addNewUserBtn");
		btn.onclick = function(){ //onclick function
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
			.then (res => res.text())
			.then (txt => alert(txt))
		// document.getElementById("name").value = "";
		}
	}

		function login() {
		let btnLogIn = document.getElementById("loginInBtn");
		btnLogIn.onclick = function(){ //onclick function
			let id = document.getElementById("emailLogin").value;
			let auth = new Object();
			auth.email = document.getElementById("emailLogin").value;
			auth.password = document.getElementById("passwordLogin").value;
			fetch(`/userLogin/${id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(auth) 
			})
			.then (res => res.text())
			.then (txt => alert(txt))
		}
	}