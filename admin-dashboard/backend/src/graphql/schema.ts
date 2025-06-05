export const typeDefs = `

  # ENTITIES
  type User {
    id: ID!
    name: String!
    email: String!
    isLecturer: Boolean!
    isBlocked: Boolean!
  }

  type Course {
    courseCode: String!
    courseName: String!
    semester: String!
  }

  type LecturerCourseAssignment {
    id: ID!
    lecturer: User!
    course: Course!
  }


  # QUERIES
  type Query {
    adminAllLecturers: [User!]!

    adminAllCourses(semester: String): [Course!]!

    adminLecturerAssignments(lecturerId: ID!): [LecturerCourseAssignment!]!

    adminCourseAssignments(courseCode: String!): [LecturerCourseAssignment!]!

    adminAllTutors: [User!]!
  }


  # MUTATIONS

  type Mutation {
    adminAssignLecturerCourse(
      lecturerId: ID!
      courseCode: String!
    ): LecturerCourseAssignment!

    adminRemoveLecturerCourse(
      lecturerId: ID!
      courseCode: String!
    ): Boolean!

    adminCreateCourse(
      courseCode: String!
      courseName: String!
      semester: String!
    ): Course!

    adminUpdateCourse(
      courseCode: String!
      courseName: String
      semester: String
    ): Course!

    adminDeleteCourse(courseCode: String!): Boolean!


    adminBlockUser(userId: ID!): User!
    adminUnblockUser(userId: ID!): User!

    adminBlockTutor(tutorId: ID!): User!
    adminUnblockTutor(tutorId: ID!): User!
  }
`;
