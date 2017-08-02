import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { connectionArgs, connectionFromPromisedArray, globalIdField, nodeDefinitions, fromGlobalId, connectionDefinitions} from 'graphql-relay';
import { DB, User, Places, Appointments, AppointmentProcessing }from '../database';
import { Viewer, getViewer } from '../store/UserStore';
import moment from 'moment';


export const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {

        let {type, id} = fromGlobalId(globalId);

        console.log("globalId of " + type + " : " + globalId)
        console.log("id of " + type + " : " + id)

        if (type === 'User') { return DB.models.user.findOne({where: {id: id}}); }
        if (type === 'Places') { return DB.models.places.findOne({where: {id: id}}); }
        if (type === 'Appointments') { return DB.models.appointments.findOne({where: {id: id}}); }
        if (type === 'AppointmentProcessing') { return DB.models.appointment_processing.findOne({where: {id: id}}); }
        if (type === 'Viewer') { return getViewer(id)}
        else { return null; }
    },
    (obj) => {

        console.log("in interface obj: " + JSON.stringify(obj))

        
        if (obj instanceof User.Instance) { return userType; }
        else if (obj instanceof Places.Instance) { return placeType; }
        else if (obj instanceof Appointments.Instance) { return appointmentType; }
        else if (obj instanceof AppointmentProcessing.Instance) { return appointmentProcessingType; }
        else if (obj.id.startsWith('me')) { return viewerType; }
        else {
            return null;
        }
    }
);

export const placeType = new GraphQLObjectType({
    name: 'Location',
    fields: () => {
        return {
            id: globalIdField('Place'),
            country: { type: GraphQLString, resolve(place) { return place.country } },
            city: { type: GraphQLString, resolve(place) { return place.city } },
            code: { type: GraphQLString, resolve(place) { return place.code } },
            searchTerms: { type: GraphQLString, resolve(place) { return place.searchTerms } },
        }
    },
    interfaces: () => [nodeInterface]
});


export const appointmentType = new GraphQLObjectType({
    name: 'Appointment',
    fields: () => {
        return {
            id: globalIdField('Appointment'),
            number: { type: GraphQLString, resolve(appointment) { return appointment.number } },
            date: { type: GraphQLMoment, resolve(appointment) { return GraphQLMoment.serialize(appointment.date)} },
            status: { type: GraphQLString, resolve(appointment) { return appointment.status } },
            location: { type: GraphQLString, resolve(appointment) { return appointment.location } },
            receipt: { type: GraphQLString, resolve(appointment) { return appointment.receipt } },
            nina: { type: GraphQLString, resolve(appointment) { return appointment.nina } },
            firstName: { type: GraphQLString, resolve(appointment) { return appointment.firstname } },
            lastName: { type: GraphQLString, resolve(appointment) { return appointment.lastname } },
            fatherFirstName: { type: GraphQLString, resolve(appointment) { return appointment.fatherfirstname } },
            motherFirstName: { type: GraphQLString, resolve(appointment) { return appointment.motherfirstname } },
            motherLastName: { type: GraphQLString, resolve(appointment) { return appointment.motherlastname } },
            processingHistory : {
                type: appointmentProcessingConnection,
                description: "List of appointment processing",
                args: connectionArgs,
                resolve: (appointment, args) => {
                    return connectionFromPromisedArray(DB.models.appointment_processing.findAll({
                        where: {appointment_number: {$eq: appointment.number} },
                        order: [['"id"', 'DESC']]
                    }), args)
                }
        },
        }
    },
    interfaces: () => [nodeInterface]
});

export const appointmentProcessingType = new GraphQLObjectType({
    name: 'appointmentProcessing',
    fields: () => {
        return {
            id: globalIdField('AppointmentProcessing'),
            number : { type: GraphQLString, resolve(appointmentProcessing) { return appointmentProcessing.number } },
            start_date : { type: GraphQLMoment, resolve(appointmentProcessing) { return GraphQLMoment.serialize(appointmentProcessing.start_date)} },
            end_date : { type: GraphQLMoment, resolve(appointmentProcessing) { return
                if(appointmentProcessing.end_date) {
                    GraphQLMoment.serialize(appointmentProcessing.end_date)
                } else {
                    null;
                }
            }},
            user : { type: userType, resolve(appointmentProcessing) { return DB.models.user.findOne({where: {id: {$eq: appointmentProcessing.user_id} }}) }
        }}
    },
    interfaces: () => [nodeInterface]
});

export const GraphQLMoment = new GraphQLScalarType({
    name: 'Date',
    serialize: function (value) {
        let date = moment(value);
        if(!date.isValid()) {
            throw new GraphQLError('Field serialize error: value is an invalid Date');
        }
        return date.format();
    },
    parseValue: function (value) {
        let date = moment(value);
        if(!date.isValid()) {
            throw new GraphQLError('Field parse error: value is an invalid Date');
        }
        return date;
    },

    parseLiteral: (ast) => {
        if(ast.kind !== Kind.STRING) {
            throw new GraphQLError('Query error: Can only parse strings to date but got: ' + ast.kind);
        }
        let date = moment(ast.value);
        if(!date.isValid()) {
            throw new GraphQLError('Query error: Invalid date');
        }
        return date;
    }
});

export const userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user credentials',
    fields: () => {
        return {
            id: globalIdField('UserType'),
            firstName: { type: GraphQLString, resolve: (obj) => obj.first_name },
            lastName: { type: GraphQLString, resolve: (obj) => obj.last_name },
            login: { type: GraphQLString, resolve: (obj) => obj.login },
            email: { type: GraphQLString, resolve: (obj) => obj.email },
            enabled: { type: GraphQLBoolean, resolve: (obj) => obj.enabled },
            appointments : {
            type: appointmentConnection,
                description: "List of available locations",
                args: {
            ...connectionArgs,
                    status: {
                    name: 'status',
                        type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => {
                var term = args.status? args.status : 'PLANNED';
                return connectionFromPromisedArray(DB.models.appointments.findAll({
                    where: {status: {$like: term} },
                    order: '"id"'
                }), args)
            }
        },
        }
    },
    interfaces: [nodeInterface]
});

export const viewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'Application viewer',
    fields: () => {
        return {
            id: globalIdField('Viewer'),
            user: { type:  userType, resolve: (obj) => {
                if(obj.userId) return DB.models.user.findOne({where: {id: obj.userId}})
            } },
            places: {
                type: placeConnection,
                description: "List of available locations",
                args: {
                    ...connectionArgs,
                    search: {
                        name: 'search',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (_, args) => {
                    var term = args.search? args.search + '%' : '';
                    return connectionFromPromisedArray(DB.models.places.findAll({
                        where: {search_terms: {$like: term} },
                        order: '"city"'
                    }), args)
                }
            }
        }
    },
    interfaces: [nodeInterface]
});


export const {connectionType: placeConnection} =
    connectionDefinitions({
        name: 'Places',
        nodeType: placeType
    });

export const {connectionType: appointmentConnection} =
    connectionDefinitions({
        name: 'Appointments',
        nodeType: appointmentType
    });

export const {connectionType: appointmentProcessingConnection} =
    connectionDefinitions({
        name: 'AppointmentProcessing',
        nodeType: appointmentProcessingType
    });



