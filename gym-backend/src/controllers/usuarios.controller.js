import { getConnection, sql } from '../db.js';

export const getUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM sys.database_principals where type_desc = 'SQL_USER';");
        return res.json(result.recordset)
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}

export const getUsuarioId = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input("nami", sql.VarChar, req.params.name)
            .query("SELECT * FROM sys.database_principals WHERE name = @nami");

        return res.json(result.recordset);
    } catch (err) {
        console.error("Error al obtener el usuario:", err);
        return res.status(500).json({ error: "Error al obtener el usuario" });
    }
}




//  export const createUsuario = async (req, res) => {
//      const {
//          user,
//          password
//      } = req.body
//      const [rows] = await pool.query("EXEC CrearNuevoUsuario @nombre_usuario = 'usuarionuevo', @contrasena = 'admin';"),[usuarionuevo, contrasena])
//      res.send({
//          us,
//          contraseña
//      })
//  }

 export const createUsuario = async (req, res) => {
    const {
        name,
        password
    } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("nombre_usuario", sql.VarChar, name)
        .input("contrasena", sql.VarChar, password)
        .query("EXEC CrearNuevoUsuario @nombre_usuario, @contrasena");

    res.json({
        name,
        password
    })
}

export const updateUsuario = async (req, res) => {
    const { name } = req.params;
    const { name: nuevo_usuario, password } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("name", sql.VarChar, name)
            .input("nuevo_usuario", sql.VarChar, nuevo_usuario)
            .input("password", sql.VarChar, password)
            .query("EXEC ActualizarUsuarioYContrasena @name, @nuevo_usuario, @password");

        res.json({
            message: 'Usuario actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};




export const deleteUsuario = async (req, res) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input("nombre_usuario", sql.VarChar, req.params.name)
            .query("EXEC EliminarUsuarioYLogin @nombre_usuario");

        res.sendStatus(204); // No Content
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};



// //#####################################roles ##################################################################
export const getRoles = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT name, type_desc FROM sys.database_principals WHERE type = 'R';");
        return res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};




export const createRol = async (req, res) => {
    const { name } = req.body;

    try {
        // Insertar el nuevo rol en la base de datos
        const pool = await getConnection();
        const result = await pool.request()
            .input("nombre_rol", sql.VarChar, name)
            .query(`CREATE ROLE ${name}`);

        // Verificar si se insertó correctamente
        
            // Enviar una respuesta al cliente indicando éxito
            res.status(201).json({
                success: true,
                message: `Rol ${name} creado exitosamente`,
                data: {
                    name
                }
            });
        
    } catch (error) {
        // En caso de error, enviar un mensaje de error al cliente
        console.error('Error al crear el rol:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al crear el rol'
        });
    }
};



export const asignarRol = async (req, res) => {
    const { user, roles } = req.body;

    try {
               
        // Validar que los datos estén presentes
      
        const pool = await getConnection();

        // Construir la consulta dinámica
        const query = `ALTER ROLE [${roles}] ADD MEMBER [${user}]`;

        console.log('Ejecutando consulta:', query);  // Log para depuración

        await pool.request().query(query);
        
        res.status(200).json({ message: 'Rol asignado con éxito' });
    } catch (error) {
        console.error('Error al asignar rol:', error);
        res.status(500).json({ message: 'Error al asignar rol', error });
    }
}


export const deleteRol = async (req, res) => {
    const { name } = req.params; // Obtener el nombre del rol de los parámetros de la URL

    try {
        const pool = await getConnection();
        await pool.request()
            .input("nombre_rol", sql.VarChar, name)
            .query(`DROP ROLE ${name}`);

        res.sendStatus(204); // No Content
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el rol' });
    }
};

// export const createRol = async (req, res) => {
//     const { name } = req.body;

//     try {
//         // Insertar el nuevo rol en la base de datos
//         const pool = await getConnection();
//         const result = await pool.request()
//             .input("nombre_rol", sql.VarChar, name)
//             .query(CREATE ROLE ${name});

//            // Enviar una respuesta al cliente indicando éxito
//             res.status(201).json({
//                 success: true,
//                 message: Rol ${name} creado exitosamente,
//                 data: {
//                     name
//                 }
//             });
//     } catch (error) {
//         // En caso de error, enviar un mensaje de error al cliente
//         console.error('Error al crear el rol:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error interno del servidor al crear el rol'
//         });
//     }
// };

