interface OptionalArgs {
  extraData?: unknown
  status?: number
}

interface ConstructorArgs extends OptionalArgs {
  message: string
  rawError?: RawError
}

type RawError = unknown

export default class AppError extends Error {
  status?: number
  rawError?: RawError
  extraData: unknown

  static fromResponse(response: Response, optionalArgs?: OptionalArgs) {
    return new AppError({
      message: response.statusText,
      status: response.status,
      ...optionalArgs,
    })
  }

  static fromError(
    message: string,
    rawError: RawError,
    optionalArgs?: OptionalArgs
  ) {
    return new AppError({
      message,
      rawError,
      ...optionalArgs,
    })
  }

  constructor({ message, status, rawError, extraData }: ConstructorArgs) {
    super(message)

    this.name = this.constructor.name
    this.status = status
    this.rawError = rawError
    this.extraData = extraData

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}

export function isAppError(instance: unknown): instance is AppError {
  return instance instanceof AppError
}
