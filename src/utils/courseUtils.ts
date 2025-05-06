import { COURSES } from '../types/application';

export const getCourseName = (courseCode: string): string => {
  const course = COURSES.find((c) => c.code === courseCode);
  return course ? course.name : courseCode;
}; 