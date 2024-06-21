import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';


export const handleValidateError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {

  const errorSource: TErrorSource[] = Object.values(err.errors).map((val) => {
    
    return {
      path: val.path,
      message: val.message,
    };
  });


  const statusCode = 400;
  const message =errorSource?.message || 'Validation Error';

  return {
    statusCode,
    message,
    errorSource,
  };
};

export default handleValidateError;
