import mongoose from 'mongoose';

const ProductFeaturesSchema = mongoose.Schema({
	brand: {
		type: String,
		required: true
	},
	modelName: {
		type: String,
		required: true
	},
	screenSize: {
		type: String,
		required: false
	},
	colour: {
		type: String,
		required: false
	},
	cpuModel: {
		type: String,
		required: false
	},
	ramMemory: {
		type: String,
		required: false
	},
	operatingSystem: {
		type: String,
		required: false
	},
	specialFeature: {
		type: String,
		required: false
	},
	graphicsCard: {
		type: String,
		required: false
	}
})

const ProductImagesSchema = mongoose.Schema({
	mainImage: {
		type: String,
		required: false
	},
	previewImage_1: {
		type: String,
		required: false
	},
	previewImage_2: {
		type: String,
		required: false
	},
	previewImage_3: {
		type: String,
		required: false
	},
	previewImage_4: {
		type: String,
		required: false
	}
})

const ProductSchema = mongoose.Schema({
	productName: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	currencyCode: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	shortDescription: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	},
	image: {
		type: ProductImagesSchema,
		required: false
	},
	videoUrl: {
		type: String,
		required: true
	},
	features: {
		type: ProductFeaturesSchema,
		required: true
	}
})

ProductSchema.statics.findWithPaging = async function (perPage, offSet) {

	try {
		return await Products.find({}).skip(offSet)
			.limit(perPage)
			.sort({
				productName: 'asc'
			});
	} catch (error) {
		return error;
	}
};

ProductSchema.statics.limitedColumnsWithPaging = async function (perPage, offSet, category="") {

	try {
		let products = await Products.find({ category: { $regex: category, $options: 'i' } })
							.select({
								productName: 1, price: 1, image: 1, shortDescription: 1, features: { brand: 1, modelName: 1 }, _id: 1
							}).skip(offSet)
							.limit(perPage)
							.sort({
								productName: 'asc'
							});

		let productsCount = await Products.find({ category: { $regex: category, $options: 'i' } });
		
		return {products: products, productsCount: productsCount.length}
	} catch (error) {
		return error;
	}
};

const Products = mongoose.model('Products', ProductSchema);

export default Products;
