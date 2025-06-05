import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Course } from "./Course";

@Entity("lecturer_course")
export class LecturerCourse {
  @PrimaryGeneratedColumn()
  id: number;              

  @Column()
  lecturer_id: number;    

  @Column()
  courseCode: string;  

  @ManyToOne(() => User, (u) => u.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "lecturer_id" })
  lecturer: User;

  @ManyToOne(() => Course, (c) => c.courseCode, { onDelete: "CASCADE" })
  @JoinColumn({ name: "courseCode" })
  course: Course;
}
