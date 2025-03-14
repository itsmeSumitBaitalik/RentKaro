import jwt from 'jsonwebtoken'
import { generateToken } from '../lib/generateToken.js';
import User from '../model/property.model.js'
// import 
export const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        // console.log("Authorization Header:", authHeader); // Debugging
        if (!authHeader) return res.status(401).json({ error: "Authorization header is missing" });

        const token = authHeader.split(" ")[1]; 
        console.log("Extracted Token:", token); // Debugging

        if (!token) return res.status(401).json({ error: "Access Denied" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
