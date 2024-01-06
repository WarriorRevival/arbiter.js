const express = require("express")
const app = express.Router()

const RenderJob = require("../../lib/classes/RenderJob.js")

app.get("/:id", async (request, response) => {
	const { params, query } = request
	const job = new RenderJob()

	const head = await job.RenderHead(params.id).catch((_) => _)
	if (head?.message) return response.status(500).json({ error: head.message })

	return response.end(head)
})

module.exports = app
