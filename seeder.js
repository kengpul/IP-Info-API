const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = mongoose.model("User", userSchema);

const users = [
    {
        email: "test@test.com",
        password: "test"
    },
    {
        email: "test1@test.com",
        password: "test1"
    },
    {
        email: "test2@test.com",
        password: "test2"
    },
    {
        email: "test3@test.com",
        password: "test3"
    },
    {
        email: "test4@test.com",
        password: "test4"
    },
    {
        email: "test5@test.com",
        password: "test5"
    },
]

const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/ipinfo";
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to database");
});

const creatUser = async () => {
    console.log("Creating users...");
    for(const user of users.values()){
        const existEmail = await User.findOne({email: user.email});
        if(existEmail) continue;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const newUser = new User({ email: user.email, password: hash });

        console.log("Creating user email: ", user.email);
        await newUser.save();
    }

    mongoose.disconnect();
    console.log("Done creating users!");
}

creatUser().catch(err => console.log("Error creating users: ", err))