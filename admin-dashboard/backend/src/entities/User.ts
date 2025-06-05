import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { LecturerCourse } from "./LecturerCourse";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "name", type: "varchar", length: 100 })
  name!: string;

  @Column({ name: "email", type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ name: "password", type: "varchar", length: 255 })
  password!: string;

  @Column({ name: "isLecturer", type: "tinyint", width: 1, default: 0 })
  isLecturer!: boolean;

  @Column({ name: "isBlocked", type: "tinyint", width: 1, default: 0 })
  isBlocked!: boolean;

  @OneToMany(
    () => LecturerCourse,
    (assignment) => assignment.lecturer
  )
  lecturerCourses?: LecturerCourse[];
}
