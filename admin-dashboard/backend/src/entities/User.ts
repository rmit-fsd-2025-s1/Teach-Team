import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { LecturerCourse } from "./LecturerCourse";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "name", type: "varchar", length: 100 })
  name!: string;

  @Column({ name: "email", type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ name: "password", type: "varchar", length: 255 })
  password!: string;

  @Column({ name: "isLecturer", type: "boolean", default: false })
  isLecturer!: boolean;

  @Column({ name: "isBlocked", type: "boolean", default: false })
  isBlocked!: boolean;

  @Column({ name: "selectionCount", type: "int", default: 0 })
  selectionCount!: number;

  @OneToMany(
    () => LecturerCourse,
    (assignment) => assignment.lecturer
  )
  lecturerCourses?: LecturerCourse[];
}
