interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  program: "CPE" | "ISNE";
  programId: number;
  courses?: string[];
}
export type { Student };

interface Course {
  courseId: string;
  courseTitle: string;
  instructors: string[];
}
export type { Course };

interface Enrollment {
  studentId: string;
  courseId: string;
}
export type { Enrollment };
