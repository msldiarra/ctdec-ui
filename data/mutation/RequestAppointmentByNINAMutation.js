import {  GraphQLFloat, GraphQLList, GraphQLInt,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {  mutationWithClientMutationId } from 'graphql-relay';
import { DB }from '../database';
import {viewerType} from '../type/Types';
import _ from 'lodash';
import sanitize from 'sanitize-filename';
import {getViewer} from '../store/UserStore';
import AppointmentService from './service/AppointmentService'

export default mutationWithClientMutationId({
    name: 'RequestAppointmentByNINA',
    inputFields: {
        viewerId: { type: new GraphQLNonNull(GraphQLString) },
        nina: { type: new GraphQLNonNull(GraphQLString) },
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
    mutateAndGetPayload: ({viewerId, nina, phone, mail, city, country}) => {

        return AppointmentService
            .appointmentByReference('NINA', nina, phone, mail, city, country)
            .then(response => {
                if(response == true) console.log(response);
                else throw new Error();
            })
            .then(() => {
                return {
                    viewerId: viewerId
                };
            })
    }
});
