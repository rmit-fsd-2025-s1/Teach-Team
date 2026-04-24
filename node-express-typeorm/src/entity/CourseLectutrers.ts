import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Courses} from "./Courses";

@Entity({name: "lecturer_course"})
export class CourseLecturer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: "lecturer_id", type: "int"})
  lecturer_id!: number;

  @Column({name: "courseCode", type: "varchar"})
  courseCode: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "lecturer_id" })
  user!: User;

  @ManyToOne(() => Courses)
  @JoinColumn({ name: "courseCode" })
  course!: Courses;
}
