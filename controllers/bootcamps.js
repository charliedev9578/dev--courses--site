import Bootcamp from '../models/Bootcamp.js';

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
export const getBootcamps = async (req , res , next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: 'Server error'
        });
    }
}

//@desc     Get single Bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
export const getBootcampById = async (req , res , next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return res.status(404).json({
                success: false ,
                message: `There is no bootcamp with id of ${req.params.id}`
            });
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false ,
            message: `There is no bootcamp with id of ${req.params.id}`
        });
    }
}

//@desc     Create a new Bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
export const createNewBootcamp = async (req , res , next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true ,
            message: 'Your bootcamp is created successfully' ,
            data: bootcamp
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false ,
            message: 'Invalid input'
        })
    }
}

//@desc     Update a Bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
export const updateBootcampById = async (req , res , next) => {
    try {
        let bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return res.status(404).json({
                success: false ,
                message: `There is no bootcamp with id of ${req.params.id}`
            });
        }
        bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id , req.body , {
            new: true ,
            runValidators: true
        });
        res.status(200).json({
            success: true ,
            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `There is no bootcamp with id of ${req.params.id}`
        })
    }
}

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
export const deleteBootcampById = async (req , res , next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return res.status(404).json({
                success: false ,
                message: `There is no bootcamp with id ${req.params.id}`
            });
        }
        await bootcamp.remove();
        res.status(200).json({
            success: true ,
            message: `Bootcamp with id of ${req.params.id} is deleted successfully`
        })
    } catch (error) {
        res.status(400).json({
            success: false ,
            message: `There is no bootcamp with id of ${req.params.id}`
        })
    }
}