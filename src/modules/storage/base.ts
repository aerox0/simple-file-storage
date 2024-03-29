import { SimpleFsMiddleware } from './middleware'
import { SimpleFsStream } from './stream'

export abstract class SimpleFsBase<T> {
	private data_str: string = ''
	private stream: SimpleFsStream
	file_path: string
	data: T
	middleware: SimpleFsMiddleware<T>

	constructor(file_path: string, data: T) {
		this.middleware = new SimpleFsMiddleware<T>()
		this.stream = new SimpleFsStream(file_path)
		this.data = data
	}

	async init(): Promise<this> {
		await this.stream.init(await this.stringifyData(this.data))
		return this
	}

	abstract stringifyData(data: T): Promise<string>
	abstract parseData(data_str: string): Promise<T>

	async load(): Promise<void> {
		await this.load_str()
		const data = await this.parseData(this.data_str)

		await this.validate(data)

		this.data = data

		return
	}

	async save(): Promise<void> {
		await this.validate(this.data)

		this.data_str = await this.stringifyData(this.data)

		await this.save_str()
		return
	}

	async validate(data?: T): Promise<void> {
		await this.middleware.run(data || this.data)
		return
	}

	private async load_str(): Promise<void> {
		this.data_str = await this.stream.readStorageFile()
		return
	}

	private async save_str(): Promise<void> {
		await this.stream.writeStorageFile(this.data_str)
		return
	}
}
