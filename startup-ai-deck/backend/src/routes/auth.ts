import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Temporary mock database. Replace this array with your actual database logic.
const users: any[] = []; 
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save user to database
        users.push({ email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Find user in database
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password against the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate an access token valid for 1 hour
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;