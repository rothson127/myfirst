require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.MONGODB_URI)
module.exports = () => {
	const connection = mongoose
		.connect(process.env.MONGODB_URI)
		.then((result) => console.log("Connected to database"))
		.catch((err) => console.log("could not connect to database  : " + err));
};
