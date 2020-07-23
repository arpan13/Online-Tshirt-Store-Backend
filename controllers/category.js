const Category = require("../models/category");

exports.getCategoryById = (req, res, next,id) => {

    Category.findById(id).exec((err, cate) => {
        if (err) {
            res.status(400).json({
                error: "Category not find in db"
            })
        }

        req.category = cate;
    })
    next();
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            res.status(400).json({
                error: "Not able to save category in db"
            })
        }
        res.json({
            category
        });
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)

};
exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            res.status(400).json({
                error: "No Categories found"
            })
        }
        res.json(categories);
    })

};
exports.updateCategory=(req,res) => {
    const category = req.category;

    category.name = req.body.name;

    category.save((err,updatedCategory) => {
        if (err) {
            res.status(400).json({
                error: "Falied to Update Category"
            })
        }
        res.json(updatedCategory);
    });
}

exports.removeCategory = (req,res)=>{
    const category=req.category;

    category.remove((err,category) =>{
        if (err) {
            res.status(400).json({
                error: "Not able to delete category in db"
            });
           
        }
        res.json({
            message:`Succesfully deleted ${category.name}`
        });
    });
}