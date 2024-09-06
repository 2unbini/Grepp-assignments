let express = require('express')

// Global Mock Objects
let user1 = {
	userName: "권은빈",
	nickname: "seri",
	mbti: "ENTP",
	height: 172
}

let user2 = {
	userName: "송은석",
	nickname: "black shadow",
	mbti: "ISTP",
	height: 180
}

let user3 = {
	userName: "백지헌",
	nickname: "honey",
	mbti: "ENFJ",
	height: 165
}

let app = express()
app.listen(8080)

app.get('/', (req, res) => {
	let obj = { poo: 42, qoo: true }
	var { poo: p, qoo: q } = obj
	console.log(p, q)
	var { a, b } = obj
	console.log(a, b)
})

app.post('/:userName', (req, res) => {
	const b = req.body
	res.send(200, b)
})

app.get('/:userName', function(req, res) {
	const param = req.params
	
	switch (param.userName) {
		case "권은빈":
			res.json(user1)
			break
		case "송은석":
			res.json(user2)
			break
		case "백지헌":
			res.json(user3)
			break
		default:
			res.json({
				message: "No user found."
			})
	}
})

