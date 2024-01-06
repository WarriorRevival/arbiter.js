const express = require("express")
const app = express.Router()

const RenderJob = require("../../lib/classes/RenderJob.js")

app.get("/:id", async (request, response) => {
	const { params, query } = request
	const job = new RenderJob()

	const clothing = await job.RenderClothing(params.id).catch((_) => _)
	if (clothing?.message) return response.status(500).json({ error: clothing.message })

	return response.end(clothing)
})

module.exports = app
