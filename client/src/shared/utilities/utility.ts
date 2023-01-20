import { AppConstants } from "../../app-constants/app-config";
import type { ApiError } from "../../models/types";
import { cart } from "../../store/cart.store";

const formatter = new Intl.NumberFormat(AppConstants.formatterConfig.locale, {
  style: AppConstants.formatterConfig.style,
  currency: AppConstants.formatterConfig.currency,
});

export const Utility = {
  formatNumber: formatter,

  /**
   * set user login token to session storage.
   */
  setToken: (token: string) => {
    sessionStorage.setItem("token", token);
  },

  /**
   * Returns User Login Token.
   * @returns token from session storage.
   */
  getToken: () => {
    return sessionStorage.getItem("token");
  },

  /**
   * Clear all session storage.
   */
  clear: () => {
    sessionStorage.clear();
  },

  /**
   * Set User Data from Login API Response and password to Session storage.
   * @param user - Object having email, password and token.
   */
  setUser: (user: any) => {
    sessionStorage.setItem("user", JSON.stringify(user));
  },

  /**
   * Return User Object from Session Storage.
   * @returns user object from session storage.
   */
  getUser: () => {
    return JSON.parse(sessionStorage.getItem("user"));
  },

  /**
   * Checks whether email is invalid or not.
   * @param email - given input
   * @returns - boolean, true if input is not empty and does not match the pattern.
   */
  isEmailInValid: (email: string) => {
    return (
      email.length > 0 &&
      !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    );
  },

  /**
   * Checks whether password is invalid or not.
   * @param password - given input
   * @returns - boolean, true if string is not empty and length is less than 8
   */
  isPasswordInValid: (password: string | any[]) => {
    return password.length < 8 && password.length > 0;
  },

  /**
   * Common method to set data in session storage with name and data.
   * @param name - name of the session storage key.
   * @param data - value of the session storage key.
   */
  setSession: (name: string, data: any) => {
    let value = data;
    if (Array.isArray(data)) {
      value = JSON.stringify(data);
    }
    sessionStorage.setItem(name, value);
  },

  /**
   * Common method to get data from session storage.
   * @param name - name of the session storage key.
   * @returns the value of the session storage key.
   */
  getSession: (name: string) => {
    return JSON.parse(sessionStorage.getItem(name));
  },

  /**
   * This method will update all amazon product image with small size to 500 X 500,
   * so that in details page image does not get distorted. And set no image to the
   * improper image source.
   * @param result - an array of products
   */
  updateImageUrl: (result: any[]) => {
    return result.map((item) => {
      let url = "";
      if (item.imageUrl.indexOf("https:") < 0) {
        url = AppConstants.amazonNoImage;
      } else if (item.imageUrl.indexOf("._SS40_.") >= 0) {
        url = item.imageUrl.replace(/._SS40_./gi, "._SS500_.");
      }
      item.imageUrl = url;
      return item;
    });
  },

  /**
   * After adding product to cart, if we go back to homepage and refresh the page,
   * then this method will store cart items from sessionstorage to Cart Store again,
   * and we can see cart count in navbar.
   */
  loadCartFromStorage: () => {
    let cartItems = Utility.getSession("cartdata");
    if (cartItems && cartItems.length > 0) {
      cart.set(cartItems);
    }
  },

  /**
   * Return default message for different API
   */
  getDefaultMessage: (callFrom: string) => {
    let message: string;
    switch (callFrom) {
      case "product":
        message = "Product not found. Check your product id.";
        break;

      default:
        message = "API not called. Bad Data.";
        break;
    }
    return message;
  },

  /**
   * Return Error Messages
   */
  getErrorMessage: (result: ApiError, callFrom: string) => {
    let statusCode: number;
    let message: string;

    if (result.hasOwnProperty("statusCode")) {
      statusCode = result.statusCode;

      switch (statusCode) {
        case 400:
        case 401:
        case 404:
        case 200:
        case 201:
          message = result.message;
          break;

        default:
          message = Utility.getDefaultMessage(callFrom);
          break;
      }
    } else {
      message = "Failed to fire API call. Check your network.";
    }
    return { message: message };
  },
};
