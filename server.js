import path from 'path';
import express from 'express';
// import dotenv from 'dotenv';
import fileupload from 'express-fileupload'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import colors from 'colors';
import bodyParser from 'body-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet';
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import connectDB from './config/db.js';
import bootcampRouter from './routes/bootcamps.js';
import courseRouter from './routes/courses.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import reviewRouter from './routes/reviews.js';
import errorHandler from './middleware/error.js';

// dotenv.config({ path: './config/config.env' });

// const moduleURL = new URL(import.meta.url);
// console.log(`pathname: ${moduleURL.pathname}`);
// console.log(`dirname: ${path.dirname(moduleURL.pathname)}`);
// const __dirname = path.dirname(moduleURL.pathname);
// console.log(__dirname);
//http://devnodeio.io

const __dirname = path.dirname(new URL(import.meta.url).pathname);

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
    windowMs: 10 * 1000 * 60 ,
    max: 100
});
app.use(limiter);

app.use(fileupload());

app.use(express.static(path.join(__dirname , 'public')));

app.use('/api/v1/bootcamps' , bootcampRouter);
app.use('/api/v1/courses' , courseRouter);
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/users' , userRouter);
app.use('/api/v1/reviews' , reviewRouter);
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