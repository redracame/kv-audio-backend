import statuses from "statuses";
import User from "../moduless/user.js"; // Ensure this path is correct
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export function registerUser(req, res) {
    const data = req.body; // Correct variable name is `data`, not `date`
    
    // Hash the password
    data.password = bcrypt.hashSync(data.password, 10);
//#
    // Create a new User instance
    const newUser = new User(data); // Use `data`, not `date`

    // Save the user to the database
    newUser.save()
        .then(() => {
            res.status(201).json({ message: "User registered successfully" });
        })
        .catch((error) => {
            console.error("Error saving user:", error); // Log error for debugging
            res.status(500).json({ error: "User registration failed" });
        });
}

export function loginUser(req, res) {
    const data = req.body;

    if (!data.email || !data.password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    User.findOne({ email: data.email })
        .then((user) => {
            if (!user) {
                console.error("User not found for email:", data.email);
                return res.status(404).json({ error: "User not found" });
            }

            console.log("User found:", user);

            const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
            console.log("Plain password:", data.password);
            console.log("Hashed password:", user.password);
            console.log("Password comparison result:", isPasswordCorrect);

            if (isPasswordCorrect) {
                const token = jwt.sign(
                    {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        profilePicture : user.profilePicture
                    },
                   process.env.JWT__SECRET
                );
                console.log("JWT generated:", token);
                res.json({ message: "Login successful", token });
            } else {
                console.error("Incorrect password for email:", data.email);
                res.status(401).json({ error: "Login failed" });
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        });
}
