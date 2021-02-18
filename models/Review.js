import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'Please add a title for the review'],
            maxlength: 100
        },
        text: {
            type: String,
            required: [true, 'Please add some text']
        },
        rating: {
            type: Number,
            min: 1,
            max: 10,
            required: [true, 'Please add a rating between 1 and 10']
        },
        createdAt: {
            type: Date,
            default: Date.now
        } ,
        bootcamp: {
            type: mongoose.Schema.ObjectId ,
            ref: 'Bootcamp' ,
            require: true
        } ,
        user: {
            type: mongoose.Schema.ObjectId ,
            ref: 'User' ,
            required: true
        }
    }
);

ReviewSchema.index({ bootcamp: 1 , user: 1 } , { unique: true });

ReviewSchema.statics.getAverageRating = async function(bootcampId) {
    const obj= await this.aggregate(
        [
            {
                $match: { bootcamp: bootcampId }
            } ,
            {
                $group: {
                    _id: '$bootcamp' ,
                    averageRating: { $avg: '$rating' }
                }
            }
        ]
    );
    try {
        await this.model('Bootcamp').findByIdAndUpdate(
            bootcampId ,
            {
                averageRating: obj[0].averageRating.toPrecision(2)
            }
        );
    } catch (error) {
        console.error(error);
    }
}

ReviewSchema.post('save' , async function(next) {
    await this.constructor.getAverageRating(this.bootcamp);
})

ReviewSchema.pre('remove' , async function(next) {
    await this.constructor.getAverageRating(this.bootcamp);
})

export default mongoose.model('Review' , ReviewSchema)