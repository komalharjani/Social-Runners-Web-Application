(function(){
	window.onload = function() {
		let btn = document.getElementById("addFilmBtn");
		btn.onclick = function(){
			let id = Math.random();
			let data = new Object();
			data.name = document.getElementById("name").value;
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
	