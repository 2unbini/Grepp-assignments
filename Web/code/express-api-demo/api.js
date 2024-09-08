let express = require('express')
let mockDb = new Map()

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

mockDb.set(1, user1)
mockDb.set(2, user2)
mockDb.set(3, user3)

let app = express()
app.use(express.json())
app.listen(8080)

// Test Code
app.get('/', (req, res) => {
	let obj = { poo: 42, qoo: true }
	var { poo: p, qoo: q } = obj
	console.log(p, q)
	var { a, b } = obj
	console.log(a, b)
})

app.get('/users', (_, res) => {
	if (mockDb.size > 0) {
		res.status(200).json({
			message: "Success",
			data: mockDb
		})
	} else {
		res.status(200).json({
			message: "No User Found",
			data: null
		})
	}
})

app.post('/users', (req, res) => {
	const body = req.body
	const lastId = mockDb.size

	mockDb.set(lastId + 1, body)
	res.status(200).json({
		message: `User ${body.userName} saved in ID ${lastId + 1}`
	})
})

app.get('/users/:id', function(req, res) {
	const param = req.params
	const id = parseInt(param.id)
	
	if (mockDb.get(id) == undefined) {
		res.status(404).json({
			message: "No User Found"
		})
	} else {
		res.status(200).json({
			data: mockDb.get(id)
		})
	}
})

app.delete('/users/:id', function(req, res) {
	const id = req.params.id

	if (mockDb.delete(id) == false) {
		res.status(404).json({
			message: "No User Found"
		})
	} else {
		res.status(200).json({
			message: `User ID ${id} deleted.`
		})
	}
})
app.delete('/users/:id', function(req, res) {
	const id = req.params.id

	if (mockDb.delete(id) == false) {
		res.status(404).json({
			message: "No User Found"
		})
	} else {
		res.status(200).json({
			message: `User ID ${id} deleted.`
		})
	}
})

app.delete('/users/:id', function(req, res) {
	const id = req.params.id

	if (mockDb.delete(id) == false) {
		res.status(404).json({
			message: "No User Found"
		})
	} else {
		res.status(200).json({
			message: `User ID ${id} deleted.`
		})
	}
})

app.delete('/users', function(_, res) {
	mockDb.clear()
	res.status(200).json({
		message: "All users are deleted."
	})
})

app.put('/users/:id', (req, res) => {
	let id = req.params.id
	let body = req.body

	if (mockDb.get(id) == undefined) {
		res.status(404).json({
			message: "No User Found"
		})
	} else {
		let user = mockDb.get(id)
		user.nickname = body.nickname
		mockDb.set(id, user)
		res.status(200).json({
			message: `User ID ${id} nickname ${user.nickname} changed.`
		})
	}

})