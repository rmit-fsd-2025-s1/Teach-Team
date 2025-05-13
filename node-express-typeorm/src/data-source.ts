import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Application } from "./entity/Application";
import { Admins } from "./entity/Admins";
import { CourseLecturer } from "./entity/CourseLectutrers";
import { Courses } from "./entity/Courses";
import { CourseTutor } from "./entity/CourseTutors";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "username",
  password: "password",
  database: "database",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: false,
  logging: true,
  entities: [ User, Application, Admins, CourseLecturer, Courses, CourseTutor ],
  migrations: [],
  subscribers: [],
});