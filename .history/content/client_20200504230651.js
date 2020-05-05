		
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
		// document.getElementById("name").value = "";

		}
