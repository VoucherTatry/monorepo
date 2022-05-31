import { GraphQLClient } from 'graphql-request';

import { ENDPOINT } from '../utils/constants';

export const graphqlClient = new GraphQLClient(ENDPOINT);
