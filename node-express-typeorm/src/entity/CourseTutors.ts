import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Courses } from "./Courses";

@Entity({ schema: "app", name: "course_tutor" })
export class CourseTutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  userId: number;

  @Column()
  courseCode: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Courses)
  @JoinColumn({ name: "courseCode" })
  course: Courses;
}
