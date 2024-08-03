const mongoose = require("mongoose")

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
    new User({
        email: "test@test.com",
        password: "$2b$10$8wfm/NvUbfVMEoGPxVYHVOc/luN7.RM5ENdT/fnNMyUcJ0HYxI.U."
    }),
    new User({
        email: "test@test1.com",
        password: "$2b$10$zvxd/cNGclurX.uJoB48JuBuIF5QbmEqh.3q7aH8gzlDJYDIA2RgG"
    }),
    new User({
        email: "test@test2.com",
        password: "$2b$10$LRllz0dmV41xOtDE/bzNgefV8GgrJbrHIoOeiQ8yTrMPX2jx9iAPy"
    }),
    new User({
        email: "test@test2.com",
        password: "$$2b$10$4SCepaxl7UCIoNhr2CHPAuAp.ZM2jvFR6/72/PkgZqE/lYxtihRPC"
    })
]

const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/ipinfo";
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to database...");
});

users.map(async (user, index) => {
    await user.save()
        .then(() => {
            if (index === users.length - 1) {
                console.log("Done!");
                mongoose.disconnect()
            }
        })
})