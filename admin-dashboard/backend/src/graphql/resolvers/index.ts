import { adminResolvers } from "./adminResolvers";

export const resolvers = {
  Query: {
    ...adminResolvers.Query,
  },
  Mutation: {
    ...adminResolvers.Mutation,
  },

};
