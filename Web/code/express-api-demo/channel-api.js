let express = require('express')
let mockDb = new Map()

// Global Mock Objects
let channel1 = {
	title: "웃기세리",
	nickname: "seri",
	type: "humor",
	url: "www.youtube.com/seri"
}

let channel2 = {
	title: "송용돌이",
	nickname: "black shadow",
	type: "beauty",
	url: "www.youtube.com/shadow-stone-black"
}

let channel3 = {
	title: "백지허니",
	nickname: "honey",
	type: "dance",
	url: "www.youtube.com/happy-honey"
}

mockDb.set(1, channel1)
mockDb.set(2, channel2)
mockDb.set(3, channel3)

let app = express()
app.use(express.json())
app.listen(8080)


// Post Channel by channel title
app.post('/channels', (req, res) => {
	const body = req.body
	const lastId = mockDb.size

	mockDb.set(lastId + 1, body)
	res.status(200).json({
		message: `Channel ${body.title} saved in ID ${lastId + 1}`
	})
})

// Edit channel info
app.put('/channels/:id', function(_, res) {
	let id = req.params.id
	let body = req.body

	if (mockDb.get(id) == undefined) {
		res.status(404).json({
			message: "No Channel Found"
		})
	} else {
		let channel = mockDb.get(id)
		channel.title = body.title

		mockDb.set(id, channel)
		res.status(200).json({
			message: `Title of channel ID ${id} changed to ${channel.title}.`
		})
	}
})

// Delete channel by id
app.delete('/channels/:id', function(req, res) {
	const id = req.params.id

	if (mockDb.delete(id) == false) {
		res.status(404).json({
			message: "No Channel Found"
		})
	} else {
		res.status(200).json({
			message: `Channel ID ${id} deleted.`
		})
	}
})

// Get all channel list
app.get('/channels', (_, res) => {
	if (mockDb.size > 0) {
		res.status(200).json({
			message: "Success",
			data: mockDb
		})
	} else {
		res.status(200).json({
			message: "No Channel Found",
			data: null
		})
	}
})

// Get channel information by id
app.get('/channels/:id', function(req, res) {
	const param = req.params
	const id = parseInt(param.id)
	
	if (mockDb.get(id) == undefined) {
		res.status(404).json({
			message: "No Channel Found"
		})
	} else {
		res.status(200).json({
			data: mockDb.get(id)
		})
	}
})
