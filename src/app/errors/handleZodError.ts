import { ZodError, ZodIssue } from "zod";

export const handlezodError=(err:ZodError)=>{
    const errorMessage= err.issues.map((issue:ZodIssue)=>{
        return {
            path:issue?.path[issue.path.length-1],
            message:issue.message
        }
    })

    const statusCode=400

    return {
        statusCode,
        message:'zod Validation error',
        errorMessage
    }
}
