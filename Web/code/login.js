// var vs let vs const
function compareVariables() {
	let n1 = 10;
	const n2 = 100;

	n2 = 20;
	alert('n2: ' + n2);
}

// ID Alert
function popId() {
	let userId = document.getElementById('txt_id').value;

	if (!userId) {
		alert('Insert your ID!');
	} else {
		alert('ID: ' + userId);
	}
}

// Custom Function
function myFunction() {
	alert('This is My Function!\nMy Name is Eunbin Seri Kwon 🥰');
}