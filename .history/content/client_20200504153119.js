		
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

window.onload = function() {
const getAllUsers = async function () {
	const getResponse = await fetch(`/getUsers/${"komaalharjani@gmail.com"}`);
	getUsers = await getResponse.json();
	let name = getUsers.name;
	let age = getUsers.age;
	document.getElementById("nameDisplay").innerHTML = name;

	console.log(getUsers.name, getUsers.age);
}
getAllUsers();

}