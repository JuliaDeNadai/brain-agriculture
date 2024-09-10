export class InternalError extends Error {
	public readonly statusCode: number
	public readonly title: string
	public readonly detail: string

	constructor(title: string, detail: string, statusCode: number) {
		super(title)
		this.statusCode = statusCode
		this.title = title
		this.detail = detail
	}
}