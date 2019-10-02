const jwt = require('jsonwebtoken');
const User = require('../processes/users/model');

const authorization = async (req, res, next) => {
	const accessToken = req.headers.authorization;
	if (!accessToken) {
		res.status(401).send('401 Unauthorized');
		return;
	}

	try {
		const _id = await jwt.verify(accessToken, process.env.JWT)._id;
		res.locals.currentUser = await User.findOne({ _id });
		next();
	} catch (e) {
		res.status(401).send('401 Unauthorized');
	}
};

exports.authorization = authorization;
