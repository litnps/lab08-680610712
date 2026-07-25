import express, { type Request, type Response } from "express";

// import middlewares
import morgan from "morgan";
import invalidJsonMiddleware from "./middlewares/invalidJsonMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";

// import routes
import enrollmentsRouter_v1 from "./routes/enrollmentsRouter_v1.js";
import enrollmentsRouter_v2 from "./routes/enrollmentsRouter_v2.js";

const app = express();
const port = 3000;

// body parser middleware
app.use(express.json());

// logger middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));

// JSON parser middleware
app.use(invalidJsonMiddleware);

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("lab08 API services");
});

app.use("/api/v1/enrollments", enrollmentsRouter_v1);
app.use("/api/v2/enrollments", enrollmentsRouter_v2);
app.use("/api/me", (req: Request, res: Response) =>{
  res.status(200).json({
    ok: true,
    fullName: "Lalitnapas Pasasuk",
    studentId: "680610712"
  })
});

// endpoint check middleware
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Export app for vercel deployment
export default app;
