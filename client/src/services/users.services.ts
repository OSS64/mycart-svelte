import { AppConstants } from "../app-constants/app-config";
import { Utility } from "../shared/utilities/utility";

/**
 * Header's data required for register and login API call
 * @param formData - JSON object required to pass in body during API call.
 * @returns - Header data for API call
 */

const requestHeader = (formData: {}) => {
  return {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

/**
 * Trigger register API call
 * @param data - JSON object required to pass in body during API call.
 * @returns - Promise
 */
const fetchRegister = async (data: {}) => {
  try {
    const response = await fetch(
      AppConstants.apiBase + "/register",
      requestHeader(data)
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

/**
 * Call register API asynchronously
 * @param form - JSON object required to pass in body during API call.
 * @returns - a Promise
 */
export const callRegisterApi = async (form: {}) => {
  const result = await fetchRegister(form);
  let res = Utility.getErrorMessage(result, "register");
  return { message: res.message, statusCode: result.statusCode };
};

/**
 * login API call
 * @param data - JSON object required to pass in body during API call.
 * @returns - Promise
 */
const fetchLogin = async (data: {}) => {
  try {
    const response = await fetch(
      AppConstants.apiBase + "/login",
      requestHeader(data)
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

/**
 * Call login API asynchronously
 * @param form - JSON object required to pass in body during API call.
 * @returns - a Promise
 */
export const callLoginApi = async (form: {}) => {
  const result = await fetchLogin(form);

  if (result.hasOwnProperty("user")) {
    return result;
  } else {
    return Utility.getErrorMessage(result, "product");
  }
};
