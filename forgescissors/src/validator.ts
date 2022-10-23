import { validationResult } from 'express-validator'

// validationResult: extracts the validation errors from a request and makes them available in a Result object.
export const validateInput = ( req:any, res:any, next:any ) => { 
    const errors = validationResult(req)

    if( !errors.isEmpty() ){
        return res.status(400).json(errors)
    }

    next()
}