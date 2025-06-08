import {Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { Application } from '../entity/Application';
import { User } from "../entity/User";
import { Courses } from '../entity/Courses';
import { CourseLecturer } from '../entity/CourseLectutrers';
import { CourseTutor } from '../entity/CourseTutors';
const appRepo = AppDataSource.getRepository(Application);


//CREATE application
export const createApplication = async (req: Request, res: Response) => {
    try {
      const {
        userId,
        selectedCourse: courseCode,
        role,
        previousRoles,
        availability,
        skills,
        academicCredentials,
        comments,
        rank,
      } = req.body;

      

      const courseRepo = AppDataSource.getRepository(Courses)
      const userRepo = AppDataSource.getRepository(User);
      const appRepo = AppDataSource.getRepository(Application);

      const course = await courseRepo.findOneBy({courseCode});
      if(!course) return res.status(404).json({message: "Course not found"})
  
      const user = await userRepo.findOne({ where: { id: userId }, relations: ["applications"] });
      if (!user) return res.status(404).json({ message: "User not found" })

        const dup = await appRepo
      .createQueryBuilder("app")
      .where("app.name = :name", { name: user.name })
      .andWhere("app.email = :email", { email: user.email })
      .andWhere("app.selectedCourse = :cc", { cc: courseCode })
      .andWhere("app.role = :role", { role })
      .getOne();
    if (dup) {
      return res
        .status(400)
        .json({ message: "Application already exists for this course & role" });
    }

      const application = appRepo.create({
        name: user.name,
        email: user.email,
        selectedCourse: course,
        role,
        previousRoles,
        availability,
        skills,
        academicCredentials,
        comments,
        rank,
      });
  
      const savedApp = await appRepo.save(application);
  
      user.applications.push(savedApp);
      await userRepo.save(user);
  
      return res.status(201).json({ message: "Application submitted", application: savedApp });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to submit application", error: error });
    }
  };
//GET all applications

export const getLecturerApplications = async (req: Request, res: Response) => {
  const { search, sortBy, order, lecturerId } = req.query;

  const rawLecturerId = (lecturerId as string) || "";
  
  const qb = AppDataSource.getRepository(Application)
    .createQueryBuilder("app")
    .leftJoinAndMapOne(
      "app.selectedCourseEntity", 
      Courses,                    
      "courses",                 
      "courses.courseCode = app.selectedCourse"
    )
    .innerJoin(
      CourseLecturer,
      "cl",
      "cl.courseCode = app.selectedCourse AND cl.lecturer_id = :lecturerId",
      { lecturerId: rawLecturerId }
    );

  if (search && typeof search === "string") {
    const q = `%${search.toLowerCase()}%`;
    switch (sortBy) {
      case "name":
        qb.andWhere(`LOWER(app.name) LIKE :q`, { q });
        break;
      case "skills":
        qb.andWhere(`LOWER(app.skills) LIKE :q`, { q });
        break;
      case "availability":
        qb.andWhere(`LOWER(app.availability) LIKE :q`, { q });
        break;
      case "selectedCourse": // This maps to course name in the join
        qb.andWhere(`LOWER(courses.courseName) LIKE :q`, { q });
        break;
      default: // Fallback to broad search if no specific sortBy is provided or recognized
        qb.andWhere(
          `LOWER(app.name) LIKE :q
           OR LOWER(app.email) LIKE :q
           OR LOWER(app.skills) LIKE :q
           OR LOWER(app.availability) LIKE :q
           OR LOWER(app.role) LIKE :q
           OR LOWER(courses.courseName) LIKE :q`,
          { q }
        );
        break;
    }
  }

  const sortDirection = order === "DESC" ? "DESC" : "ASC";

  if (sortBy === "availability") {
    qb.orderBy("app.availability", sortDirection);
  } else if (sortBy && typeof sortBy === "string") {
    qb.orderBy("courses.courseName", sortDirection);
  } else {
  
    qb.orderBy("app.dateApplied", "DESC");
  }


  try {
    const applications = await qb.getMany();
    return res.json(applications);
  } catch (err) {
    console.error("Error in getLecturerApplications:", err);
    return res.status(500).json({ message: "Failed to load applications" });
  }
};

//PUT update application
export const updateApplication = async (req: Request, res: Response) => {
    const {id} = req.params;
    const updates = req.body;
    try {
       const app = await appRepo.findOneBy({id: id});
       if(!app) return res.status(404).json({message: 'Application not found'})
        Object.assign(app, updates);
        const updatedApp = await appRepo.save(app);
        res.json(updatedApp);
    } catch (error) {
        res.status(500).json({ message: "Failed to update application", error: error });
    }
}

//DELETE application
export const deleteApplication = async (req: Request, res: Response) => {
    try {
        await appRepo.delete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete application", error: error });
    }
}

// Add course tutor
export const addCourseTutor = async (req: Request, res: Response) => {
  try {
    const { userId, courseCode } = req.body;
    console.log('Adding course tutor:', { userId, courseCode });

    if (!userId || !courseCode) {
      console.log('Missing required fields:', { userId, courseCode });
      return res.status(400).json({ message: 'userId and courseCode are required' });
    }

    const courseTutorRepo = AppDataSource.getRepository(CourseTutor);
    const courseRepo = AppDataSource.getRepository(Courses);

    // Verify that the course exists
    const course = await courseRepo.findOneBy({ courseCode });
    if (!course) {
      console.log('Course not found:', courseCode);
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already exists
    const existing = await courseTutorRepo.findOne({
      where: { userId, courseCode }
    });

    if (existing) {
      console.log('Tutor already exists:', { userId, courseCode });
      return res.status(400).json({ message: "Tutor already assigned to this course" });
    }

    // Create new course tutor relationship
    const courseTutor = courseTutorRepo.create({
      userId,
      courseCode
    });

    const saved = await courseTutorRepo.save(courseTutor);
    console.log('Course tutor added successfully:', saved);
    return res.status(201).json(saved);
  } catch (error: any) {
    console.error('Error adding course tutor:', error);
    return res.status(500).json({ 
      message: "Failed to add course tutor", 
      error: error?.message || 'Unknown error occurred' 
    });
  }
};

// Remove course tutor
export const removeCourseTutor = async (req: Request, res: Response) => {
  try {
    const { userId, courseCode } = req.body;
    console.log('Removing course tutor:', { userId, courseCode });

    if (!userId || !courseCode) {
      console.log('Missing required fields:', { userId, courseCode });
      return res.status(400).json({ message: 'userId and courseCode are required' });
    }

    const courseTutorRepo = AppDataSource.getRepository(CourseTutor);

    const existing = await courseTutorRepo.findOne({
      where: { userId, courseCode }
    });

    if (!existing) {
      console.log('Course tutor not found:', { userId, courseCode });
      return res.status(404).json({ message: "Course tutor assignment not found" });
    }

    await courseTutorRepo.remove(existing);
    console.log('Course tutor removed successfully');
    return res.status(200).json({ message: "Course tutor removed successfully" });
  } catch (error: any) {
    console.error('Error removing course tutor:', error);
    return res.status(500).json({ 
      message: "Failed to remove course tutor", 
      error: error?.message || 'Unknown error occurred' 
    });
  }
};

