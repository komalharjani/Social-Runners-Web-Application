(function(){
	window.onload = function() { //on load function - try to remove
		let btn = document.getElementById("addNewUserBtn");
		let id;
		count = 0;
		btn.onclick = function(){ //onclick function
			id = count;
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
		}
		id++;
		// document.getElementById("forename").value = "";
				// document.getElementById("surname").value = "";
			// document.getElementById("password").value = "";
			// document.getElementById("email").value = "";
			// document.getElementById("age").value = "";
	}
})();
	