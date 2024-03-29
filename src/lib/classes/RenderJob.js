const { readFile } = require("fs/promises")
const chalk = require("chalk")

const Job = require("./Job.js")
const logger = require("../logger.js")
const { randomUUID } = require("crypto")

class RenderJob extends Job {
	constructor() {
		super()
	}

	async RenderHeadshot(id) {
		this.id = randomUUID()

		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Headshot RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/headshot.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Headshot" },
					{ type: "LUA_TSTRING", value: "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_USER_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_USER_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
				],
			},
		}).catch((e) => false)

		logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Headshot RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}

	async RenderBodyshot(id, three_d = false) {
		this.id = randomUUID()

		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Bodyshot RenderJob started for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Bodyshot RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/bodyshot.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Bodyshot" },
					{ type: "LUA_TSTRING", value: three_d ? "OBJ" : "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_USER_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_USER_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
				],
			},
		}).catch((e) => false)

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Bodyshot RenderJob finished for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Bodyshot RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}

	async RenderAsset(id, three_d = false) {
		this.id = randomUUID()

		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Asset RenderJob started for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Asset RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/xml.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Asset" },
					{ type: "LUA_TSTRING", value: three_d ? "OBJ" : "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
					{ type: "LUA_TBOOLEAN", value: "true" },
				],
			},
		}).catch((e) => false)

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Asset RenderJob finished for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Asset RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}

	async RenderPlace(id) {
		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Place RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/place.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Place" },
					{ type: "LUA_TSTRING", value: "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_PLACE_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_PLACE_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
					{ type: "LUA_TSTRING", value: process.env.ARBITER_TOKEN },
				],
			},
		}).catch((e) => false)

		logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Place RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}

	async RenderTexture(id) {
		this.id = randomUUID()

		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		logger.info(`[${this.id}] Texture RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/texture.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Texture" },
					{ type: "LUA_TSTRING", value: "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_USER_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_USER_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
				],
			},
		}).catch((e) => false)

		logger.info(`[${this.id}] Texture RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}

	async RenderClothing(id, three_d = false) {
		this.id = randomUUID()

		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Clothing RenderJob started for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Clothing RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/clothing.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Clothing" },
					{ type: "LUA_TSTRING", value: three_d ? "OBJ" : "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
					{ type: "LUA_TBOOLEAN", value: "true" },
				],
			},
		}).catch((e) => false)

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Clothing RenderJob finished for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Clothing RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}

	async RenderHead(id, three_d = false) {
		this.id = randomUUID()

		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Head RenderJob started for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Head RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/head.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Head" },
					{ type: "LUA_TSTRING", value: three_d ? "OBJ" : "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
					{ type: "LUA_TBOOLEAN", value: "true" },
				],
			},
		}).catch((e) => false)

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Head RenderJob finished for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Head RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}

	async RenderMesh(id, three_d = false) {
		this.id = randomUUID()

		const running = this.started
		if (!running) {
			const started = await this.Start()
			if (!started) throw new Error("RCCService failed to start")
		}

		if (!this.client) await this.CreateClient()

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Mesh RenderJob started for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Mesh RenderJob started for ${id}`)

		const result = await this.OpenJobEx({
			name: this.id,
			script: await readFile(__dirname + "/../../lua/mesh.lua", { encoding: "utf-8" }),
			arguments: {
				LuaValue: [
					{ type: "LUA_TSTRING", value: this.id },

					{ type: "LUA_TSTRING", value: "Mesh" },
					{ type: "LUA_TSTRING", value: three_d ? "OBJ" : "PNG" },

					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_WIDTH },
					{ type: "LUA_TNUMBER", value: process.env.RENDER_ASSET_HEIGHT },

					{ type: "LUA_TSTRING", value: process.env.BASE_URL },
					{ type: "LUA_TNUMBER", value: id },
					{ type: "LUA_TBOOLEAN", value: "true" },
				],
			},
		}).catch((e) => false)

		if (three_d) logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} 3D Mesh RenderJob finished for ${id}`)
		else logger.info(`${chalk.gray(`${chalk.gray(`[${this.id}]`)}`)} Mesh RenderJob finished for ${id}`)

		this.Stop()

		if (!result) return false
		return result[0]?.OpenJobExResult?.LuaValue[0]?.value
	}
}

module.exports = RenderJob
