(function(){
	window.onload = function() {
		let btn = document.getElementById("addFilmBtn");
		btn.onclick = function(){
			let id = document.getElementById("id").value;
			let data = new Object();
			//data.name - inside object
			data.name = document.getElementById("name").value;
			data.type = document.getElementById("type").value;
			data.year = document.getElementById("year").value;
			fetch(`/addFilm/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data) 
			})
			.then (res => res.text())
			.then (txt => alert(txt))
		}
	}
})();
	