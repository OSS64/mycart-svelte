import FastifyAuth from 'fastify-auth';
import verifyToken from '../controllers/auth/verifyToken';
import * as usersController from '../controllers/users';
import { GetAllUsersSchema, RegisterUserSchema, LoginUserSchema, GetUserSchema } from './documentation/usersAPI';

const registerUser = {
	method: 'POST',
	url: '/register',
	logLevel: 'warn',
	handler: usersController.registerUser,
	schema: RegisterUserSchema
}

const userLogin = {
	method: 'POST',
	url: '/login',
	logLevel: 'warn',
	handler: usersController.userLogin,
	schema: LoginUserSchema
}

const getUserProfile  = {
	method: 'GET',
	url: '/profile',
	logLevel: 'warn',
	handler: usersController.getUserProfile,
	schema: GetUserSchema
}

const getAllUsers = {
	method: 'GET',
	url: '/users',
	logLevel: 'warn',
	handler: usersController.getAllUsers,
	schema: GetAllUsersSchema
}

const userLogout = {
	method: 'POST',
	url: '/logout',
	logLevel: 'warn',
	handler: usersController.userLogout
}

const verifiedUser = {
	method: 'POST',
	url: '/verifieduser',
	logLevel: 'warn',
	handler: usersController.verifiedUser
}

const resetPassword = {
	method: 'PUT',
	url: '/resetpassword',
	logLevel: 'warn',
	handler: usersController.resetPassword
}

const usersRoutes = async (fastify, opts) => {
	fastify.register(FastifyAuth).after(() => privateUsersRoutes(fastify));
  };

const privateUsersRoutes = (fastify) => {
	fastify.post('/register', {
		...registerUser
	});

	fastify.post('/login', {
		...userLogin
	});

	fastify.get('/profile', {
		preHandler: fastify.auth([verifyToken]),
		...getUserProfile
	});

	fastify.get('/users', {
		preHandler: fastify.auth([verifyToken]),
		...getAllUsers
	});


	fastify.post('/logout', {
		preHandler: fastify.auth([verifyToken]),
		...userLogout
	});

	fastify.post('/verifieduser', {
		...verifiedUser
	});

	fastify.put('/resetpassword', {
		preHandler: fastify.auth([verifyToken]),
		...resetPassword
	});
};

export default usersRoutes;