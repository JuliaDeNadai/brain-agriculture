export class DriverError extends Error {
	public readonly code: string
	public readonly errno: number
	public readonly sqlMessage: string
	public readonly stack: string

	constructor(code: string, errno: number, sqlMessage: string, stack: string) {
		super(code)
		this.errno = errno
		this.code = code
		this.sqlMessage = sqlMessage
		this.stack = stack
	}
}