		
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
			console.log(body);
			
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


var request = new XMLHttpRequest()
request.open('GET', '/getUsers/:id', true)
request.onload = function() {
	var data = JSON.parse(this.response)
	if (request.status >= 200 && request.status < 400) {
	  data.forEach(name => {
		console.log(body.name)
	  })
	} else {
	  console.log('error')
	}
}
