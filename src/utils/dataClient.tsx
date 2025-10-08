import { toast } from "sonner";


import axiosClient from "@/utils/axios-client";
import { removeEmptyStrings } from "./removeEmptyStrings";
// import { removeEmptyStrings } from "./removeEmptyStrings";

export const getData = async (apiPath: string) => {
    return await axiosClient.get(apiPath)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            // console.log("Error in getData:", err);
            errorHandler(err)
            throw err
        })
}
export const postData = async (apiPath: string, payload: object) => {
    // console.log(apiPath, removeEmptyStrings(payload))
    return await axiosClient.post(apiPath, removeEmptyStrings(payload))
        .then(response => {
            successHandler(response)
            return response.data;
        })
        .catch((err) => {
            // console.log("Error", err)
            errorHandler(err)
            // throw err

        })
}
export const putData = async (apiPath: string, payload: object) => {
    console.log(apiPath, removeEmptyStrings(payload))
    return await axiosClient.put(apiPath, removeEmptyStrings(payload))
        .then(response => {
            successHandler(response)
            return response.data;
        })
        .catch((err) => {
            errorHandler(err)
            //  throw err
        })
}
export const deleteData = async (apiPath: string) => {
    return await axiosClient.delete(apiPath)
        .then(response => {
            successHandler(response)
            return response.data;
        })
        .catch((err) => {
            errorHandler(err)
            throw err
        })
}

const successHandler = (response: any) => {
    toast.success(response?.data.message)
}

const errorHandler = (error: any) => {
    // Check if the error is from a response with data (usually API error responses)
    // console.log("ResponseError", error);

    if (error.response?.data) {
        // console.log('error here...', error.response.data)
        // return
        // If there are validation errors (e.g., from form submissions)
        if (error.response.data?.errors) {

            // Loop through each error in the errors object
            Object.keys(error.response.data.errors).forEach(field => {
                const fieldErrors = error.response.data.errors[field];
                // You can show individual field errors using toast or another method
                // console.log('error here...', error.response.data)
                fieldErrors.forEach((errorMessage: any) => {
                    console.log('res', errorMessage)
                    toast.error(`${errorMessage}`);
                });
            });
        } else if (error.response.data.message) {
            // If there's a general message (e.g., non-validation error)
            //toast.error(error.response.data.message);

        } else {
            // Fallback for unexpected error responses
            toast.error('An unexpected error occurred.');
        }
    } else {
        // Handle other error types, such as network errors or timeout errors
        toast.error('Network or server error occurred.');
    }
};


export function showErrors(errorResponse:any) {

  Object.entries(errorResponse.errors).forEach(([field, messages]) => {
    (messages as String[]).forEach((msg: any) => {
      toast.error(`${field}: ${msg}`);
    });
  });
}
