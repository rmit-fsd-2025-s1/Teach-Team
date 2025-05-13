import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  courseCode: string;
  courseName: string;
}

interface CourseSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CourseSelect({ value, onChange }: CourseSelectProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get<Course[]>("/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <FormControl mb={4}>
      <FormLabel color="white">Select a Course</FormLabel>
      <Select
        name="selectedCourse"
        value={value}
        onChange={onChange}
        color="white"
        bg="black"
        sx={{
          option: {
            background: "black",
            color: "white",
          },
        }}
        required
      >
        <option value="">Select a Course</option>
        {courses.map((course) => (
          <option key={course.courseCode} value={course.courseCode}>
            {course.courseCode} - {course.courseName}
          </option>
        ))}
      </Select>
    </FormControl>
  );
} 