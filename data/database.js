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


DB.sync({force: false});

