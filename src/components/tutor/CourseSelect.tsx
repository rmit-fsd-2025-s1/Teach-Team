import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { COURSES } from "../../types/application";

interface CourseSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CourseSelect({ value, onChange }: CourseSelectProps) {
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
        {COURSES.map((course) => (
          <option key={course.code} value={course.code}>
            {course.code} - {course.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
} 