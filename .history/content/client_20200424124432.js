(function(){
	window.onload = function() {
		let btn = document.getElementById("addFilmBtn");
		btn.onclick = function(){
			let id = function () {
				// Math.random should be unique because of its seeding algorithm.
				// Convert it to base 36 (numbers + letters), and grab the first 9 characters
				// after the decimal.
				return '_' + Math.random().toString(36).substr(2, 9);
			  };
			let data = new Object();
			data.name = document.getElementById("name").value;
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
	