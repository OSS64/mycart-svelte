import { categoryStore, prodStore } from '../store/product.store';

import { AppConstants } from '../app-constants/app-config';
import { Utility } from '../shared/utilities/utility';
import { openErrorMessage } from './error.service';

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
	// check token
	if (!Utility.getToken()) {
		return;
	}
	try {
		const response = await fetch(
			AppConstants.apiBase + '/categories',
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
		if (result.hasOwnProperty('categories')) {
			categoryStore.set(result.categories);
			return result.categories;
		} else {
			openErrorMessage({
				isOpen: true,
				message: result.message,
				title: result.error,
			});
			return Utility.getErrorMessage(result, 'category');
		}
	}
};
/**
 * Header's data required for productList API call
 * @returns - a object, to be used as header in API call
 */
const productListReqHeader = () => {
	return {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: Utility.getToken(),
		},
	};
};
/**
 * Trigger productList API
 * @returns - a Promise
 */
const fetchProductList = async (
	current: number,
	pageSize?: number,
	category: string = 'Laptop'
) => {
	let param = '';
	let offSet: number;
	if (pageSize) {
		if (pageSize === 0) {
			pageSize = 0;
		}
		param = `&perPage=${pageSize}`;
	}
	if (!current) {
		offSet = 0;
	} else if (current == 1) {
		offSet = 0;
	} else {
		offSet = (current - 1) * pageSize;
	}
	param += `&offSet=${offSet}`;
	try {
		const response = await fetch(
			AppConstants.apiBase + `/productList?category=${category}${param}`,
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
export const getProductList = async (
	page: number,
	pageSize?: number,
	cat?: string
) => {
	const result = await fetchProductList(page, pageSize, cat);
	console.log('result==', result);
	if (Array.isArray(result['products'])) {
		return result;
	} else {
		openErrorMessage({
			isOpen: true,
			message: result.message,
			title: result.error,
		});
		return Utility.getErrorMessage(result, 'productList');
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
			AppConstants.apiBase + '/products/' + id,
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
	if (result.hasOwnProperty('features')) {
		return result;
	} else {
		openErrorMessage({
			isOpen: true,
			message: result.message,
			title: result.error,
		});
		return Utility.getErrorMessage(result, 'product');
	}
};
