import jwt_decode from 'jwt-decode';
import request from 'then-request';
import moment from 'moment'

class AppointmentService {

    appointmentByReference(type, reference, phone, mail, city, country, countryCode) {
        countryCode = countryCode || "ML";

        var today = moment().format('YYYY-MM-DD');

        return request('POST',
            'http://localhost:8080/ctdec-appointment/rs/appointments',
            {json: {
                type : type,
                parameters : [{name : type, value : reference}],
                date : today,
                status : [{status: "STARTED", "date" : today}],
                contact : { phoneNumber: {number : phone},  email : [{address : mail}] },
                location : {country : {name : country, code: countryCode}, city : { name : city } },
                channel : "MAIL"
            }}
        );
    }

    appointmentByRelativesDetails(mail, city, country, countryCode, lastName, firstName, fatherFirstName, motherFirstName, motherLastName) {
        countryCode = countryCode || "ML";

        var today = moment().format('YYYY-MM-DD');

        return request('POST',
            'http://localhost:8080/ctdec-appointment/rs/appointments',
            {json: {
                type : 'RELATIVES',
                parameters : [{name : 'lastName', value : lastName},
                    {name : 'firstName', value : firstName},
                    {name : 'fatherFirstName', value : fatherFirstName},
                    {name : 'motherFirstName', value : motherFirstName},
                    {name : 'motherLastName', value : motherLastName},
                ],
                date : today,
                status : [{status: "STARTED", "date" : today}],
                contact : { email : [{address : mail}] },
                location : {country : {name : country, code: countryCode}, city : { name : city } },
                channel : "MAIL"
            }}
        );
    }



}

export default new AppointmentService();