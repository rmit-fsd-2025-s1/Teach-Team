import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Courses } from "../entity/Courses";

const router = Router();

router.get("/courses", async (_req, res) => {
  try {
    const courses = await AppDataSource.getRepository(Courses).find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch courses" });
  }
});

export default router;
