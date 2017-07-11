import {  GraphQLFloat, GraphQLList, GraphQLInt,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {  mutationWithClientMutationId } from 'graphql-relay';
import { DB }from '../database';
import {viewerType} from '../type/Types';
import _ from 'lodash';
import sanitize from 'sanitize-filename';
import {getViewer} from '../store/UserStore';
import AppointmentService from './service/AppointmentService'

export default mutationWithClientMutationId({
    name: 'RequestAppointmentByDefault',
    inputFields: {
        viewerId: { type: new GraphQLNonNull(GraphQLString) },
        mail: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        countryCode: { type: GraphQLString },
        lastName: { type: GraphQLString },
        firstName: { type: GraphQLString },
        fatherFirstName: { type: GraphQLString },
        motherFirstName: { type: GraphQLString },
        motherLastName: { type: GraphQLString }
    },
    outputFields: {
        viewer: {
            type: viewerType,
            resolve: ({viewerId}) => getViewer(viewerId),
        }
    },
    mutateAndGetPayload: ({viewerId, mail, city, country, countryCode, lastName, firstName, fatherFirstName, motherFirstName, motherLastName}) => {
        countryCode = countryCode || "ML";
        return AppointmentService
            .appointmentByRelativesDetails(mail, city, country, countryCode, lastName, firstName, fatherFirstName, motherFirstName, motherLastName)
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
