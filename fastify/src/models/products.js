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
	imageUrl: {
		type: String,
		required: true
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

ProductSchema.statics.findWithPaging = async function(perPage, offSet) {

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

const Products = mongoose.model('Products', ProductSchema);

export default Products;
