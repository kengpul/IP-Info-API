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
        password: "$2b$10$W1sWCseEcFzDBfLkLIXBh.9DF2GHsEz8Be7fFA25KXO5mTPYMR7/."
    }),
    new User({
        email: "test@test1.com",
        password: "$2b$10$ieVNlzd/W41VXbVcwTyKgOP9DXHvwtguo8KQM020NHNL2XstAJBze"
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