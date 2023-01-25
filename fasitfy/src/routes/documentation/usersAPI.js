export const RegisterUserSchema = {
	description: 'Create a new user',
	tags: ['users'],
	summary: 'Creates new users with given details',
	body: {
		type: 'object',
		properties: {
			username: { type: 'string' },
			email: { type: 'string' },
			password: { type: 'string' }
		},
	}
};
export const LoginUserSchema = {
	description: 'Login a user',
	tags: ['users'],
	summary: 'Login user with given details',
	body: {
		type: 'object',
		properties: {
			email: { type: 'string' },
			password: { type: 'string' }
		},
	}
}

export const GetUserSchema = {
	description: 'Get all users',
	tags: ['users'],
	summary: 'Get all users details',
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
				username: { type: 'string' },
				email: { type: 'string' },
				password: { type: 'string' },
				_v: { type: 'number' }
			},
		}
	}
};

export const GetAllUsersSchema = {
	description: 'Get all users',
	tags: ['users'],
	summary: 'Get all users details',
	response: {
		200: {
			description: 'Successful response',
			type: 'array',
			properties: {
				_id: { type: 'string' },
				username: { type: 'string' },
				email: { type: 'string' },
				password: { type: 'string' },
				_v: { type: 'number' }
			},
		}
	}
};
