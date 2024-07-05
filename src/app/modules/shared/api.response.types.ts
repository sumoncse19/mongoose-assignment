/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { ZodError, ZodIssue } from 'zod'

export interface APIResponseSuccess {
  success: true
  message?: string
  data?: any
  statusCode?: number
}

export interface APIResponseError {
  success: false
  message: string
  errors?: any
  statusCode?: number
}

export type APIResponse = APIResponseSuccess | APIResponseError

function sendAPIResponse(res: Response, response: APIResponse) {
  res.status(response.statusCode || 200).json(response)
}

export function SUCCESS(res: Response, message: string, data?: any) {
  const apiResponse: APIResponseSuccess = {
    success: true,
    message,
    data,
  }
  sendAPIResponse(res, apiResponse)
}

export function ERROR(
  res: Response,
  message: string,
  errors?: any,
  statusCode?: number,
) {
  const apiResponse: APIResponseError = {
    success: false,
    message,
    errors,
    statusCode,
  }
  sendAPIResponse(res, apiResponse)
}

// Custom type guard to check if a ZodIssue has 'expected' and 'received' properties
function isZodExpectedIssue(
  issue: ZodIssue,
): issue is ZodIssue & { expected: string; received: string } {
  return 'expected' in issue && 'received' in issue
}

// Function to format Zod errors
export function formatZodErrors(error: ZodError<any>) {
  return error.errors.map((err) => {
    const baseError = {
      path: err.path.join('.'),
      message: err.message,
      code: err.code,
    }

    if (isZodExpectedIssue(err)) {
      return {
        ...baseError,
        expected: err.expected,
        received: err.received,
      }
    }

    return baseError
  })
}
