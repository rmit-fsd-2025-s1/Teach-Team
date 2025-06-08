// was made to export and combine all GraphQL resolvers into a single object for Apollo Server
import { adminQueries } from "./queries/adminQueries";
import { statisticsQueries } from "./queries/statisticsQueries";
import { courseMutations } from "./mutations/courseMutations";
import { userMutations } from "./mutations/userMutations";
import { applicationMutations } from "./mutations/applicationMutations";
import { lecturerCourseMutations } from "./mutations/lecturerCourseMutations";

export const resolvers = {
  Query: {
    ...adminQueries,
    ...statisticsQueries,
  },
  Mutation: {
    ...courseMutations,
    ...userMutations,
    ...applicationMutations,
    ...lecturerCourseMutations,
  },
};
