import path from 'path';
import express from 'express';
// import dotenv from 'dotenv';
import fileupload from 'express-fileupload'
import morgan from 'morgan';
import colors from 'colors';
import bodyParser from 'body-parser'
import connectDB from './config/db.js';
import bootcampRouter from './routes/bootcamps.js';
import courseRouter from './routes/courses.js';
import errorHandler from './middleware/error.js';

// dotenv.config({ path: './config/config.env' });

// const moduleURL = new URL(import.meta.url);
// console.log(`pathname: ${moduleURL.pathname}`);
// console.log(`dirname: ${path.dirname(moduleURL.pathname)}`);
// const __dirname = path.dirname(moduleURL.pathname);
// console.log(__dirname);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(fileupload());

app.use(express.static(path.join(__dirname , 'public')));

app.use('/api/v1/bootcamps' , bootcampRouter);
app.use('/api/v1/courses' , courseRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT , 
    () => console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} mode...`.blue.bold)
);

process.on('unhandledRejection' , (error , promise) => {
    console.error(`${error.message}`.red);
    server.close(() => process.exit(1));
});