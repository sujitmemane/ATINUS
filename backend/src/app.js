import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.get("/", (req, res) => {
  return res.end("Threads");
});

export default app;
