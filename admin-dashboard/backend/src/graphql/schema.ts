export const typeDefs = `

  # ENTITIES
  type User {
    id: ID!
    name: String!
    email: String!
    isLecturer: Boolean!
    isBlocked: Boolean!
    selectionCount: Int!
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

  type Application {
    id: ID!
    name: String!
    email: String!
    selectedCourse: String!
    role: String!
    previousRoles: String!
    availability: String!
    skills: String!
    academicCredentials: String!
    isUnavailable: Boolean!
  }

  type Admin {
  id: ID!
  email: String!
  password: String!
  }


  # QUERIES
  type Query {
    adminAllLecturers: [User!]!

    adminAllCourses(semester: String): [Course!]!

    adminLecturerAssignments(lecturerId: ID!): [LecturerCourseAssignment!]!

    adminCourseAssignments(courseCode: String!): [LecturerCourseAssignment!]!

    adminAllTutors: [User!]!

    adminAllApplications: [Application!]!

    # Statistical reports
    chosenCandidates: [User!]!
    popularCandidates: [User!]!
    candidatesYetToBegin: [User!]!
  }


  # MUTATIONS

  type Mutation {
  loginAdmin(email: String!, password: String!): Boolean!
  }

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

    setApplicantUnavailable(applicationId: ID!): Application!
    setApplicantAvailable(applicationId: ID!): Application!
  }
`;
