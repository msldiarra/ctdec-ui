import Sequelize from 'sequelize';

export const DB = new Sequelize(
    'ctdec',
    'postgres',
    '1234',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
);


export const Places = DB.define('places', {
        country: Sequelize.STRING,
        city: Sequelize.STRING,
        code: Sequelize.STRING,
        search_terms: Sequelize.STRING
    } , {timestamps: false, freezeTableName: true}
);

export const Appointments = DB.define('appointments', {
        number: Sequelize.STRING,
        date: Sequelize.DATE,
        status: Sequelize.STRING,
        location: Sequelize.STRING,
        receipt: Sequelize.STRING,
        nina: Sequelize.STRING,
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        fatherfirstname: Sequelize.STRING,
        motherfirstname: Sequelize.STRING,
        motherlastname: Sequelize.STRING
    } , {timestamps: false, freezeTableName: true}
);

/*
 * User view for UI display need
 * */
export const User = DB.define('user', {
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      login: Sequelize.STRING,
      password: Sequelize.STRING,
      enabled: Sequelize.BOOLEAN,
    } , {timestamps: false, tableName: 'users'}
);

export const User_Appointment = DB.define('user_appointment', {
        appointment_number: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
    } , {timestamps: false, tableName: 'user_appointment'}
);

export const User_Appointment_End_Date = DB.define('user_appointment_end_date', {
        user_appointment_id: Sequelize.INTEGER,
        end_date: Sequelize.DATE,
    } , {timestamps: false, tableName: 'user_appointment_end_date'}
);


export const AppointmentProcessing = DB.define('appointment_processing', {
        appointment_number: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE
    } , {timestamps: false, tableName: 'appointmentprocessing'}
);



DB.sync({force: false});

