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

