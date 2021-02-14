//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
export const getBootcamps = async (req , res , next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Get all bootcamps'
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
        res.status(200).json({
            success: true,
            message: `Bootcamp with the id of ${req.params.id}`
        });
    } catch (error) {
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
        res.status(201).json({
            success: true ,
            message: 'Your bootcamp is created successfully'
        });
    } catch (error) {
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
        res.status(200).json({
            success: true ,
            message: `Bootcamp with id of ${req.params.id} is updated successfully`
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