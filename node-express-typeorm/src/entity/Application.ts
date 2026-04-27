import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, ManyToOne, JoinColumn} from 'typeorm';

import { User } from './User';
import { Courses } from './Courses';

export type Availability = "part-time" | "full-time";

@Entity({ schema: "app", name: "application" })
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Courses)
  @JoinColumn({ name: "selectedCourse", referencedColumnName: "courseCode" })// uses `selectedCourse` column name in DB
  selectedCourse: Courses;

  @Column()
  role: string;

  @Column()
  previousRoles: string;

  @Column({
    type: "enum",
    enum: ["part-time", "full-time"],
  })
  availability: Availability;

  @Column()
  skills: string;

  @Column()
  academicCredentials: string;

  @CreateDateColumn()
  dateApplied: Date;

  @Column({ default: false })
  isSelected: boolean;

  @Column({ default: false })
  isUnavailable: boolean;

  @Column({ type: "text", nullable: true })
  comments?: string;

  @Column({ nullable: true })
  rank?: number;

  @ManyToMany(() => User, (user) => user.applications)
  users: User[];
}