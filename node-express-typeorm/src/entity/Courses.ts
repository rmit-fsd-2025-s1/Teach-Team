import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Courses{
    @PrimaryColumn()
    courseCode: string;

    @Column()
    courseName: string;

}
