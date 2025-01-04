import express from "express"
import cookieParser from "cookie-parser"
import { validateToken } from "./src/middlewares/validateToken.js"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',  // Update this with your frontend's origin
    credentials: true,  // Allow sending cookies
}));


// import routes
import authRoutes from './src/routes/auth.routes.js'
import userRoutes from './src/routes/user.route.js'
import notesRoutes from './src/routes/notes.routes.js'


app.get('/tokens', (req, res) => {
    res.json({ "tokens": req.cookies })
})


// server the routes
app.use('/api/auth', authRoutes)
app.use('/api/user', validateToken, userRoutes)
app.use('/api/notes', validateToken, notesRoutes)



// listen to the PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})