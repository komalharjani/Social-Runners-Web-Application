(function(){
	window.onload = function() {
		let btn = document.getElementById("addNewUserBtn");
		btn.onclick = function(){
			let id = Math.random();
			let data = new Object();
			data.name = document.getElementById("forename").value;
			data.password = document.getElementById("password").value;

			fetch(`/addUser/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data) 
			})
			.then (res => res.text())
			.then (txt => alert(txt))
			document.getElementById("forename").value = "";
			document.getElementById("password").value = "";

		}
	}
})();
	