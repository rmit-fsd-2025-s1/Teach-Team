import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { LecturerCourse } from "./entities/LecturerCourse";
import { Course } from "./entities/Course";
import { Application } from "./entities/Application";
import { Admin } from "./entities/Admins";

const isProd = process.env.NODE_ENV === "production";

const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = Number(process.env.DB_PORT ?? 5432);
const DB_USERNAME = process.env.DB_USERNAME ?? "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_NAME = process.env.DB_NAME ?? "teach_team";
const DB_SCHEMA = process.env.DB_SCHEMA ?? "admin";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  schema: DB_SCHEMA,
  ssl:
    process.env.DB_SSL === "true" || isProd
      ? { rejectUnauthorized: false }
      : undefined,
  uuidExtension: "pgcrypto",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: false,
  logging: true,
  entities: [User, LecturerCourse, Course, Application, Admin],
  migrations: [],
  subscribers: [],
});
