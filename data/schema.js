import { GraphQLSchema } from 'graphql';

import queryType from './type/QueryType'


export const Schema =  new GraphQLSchema({
  query: queryType
});
