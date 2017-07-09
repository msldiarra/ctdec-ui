import {  GraphQLFloat, GraphQLList, GraphQLInt,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {  mutationWithClientMutationId } from 'graphql-relay';
import { DB }from '../database';
import {viewerType} from '../type/Types';
import _ from 'lodash';
import sanitize from 'sanitize-filename';
import {getViewer} from '../store/UserStore';
import AppointmentService from './service/AppointmentService'

export default mutationWithClientMutationId({
    name: 'RequestAppointmentByReceipt',
    inputFields: {
        viewerId: { type: new GraphQLNonNull(GraphQLString) },
        reference: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        mail: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
    },
    outputFields: {
        viewer: {
            type: viewerType,
            resolve: ({viewerId}) => getViewer(viewerId),
        }
    },
    mutateAndGetPayload: ({viewerId, reference, phone, mail, city, country}) => {

        return AppointmentService
            .appointmentByReference('RECEIPT', reference, phone, mail, city, country)
            .then(response => {

                if(response.statusCode != 200)  throw new Error();
            })
            .then(() => {
                return {
                    viewerId: viewerId
                };
            })
    }
});
