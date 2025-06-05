import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable} from 'typeorm'
import { Application } from './Application'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({type: "boolean", default: false})
    isLecturer: boolean

    @Column({type: "boolean", default: false})
    isBlocked: boolean

    @Column()
    selectionCount: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => Application, {
        cascade: true,
      })
      @JoinTable({
        name: "Users_Applications", // Custom join table name
        joinColumn: { name: "userId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "applicationId", referencedColumnName: "id" },
      })
      applications: Application[];
}