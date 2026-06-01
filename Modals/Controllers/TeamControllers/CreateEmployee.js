const User =require("../../User")
const bcrypt = require("bcryptjs")
const sendEmail = require("../../../mailer")
const jwt = require("jsonwebtoken")
const createEmployee = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            product:"teams",
            role: role || "employee"
        });

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                product: newUser.product,
                role: newUser.role
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",


        });

        res.status(201).json({ message: "User created successfully", token });
        await sendEmail( newUser.email, "Welcome to the Team!", `<h1>Welcome to the Lumona!</h1><p>Hi ${newUser.username}, your ${newUser.product} account has been created successfully. You can now log in and start collaborating with your team.</p>`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = createEmployee;