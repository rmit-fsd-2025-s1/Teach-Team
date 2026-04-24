import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Application } from "./entity/Application";
import { Admins } from "./entity/Admins";
import { CourseLecturer } from "./entity/CourseLectutrers";
import { Courses } from "./entity/Courses";
import { CourseTutor } from "./entity/CourseTutors";

const isProd = process.env.NODE_ENV === "production";

const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = Number(process.env.DB_PORT ?? 5432);
const DB_USERNAME = process.env.DB_USERNAME ?? "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_NAME = process.env.DB_NAME ?? "teach_team";
const DB_SCHEMA = process.env.DB_SCHEMA ?? "app";

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
  entities: [ User, Application, Admins, CourseLecturer, Courses, CourseTutor ],
  migrations: [],
  subscribers: [],
});