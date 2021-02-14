import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true ,
            useFindAndModify: false
        });
        console.log(`Database connected => ${conn.connection.host}`.yellow.bold.underline);
    } catch (error) {
        console.error(`$error`.red);
        process.exit(1);
    }
}

export default connectDB