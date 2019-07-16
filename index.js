const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
require('dotenv').config();
require('./config/dbconnection');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load schemas
const User = require('./models/User');
const Volunteer = require('./models/Volunteer');
const Project = require('./models/Project');

// load routes
app.use('/api/v1', require('./routes/api/v1/index'));
app.use('/api/v1/admin', require('./routes/api/v1/admin'));

// 404 route
app.get('*', (req, res) => {
	res.json({ message: 'api not found' });
});

//Setting up server
startServer = async () => {
	try {
		await app.listen(process.env.PORT);
		console.log(`Server is up and running on Port ${process.env.PORT}`);
	} catch (err) {
		console.log('Error in running server.');
	}
};
startServer();
