import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity({ schema: "app", name: "courses" })
export class Courses{
    @PrimaryColumn()
    courseCode: string;

    @Column()
    courseName: string;

    @Column()
    semester: string;

}
