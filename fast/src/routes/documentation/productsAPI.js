export const AddProductSchema = {
	description: 'Create a new product',
	tags: ['products'],
	summary: 'Creates new product with given values',
	body: {
		type: 'object',
		properties: {
			productName: { type: 'string'},
            category: { type: 'string'},
            currencyCode: { type: 'string'},
            price: { type: 'number'},
            shortDescription: { type: 'string'},
            description: { type: 'string'},
            imageUrl: { type: 'string'},
            videoUrl: { type: 'string'},
            features: { 
				brand: { type: 'string'},
				modelName: { type: 'string'},
				screenSize:{ type: 'string'},
				colour: { type: 'string'},
				cpuModel: { type: 'string'},
				ramMemory: { type: 'string'},
				operatingSystem: { type: 'string'},
				specialFeature: { type: 'string'},
				graphicsCard: { type: 'string'}
			}
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
				productName: { type: 'string'},
                category: { type: 'string'},
                currencyCode: { type: 'string'},
                price: { type: 'number'},
                shortDescription: { type: 'string'},
                description: { type: 'string'},
                imageUrl: { type: 'string'},
                videoUrl: { type: 'string'},
                features: { 
					brand: { type: 'string'},
					modelName: { type: 'string'},
					screenSize:{ type: 'string'},
					colour: { type: 'string'},
					cpuModel: { type: 'string'},
					ramMemory: { type: 'string'},
					operatingSystem: { type: 'string'},
					specialFeature: { type: 'string'},
					graphicsCard: { type: 'string'}
				},
				_v: { type: 'number' }
			},
		},
	},
};

export const PutProductSchema = {
	description: 'Updates existing product',
	tags: ['products'],
	summary: 'Updates prodcuts by Id with given values',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Product Id'
			}
		}
	},
	body: {
		type: 'object',
		properties: {
			productName: { type: 'string'},
            category: { type: 'string'},
            currencyCode: { type: 'string'},
            price: { type: 'number'},
            shortDescription: { type: 'string'},
            description: { type: 'string'},
            imageUrl: { type: 'string'},
            videoUrl: { type: 'string'},
            features: { type: 'object'}
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
				productName: { type: 'string'},
                category: { type: 'string'},
                currencyCode: { type: 'string'},
                price: { type: 'number'},
                shortDescription: { type: 'string'},
                description: { type: 'string'},
                imageUrl: { type: 'string'},
                videoUrl: { type: 'string'},
                features: { 
					type: 'object',
					properties: {
						brand: { type: 'string'},
						modelName: { type: 'string'},
						screenSize:{ type: 'string'},
						colour: { type: 'string'},
						cpuModel: { type: 'string'},
						ramMemory: { type: 'string'},
						operatingSystem: { type: 'string'},
						specialFeature: { type: 'string'},
						graphicsCard: { type: 'string'}
					}
				},
				_v: { type: 'number' }
			},
		},
	},
};

export const GetProductSchema = {
	description: 'Gets a single product',
	tags: ['prodcuts'],
	summary: 'Gets product by Id',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Product Id'
			}
		}
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
				productName: { type: 'string'},
                category: { type: 'string'},
                currencyCode: { type: 'string'},
                price: { type: 'number'},
                shortDescription: { type: 'string'},
                description: { type: 'string'},
                imageUrl: { type: 'string'},
                videoUrl: { type: 'string'},
                features: { 
					type: 'object',
					properties: {
						brand: { type: 'string'},
						modelName: { type: 'string'},
						screenSize:{ type: 'string'},
						colour: { type: 'string'},
						cpuModel: { type: 'string'},
						ramMemory: { type: 'string'},
						operatingSystem: { type: 'string'},
						specialFeature: { type: 'string'},
						graphicsCard: { type: 'string'}
					}
				},
				_v: { type: 'number' }
			},
		},
	},
};

export const GetProductsSchema = {
	description: 'Gets all prodcuts',
	tags: ['prodcuts'],
	summary: 'Gets all products',
	response: {
		200: {
			description: 'Successful response',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					_id: { type: 'string' },
                    productName: { type: 'string'},
                    category: { type: 'string'},
                    currencyCode: { type: 'string'},
                    price: { type: 'number'},
                    shortDescription: { type: 'string'},
                    description: { type: 'string'},
                    imageUrl: { type: 'string'},
                    videoUrl: { type: 'string'},
                    features: { 
						type: 'object',
						properties: {
							brand: { type: 'string'},
							modelName: { type: 'string'},
							screenSize:{ type: 'string'},
							colour: { type: 'string'},
							cpuModel: { type: 'string'},
							ramMemory: { type: 'string'},
							operatingSystem: { type: 'string'},
							specialFeature: { type: 'string'},
							graphicsCard: { type: 'string'}
						}
					},
                    _v: { type: 'number' },
                },
			}
		},
	},
};

export const DeleteProdcutSchema = {
	description: 'Deletes a product',
	tags: ['products'],
	summary: 'Deletes product by Id',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Product Id',
			},
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
				productName: { type: 'string'},
                category: { type: 'string'},
                currencyCode: { type: 'string'},
                price: { type: 'number'},
                shortDescription: { type: 'string'},
                description: { type: 'string'},
                imageUrl: { type: 'string'},
                videoUrl: { type: 'string'},
                features: { 
					type: 'object',
					properties: {
						brand: { type: 'string'},
						modelName: { type: 'string'},
						screenSize:{ type: 'string'},
						colour: { type: 'string'},
						cpuModel: { type: 'string'},
						ramMemory: { type: 'string'},
						operatingSystem: { type: 'string'},
						specialFeature: { type: 'string'},
						graphicsCard: { type: 'string'}
					}
				},
				_v: { type: 'number' },
			},
		},
	},
};