import {  GraphQLObjectType } from 'graphql';

import RequestAppointmentByNINAMutation from '../mutation/RequestAppointmentByNINAMutation'
import RequestAppointmentByReceiptMutation from '../mutation/RequestAppointmentByReceiptMutation'



export default new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        requestAppointmentByNINAMutation : RequestAppointmentByNINAMutation,
        requestAppointmentByReceiptMutation : RequestAppointmentByReceiptMutation
    })
});