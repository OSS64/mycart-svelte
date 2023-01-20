import { AppConstants } from "../app-constants/app-config";
import { Utility } from "../shared/utilities/utility";
import { categoryStore, prodStore } from "../store/product.store";

/**
 * Header's data required for category API call
 * @returns - a object, having header property.
 */
const requesteqHeader = () => {
  return { headers: { Authorization: Utility.getToken() } };
};

/**
 * Trigger categories API
 * @returns - a Promise
 */
const fetchCategories = async () => {
  try {
    const response = await fetch(
      AppConstants.apiBase + "/categories",
      requesteqHeader()
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

/**
 * Call categories API
 * @returns - a Promise
 */
export const getCategories = async () => {
  if (!prodStore.hasCategory) {
    const result = await fetchCategories();
    if (result.hasOwnProperty("categories")) {
      categoryStore.set(result.categories);
      return result.categories;
    } else {
      return Utility.getErrorMessage(result, "category");
    }
  }
};

/**
 * Header's data required for productList API call
 * @returns - a object, to be used as header in API call
 */

const productListReqHeader = () => {
  return {
    method: "POST",
    body: JSON.stringify({ perPage: 10, offSet: 0 }),
    headers: {
      "Content-Type": "application/json",
      Authorization: Utility.getToken(),
    },
  };
};

/**
 * Trigger productList API
 * @returns - a Promise
 */
const fetchProductList = async () => {
  try {
    const response = await fetch(
      AppConstants.apiBase + "/productList",
      productListReqHeader()
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

/**
 * Call productList API call.
 * @returns - a Promise
 */
export const getProductList = async () => {
  const result = await fetchProductList();
  if (Array.isArray(result)) {
    return result;
  } else {
    return Utility.getErrorMessage(result, "productList");
  }
};

/**
 * Product Detail API Call
 * @param id - product id
 * @returns - a Promise
 */

const fetchProduct = async (id: string) => {
  try {
    const response = await fetch(
      AppConstants.apiBase + "/products/" + id,
      requesteqHeader()
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

/**
 * call products/:id API to get data for a particular product.
 * @param id - a product id
 * @returns - a Promise
 */
export const getProduct = async (id: string) => {
  const result = await fetchProduct(id);

  if (result.hasOwnProperty("features")) {
    return result;
  } else {
    return Utility.getErrorMessage(result, "product");
  }
};
