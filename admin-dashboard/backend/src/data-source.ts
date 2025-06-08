import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { LecturerCourse } from "./entities/LecturerCourse";
import { Course } from "./entities/Course";
import { Application } from "./entities/Application";
import { Admin } from "./entities/Admins";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  /* Change to your own credentials */
  username: "S4091503",
  password: "S4091503",
  database: "S4091503",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: false,
  logging: true,
  entities: [User, LecturerCourse, Course, Application, Admin],
  migrations: [],
  subscribers: [],
});
