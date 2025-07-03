// THIS FILE IS FOR BACKEND ONLY - NO REACT IMPORTS!
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
