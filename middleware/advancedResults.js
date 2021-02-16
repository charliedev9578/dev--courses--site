import asyncHandler from './async.js';

const advancedResults = (Model , populate) =>  asyncHandler(async (req , res , next) => {
    let query;
    const removeFields = ['select' , 'page' , 'limit' , 'sort'];
    let reqQuery = { ...req.query };
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g , match => `$${match}`);
    query = Model.find(JSON.parse(queryStr));

    if(req.query.select) {
        query = query.select(req.query.select.split(',').join(' '));
    }

    if(req.query.sort) {
        query = query.sort(req.query.sort.split(',').join(' '));
    }
    else {
        query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page , 10) || 1;
    const limit = parseInt(req.query.limit , 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if(populate) {
        query = query.populate(populate)
    }

    const results = await query;

    let pagination = {};
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1 ,
            limit
        }
    }
    if(endIndex < total) {
        pagination.next = {
            page: page + 1 ,
            limit
        }
    }
    res.advancedResults = {
        success: true ,
        count: results.length ,
        pagination ,
        data: results
    }

    next();
})

export default advancedResults