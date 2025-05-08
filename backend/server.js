const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());
app.use(cors());

const serviceAccount = require("./firebase-service.json"); // Your Firebase service key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Authentication Route
app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
        const userRef = db.collection("users").doc(username);
        await userRef.set({ username });
        res.json({ success: true, username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(3001, () => console.log("Server running on port 3001"));
