const express = require("express")
const app = express.Router()

const RenderJob = require("../../lib/classes/RenderJob.js")

app.get("/:id", async (request, response) => {
	const { params, query } = request
	const job = new RenderJob()

	const mesh = await job.RenderMesh(params.id).catch((_) => _)
	if (mesh?.message) return response.status(500).json({ error: mesh.message })

	return response.end(mesh)
})

module.exports = app
