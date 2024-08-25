const { handle } = require("./requestHandler");

function login() {
	let userId = document.getElementById('txt_id').value;
	let userPw = document.getElementById('txt_pw').value;

	if (!userId || !userPw) {
		alert('Please check your ID or Password.');
	} else {
		handle['/']
	}
}