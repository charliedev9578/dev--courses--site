import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
            ],
        },
        role: {
            type: String,
            enum: ['user', 'publisher'],
            default: 'user',
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        confirmEmailToken: String,
        isEmailConfirmed: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

UserSchema.pre('save' , async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
});

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id } , process.env.JWT_SECRETE , {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UserSchema.methods.matchUserPassword = async function(userPassword) {
    return await bcrypt.compare(userPassword , this.password); 
}

export default mongoose.model('User' , UserSchema);