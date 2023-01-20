import User from '../models/users';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, reply) => {
	try {
		const users = await User.find({});
		return users;
	} catch (err) {
		reply.status(400).send({ status: false, statusCode: 400, message: "Bad Request!" });
	}
};

export const registerUser = async (req, reply) => {
	const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateToken();
        reply.status(201).send({ status:true, statusCode: 201, message: "User Registered Successfully" });
    } catch (error) {
        reply.status(400).send({
            "statusCode": 400,
            "status": false,
            "message": "Bad Request!"
        });
    }
};

export const userLogin = async (req, reply) => {
	try {
        if (!req.body.email && req.body.password) {
            reply.code(200).send("Email is required!");
        } else if (!req.body.password && req.body.email) {
            reply.code(200).send("Password is required!");
        } else if (req.body.email == "" && !req.body.password == "") {
            reply.code(200).send("Email and Password are required!");
        } else if (!req.body.email && !req.body.password) {
            reply.code(400).send({status: false, statusCode: 400, message: "Bad Request!"});
        }

        let email = req.body.email;
        let password = req.body.password;

        const user = await User.findOne({ email });
        
        if (!user) {
            reply.code(200).send({ status: true, statusCode: 200, message: "Unable to login. Invalid Email Id and Password!"});
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            reply.code(200).send({ status: true, statusCode: 200, message: "Unable to login. Invalid Email Id and Password!"});
        }
        
       reply.code(200).send({ status: true, statusCode: 200, user: {email: user.email, token: user.tokens[0]['token']}});
    } catch (error) {
        reply.code(400).send({
            "statusCode": 400,
            "status": false,
            "message": "Bad Request!"
        });
    }
};

export const getUserProfile = async (req, reply) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const user = await User.findByToken(token);
        if (!user) {
            reply.status(401).send({ status: false, statusCode: 401, message: "Authentication Failed!"});
        }
       
        return user
    } catch (error) {
        reply.code(400).send({
            "statusCode": 400,
            "status": false,
            "message": "Bad Request!"
        });
    }
};

export const userLogout = async (req, reply) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const user = await User.findByToken(token);

        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await user.save();

        reply.send({ status: true, statusCode: 200, message: 'You are logged out!' });
    } catch (e) {
        reply.status(400).send({
            "statusCode": 400,
            "status": false,
            "message": "Bad Request!"
        });
    }
};

export const verifiedUser = async (req, reply) => {
    try {
        let email = req.body.email;
        let user = await User.findOne({ email });
        
        if(user){
            reply.code(200).send({
                "statusCode": 200,
                "status": true,
                "token": user.tokens[0].token
            });
        }else {
            reply.code(200).send({
                "statusCode": 200,
                "status": true,
                "message": "User Not Found"
            });
        }


        
    } catch (error) {
        reply.code(400).send({
            "statusCode": 400,
            "status": false,
            "message": "Bad Request!"
        });
    }
};

export const resetPassword = async (req, reply) => {
    try {
        let token = req.headers.authorization.replace('Bearer ', '');
        
        let fetchUser = await User.findByToken(token);
       
        if(fetchUser){
            let updateData = { };
            updateData['username'] = fetchUser.username
            updateData['email'] = fetchUser.email
            updateData['password'] = await bcrypt.hash(req.body.newPassword, 8);
            
            let user = await User.findOneAndUpdate({ username: fetchUser.username }, updateData);
            
            if(user){
                reply.code(200).send({
                    "statusCode": 200,
                    "status": true,
                    "message": "Password Reset Successfully"
                });
            } else {
                reply.code(200).send({
                    "statusCode": 200,
                    "status": true,
                    "message": "Something went wrong. Please try again later!"
                });
            }
        } else {
            reply.code(200).send({
                "statusCode": 200,
                "status": true,
                "message": "User Not Found!"
            });
        }
        
    } catch (error) {
        reply.code(400).send({
            "statusCode": 400,
            "status": false,
            "message": "Bad Request!"
        });
    }
};