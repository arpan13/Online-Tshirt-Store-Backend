const {Order,ProductCart}=require("../models/order");
const order = require("../models/order");

exports.getOrderById=(req,res)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if (err) {
            return res.status(400).json({
                error: "Order not find"
            });
        }
        req.order=order;
        next();
    })
}

exports.createOrder=(req,res)=>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order)=>{
        if (err) {
            return res.status(400).json({
                error: "Failed to save your order in db"
            });
        }
        res.json(order);
    })
}
exports.getAllOrders=(req,res)=>{
    Order.find().populate("user","_id name").exec((err,order)=>{
        if (err) {
            return res.status(400).json({
                error: "No Orders found in db"
            });
        }
        res.json(order);
    })
}
exports.getOrderStatus=(req,res)=>{
   res.json(Order.schema.path("status").enumValues);
}







exports.updateStatus=(req,res)=>{
    Order.update({_id:req.body.order._id},{$set:{status:req.body.status}},(err,order)=>{
        if (err) {
            return res.status(400).json({
                error: "Cannot order status"
            });
        }
        res.json(order);
    })
}