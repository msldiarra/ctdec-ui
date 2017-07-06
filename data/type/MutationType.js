import {  GraphQLObjectType } from 'graphql';

import RequestAppointmentByNINAMutation from '../mutation/RequestAppointmentByNINAMutation'



export default new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        requestAppointmentByNINAMutation: RequestAppointmentByNINAMutation
    })
});