import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ schema: "app", name: "courses" })
export class Course {
  @PrimaryColumn({ name: "courseCode", type: "varchar", length: 255 })
  courseCode!: string;

  @Column({ name: "courseName", type: "varchar", length: 255 })
  courseName!: string;

  @Column({ name: "semester", type: "varchar", length: 10, default: "UNSET" })
  semester!: string;
}
