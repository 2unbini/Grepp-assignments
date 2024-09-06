const express = require('express')
const app = express()

let mockDb = new Map()
let startId = 1

// Default User to test
mockDb.set(startId, {name: "seri", password: "1234"})

app.listen(8080)
app.use(express.json())

// Login
app.post('/login', (req, res) => {
	let user = req.body
	let isUserExist

	for (let v of mockDb.values()) {
		if (v.name === user.name && v.password === user.password) {
			isUserExist = true
		} else {
			isUserExist = false
		}
	}
	
	if (isUserExist == false) {
		res.status(500).json({
			message: `${user.name}에 해당하는 유저가 없습니다.`
		})
	} else {
		res.status(200).json({
			message: `${user.name}님 환영합니다.`
		})
	}
})

// Sign In
app.post('/sign-in', (req, res) => {
	let currentId = ++startId
	
	mockDb.set(currentId, req.body)
	res.status(201).json({
		message: `${mockDb.get(currentId).name}님 환영합니다.`
	})
})

// Get User Info
app.get('/users/:id', (req, res) => {
	let currentUser = mockDb.get(parseInt(req.params.id))

	if (currentUser == undefined) {
		res.status(500).json({
			message: `${req.params.id}에 해당하는 유저가 없습니다.`
		})
	} else {
		res.status(200).json(currentUser)
	}
})

// Delete User
app.delete('/users/:id', (req, res) => {
	let hasUserDeleted = mockDb.delete(parseInt(req.params.id))

	if (hasUserDeleted == false) {
		res.status(500).json({
			message: `${req.params.id}에 해당하는 유저가 없습니다.`
		})
	} else {
		res.status(200).json({
			message: "성공적으로 삭제되었습니다."
		})
	}
})