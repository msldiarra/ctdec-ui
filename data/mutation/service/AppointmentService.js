import jwt_decode from 'jwt-decode';
import request from 'request';
import when from 'when';
import moment from 'moment'

class AppointmentService {

    appointmentByReference(type, reference, phone, mail, city, country) {

        return when(request({
            url:'http://localhost:8080/ctdec-appointment/rs/appointments',
            method: 'POST',
            crossOrigin: true,
            json: {
                type : type,
                parameters : [{name : "RECEIPT", value : reference}],
                date : moment().format('YYYY-MM-DD'),
                contact : { phoneNumber: {number : phone},  email : [{address : mail}] },
                location : {country : {name : country, code: "ML"}, city : { name : city } },
                channel : "MAIL"
            }
        }, (error, response, body) => {

            if(!error && response.statusCode === 200) {
                return true;
            }
            else return false;

        }))
        .then(function(response) {
            return response;
        });
    }



}

export default new AppointmentService();