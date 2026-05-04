import express from 'express'
import env from 'dotenv'
import authRoutes from './src/routes/auth_routes.js'
import connectionDB from './src/config.js/db.js'



const app = express()
app.use(express.json())
env.config()

connectionDB();
const PORT = process.env.PORT || 5000;


app.use("/", authRoutes);

app.listen(PORT, () => {
        console.log(`Auth service is running on port ${PORT}`);
});