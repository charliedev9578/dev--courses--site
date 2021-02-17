// import dotenv from 'dotenv'
import path from 'path';
import fs from 'fs'
import colors from 'colors'
import connectDB from './config/db.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// dotenv.config();

import Bootcamp from './models/Bootcamp.js';
import Course from './models/Course.js';
import User from './models/User.js';
connectDB();

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json` , 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json` , 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json` , 'utf-8'));

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        console.log('Data are fetched to the database'.green.bold.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red);
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        console.log('Data are deleted'.red.bold.inverse);
        process.exit();
    } catch (error) {
        console.error(`error`.red);
    }
}

if(process.argv[2] === '-i') {
    importData();
}
else if(process.argv[2] === '-d') {
    deleteData();
}
