import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

type Course = {
  courseCode: string;
  courseName: string;
  semester: string;
};

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCourses() {
      setError(null);
      const { data, error } = await supabase
        .from("courses")
        .select("courseCode, courseName, semester");

      if (error) {
        setError(error.message);
        return;
      }

      if (data) setCourses(data as Course[]);
    }
    getCourses();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Courses</h1>
      {error ? (
        <p style={{ color: "crimson" }}>
          Failed to load courses: {error}
        </p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c.courseCode}>
              {c.courseCode} — {c.courseName} ({c.semester})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
