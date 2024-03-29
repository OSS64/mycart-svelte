import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
			required: true
	},
	password: {
		type: String,
		required: true
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

// encrypt password using bcrypt conditionally. Only if the user is newly created.
// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.generateToken = async function() {
	let user = this;

	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEYID, { expiresIn: '72h' });

	user.tokens = { token };
	await user.save();

	return token;
};

// create a custom model method to find user by token for authenticationn
userSchema.statics.findByToken = async function(token) {
	let User = this;
	let decoded;

	try {
		if (!token) {
			return new Error('Missing token header');
		}

		decoded = jwt.verify(token, process.env.JWT_KEYID);
	} catch (error) {
		return error;
	}
	return await User.findOne({
		_id: decoded._id,
		'tokens.token': token
	});
};

// create a new mongoose method for user login authenticationn
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login. Invalid Email Id and Password!');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login. Invalid Email Id and Password!');
	}

	return user;
};

const User = mongoose.model('User', userSchema);

export default User;

