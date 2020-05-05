		
//REGISTER - POST
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
		// document.getElementById('loginPage').style.display='block';
		// document.getElementById("name").value = "";
		// document.getElementById("password").value = "";
		// document.getElementById("email").value = "";
		// document.getElementById("age").value = "";
		}

		let btnLogIn = document.getElementById("loginInBtn");
		btnLogIn.onclick = function(){ //onclick function
			let id = document.getElementById("emailLogin").value;
			let data = new Object();
			data.email = document.getElementById("emailLogin").value;
			data.password = document.getElementById("passwordLogin").value;
			fetch(`/checkUser/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data) 
			})
			.then (res => res.text())
			.then (txt => alert(txt))
			console.log(data);