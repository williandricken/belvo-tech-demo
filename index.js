
const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const PublicDirectory = path.join(__dirname, './public');

dotenv.config({ path: './.env' });

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');


app.use(express.static(PublicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cookieParser());

app.use((req, res, next) => {
	res.locals.partial = (name, options) => {
		res.render(`partials/${name}`, options);
	};
	next();
});

const httpServer = require('http').Server(app);

const PORT = process.env.SOCKET_PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const pageRouter = require('./routes/pageRoutes.js');

app.use('/', pageRouter);