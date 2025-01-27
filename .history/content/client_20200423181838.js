(function(){
	window.onload = function() {
		let btn = document.getElementById("signUpBtn");
		btn.onclick = function(){
			let id = Math.random(); //create id
			let data = new Object();
			//data.name - inside object
			data.name = document.getElementById("name").value;
			data.type = document.getElementById("email").value;
			data.year = document.getElementById("password").value;
			fetch(`/addUser/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data) 
			})
			.then (res => res.text())
			.then (txt => alert(txt))
		}
	}
})();

var modal = document.getElementById('id01');

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
	