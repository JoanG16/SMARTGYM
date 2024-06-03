// config/db.js
import sql from 'mssql';

const config = {
    user: 'mijo', // tu usuario de SQL Server
    password: '123456', // tu contraseña de SQL Server
    server: 'localhost', // la dirección de tu servidor
    database: 'gimnasio', // el nombre de tu base de datos
    options: {
        encrypt: true, // para Azure
        trustServerCertificate: true // cambiar a true para SQL Server local
    }
};



export const getConnection = async () => {
    try {
      const pool = await sql.connect(config);
      return pool;
    } catch (error) {
      console.error(error);
    }
  };

  export { sql };