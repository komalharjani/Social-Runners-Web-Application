(function(){
	window.onload = function() { //on load function - try to remove
		let btn = document.getElementById("addNewUserBtn");
		btn.onclick = function(){ //onclick function
			let id = Math.random();
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
			.then
		document.getElementById("name").value = "";
		document.getElementById("password").value = "";
		document.getElementById("email").value = "";
		document.getElementById("age").value = "";
		}
	}
})();
	