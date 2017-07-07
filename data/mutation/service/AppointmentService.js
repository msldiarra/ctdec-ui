import jwt_decode from 'jwt-decode';
import request from 'then-request';
import moment from 'moment'

class AppointmentService {

    appointmentByReference(type, reference, phone, mail, city, country) {

        return request('POST',
            'http://localhost:8080/ctdec-appointment/rs/appointments',
            {json: {
                type : type,
                parameters : [{name : "RECEIPT", value : reference}],
                date : moment().format('YYYY-MM-DD'),
                contact : { phoneNumber: {number : phone},  email : [{address : mail}] },
                location : {country : {name : country, code: "ML"}, city : { name : city } },
                channel : "MAIL"
            }}
        );
    }



}

export default new AppointmentService();