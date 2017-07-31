import {  GraphQLObjectType } from 'graphql';

import RequestAppointmentByNINAMutation from '../mutation/RequestAppointmentByNINAMutation'
import RequestAppointmentByReceiptMutation from '../mutation/RequestAppointmentByReceiptMutation'
import RequestAppointmentByDefaultMutation from '../mutation/RequestAppointmentByDefaultMutation'
import AssignAppointmentToUserMutation from '../mutation/AssignAppointmentToUserMutation'



export default new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        requestAppointmentByNINAMutation : RequestAppointmentByNINAMutation,
        requestAppointmentByReceiptMutation : RequestAppointmentByReceiptMutation,
        requestAppointmentByDefaultMutation : RequestAppointmentByDefaultMutation,
        assignAppointmentToUserMutation : AssignAppointmentToUserMutation
    })
});