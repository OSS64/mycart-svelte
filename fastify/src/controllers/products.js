import Products from '../models/products';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { Parser } from 'json2csv';
import fs from 'fs';

export const getProducts = async (req, reply) => {
	try {
		const products = await Products.find({});
		return products;
	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const getSingleProduct = async (req, reply) => {
	try {
		const id = req.params.id;
		const product = await Products.findById(id);
		return product;
	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const addProduct = async (req, reply) => {
	try {
		const product = new Products(req.body);
		await product.save();
		reply.code(201).send({ status: true, statusCode: 201, message: "Product Saved Successfully!" });
	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const updateProduct = async (req, reply) => {
	try {
		const id = req.params.id;
		const product = req.body;
		const { ...updateData } = product;
		await Products.findByIdAndUpdate(id, updateData, { new: true });
		reply.code(200).send({ status: true, statusCode: 200, message: "Product Updated Successfully!" });
	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const deleteProduct = async (req, reply) => {
	try {
		const id = req.params.id;
		await Products.findByIdAndRemove(id);
		reply.code(200).send({ status: true, statusCode: 200, message: "Product Deleted Successfully!" });
	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const getSearchProducts = async (req, reply) => {
	try {
		const product = await Products.find({ productName: { $regex: req.body.searchText, $options: 'i' } });

		if (product.length > 0) {
			return product;
		} else {
			reply.code(200).send({ status: true, statusCode: 200, message: "No Record Found" });
		}

	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const getProductsPdfDownload = async (req, reply) => {
	try {
		const products = await Products.findWithPaging(req.body.perPage, req.body.offSet);
		if (products.length > 0) {
		
			let doc = new jsPDF();

			let tableColumns = ["Product Name", "Currency Code", "Category", "Price"];
			let tableRows = [];

			products.forEach((data, key) => {
				tableRows.push([data.productName, data.currencyCode, data.category, data.price.toLocaleString()])
			});

			doc.autoTable(tableColumns, tableRows, { startY: 10 })
			
			await doc.save('products.pdf');
			reply.code(200).send({ status: true, statusCode: 200, message: "Pdf exported successfully" });
		} else {
			reply.code(200).send({ status: true, statusCode: 200, message: "No Record Found" });
		}

	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const getProductsCvsDownload = async (req, reply) => {
	try {
		const products = await Products.findWithPaging(req.body.perPage, req.body.offSet);
		
		if (products.length > 0) {
			
			let productsData = products.map(i => {
				return {
					"Product Name": i.productName, 
					"Currency Code": i.currencyCode, 
					"Category": i.category,
					"Price": i.price.toLocaleString(),
					"Short Description": i.shortDescription,
					"Description": i.description,
					"Image Url": i.imageUrl,
					"Video Url": i.videoUrl
				}
			})

			const json2csvParser = new Parser();
			const csv = json2csvParser.parse(productsData);

			fs.writeFile("products.csv",csv,function(){
				console.log('File Saved');
			});
			
			reply.code(200).send({ status: true, statusCode: 200, message: "CSV exported successfully" });
		} else {
			reply.code(200).send({ status: true, statusCode: 200, message: "No Record Found" });
		}

	} catch (err) {
		reply.code(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};