export interface Course {
    code: string;
    name: string;
  }
  
  export interface TutorApplication {
    id: string;
    name: string;
    email: string;
    selectedCourse: string;
    role: string;
    previousRoles: string;
    availability: "part-time" | "full-time";
    skills: string;
    academicCredentials: string;
    dateApplied: string;
    isSelected: boolean;
    isUnavailable: boolean;
    comments?: string;
    rank?: string | number;
  }
  
  export interface Application {
    id: string;
    name: string;
    email: string;
    selectedCourse: string;
    role: string;
    availability: string;
    skills: string;
    previousRoles: string;
    academicCredentials: string;
    comments?: string;
    rank?: string | number;
    isSelected?: boolean;
    isUnavailable: boolean;
    selectedCourseEntity?: {
    courseCode: string;
    courseName: string;
    semester: string;
  };
  }
  
  
  
  export const COURSES: Course[] = [
    { code: "COSC2758", name: "Full Stack Development" },
    { code: "COSC1234", name: "Artificial Intelligence" },
    { code: "COSC4321", name: "Cyber Security" },
  ]; 