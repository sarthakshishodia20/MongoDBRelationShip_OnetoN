const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(() => console.log("Connection Successful")).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemos');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});
const Order = mongoose.model("Order", orderSchema);

const customerSchema = new Schema({
    name: String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order",
    }]
});

customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer && customer.orders.length) {
        let result = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(result);
    }
});

const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
    let customer1 = new Customer({
        name: "Rahul Kumar",
    });
    let order1 = await Order.findOne({ item: "Samosa" });
    let order2 = await Order.findOne({ item: "Chips" });
    customer1.orders.push(order1);
    customer1.orders.push(order2);
    let result = await customer1.save();
    console.log(result);
};
// addCustomer();

const newCustomer = async () => {
    let newCustomer = new Customer({
        name: "karan Arjun",
    });
    let newOrder = new Order({
        item: "Pizza",
        price: 60,
    });
    newCustomer.orders.push(newOrder);

    await newOrder.save();
    await newCustomer.save();
    console.log("new Customer added");
};
// newCustomer();

const findCustomers = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};
// findCustomers();

const delCustomer = async () => {
    let data = await Customer.findByIdAndDelete("66b0c264372679a2938bf16b");
    console.log(data);
};
delCustomer();
