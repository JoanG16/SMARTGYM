CREATE DATABASE IF NOT EXISTS gymdb;

USE gymdb;


-- TABLA MIEMBROS
CREATE TABLE miembros (
    idmiembro BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	matricula VARCHAR(50) NOT NULL,
	nombre VARCHAR(45) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
	direccion VARCHAR(255) NOT NULL,
	edad TINYINT NOT NULL,
	sufreEnfermedad BOOLEAN,
	tieneSeguro BOOLEAN,
	enfermedad VARCHAR(45),
	institucion VARCHAR(45),
	nombreContacto VARCHAR(45) NOT NULL,
	telefonoContacto VARCHAR(20) NOT NULL,
	imagen VARCHAR(255),
	estado ENUM("ACTIVO", "VENCIDO"),
	fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);



-- TABLA MEMBRESIAS
CREATE TABLE membresias(
	idmembresia BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	duracion SMALLINT NOT NULL,
	precio DECIMAL (5,2) NOT NULL
);



-- TABLA MEMBRESIA_MIEMBRO
CREATE TABLE membresia_miembro (
    idmembresia_miembro BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idmiembro BIGINT UNSIGNED NOT NULL,
    idmembresia BIGINT UNSIGNED NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    estado ENUM("ACTIVO", "VENCIDO"),
    FOREIGN KEY (idmiembro) REFERENCES miembros(idmiembro),
    FOREIGN KEY (idmembresia) REFERENCES membresias(idmembresia)
);



-- TABLA PAGOS
CREATE TABLE pagos (
    idpago BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idmembresia_miembro BIGINT UNSIGNED NOT NULL,
    fecha DATETIME NOT NULL,
    monto DECIMAL(8, 2) NOT NULL,
    FOREIGN KEY (idmembresia_miembro) REFERENCES membresia_miembro(idmembresia_miembro)
);



-- TABLA VISITA
CREATE TABLE visita (
    idvisita BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nombre_visita VARCHAR(255),
    precio DECIMAL(8, 2),
    idmembresia_miembro BIGINT UNSIGNED,
    FOREIGN KEY (idmembresia_miembro) REFERENCES membresia_miembro(idmembresia_miembro)
);



-- TABLA JORNADA_LABORAL
CREATE TABLE jornada_laboral (
    idjornada_laboral BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    hora_ingreso TIME NOT NULL,
    hora_salida TIME NOT NULL
);



-- TABLA EMPLEADOS
CREATE TABLE empleados (
    idempleado BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    idjornada_laboral BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (idjornada_laboral) REFERENCES jornada_laboral(idjornada_laboral)
);



-- TABLA ASISTENCIA_EMPLEADO
CREATE TABLE asistencia_empleado (
    idasistencia_empleado BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idempleado BIGINT UNSIGNED NOT NULL,
    fecha_hora_ingreso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_hora_fin DATETIME,
    FOREIGN KEY (idempleado) REFERENCES empleados(idempleado)
);



-- TABLA CONFIGURACION
CREATE TABLE configuracion (
    idConfiguracion INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreGym VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    direccion VARCHAR(255),
    descripcion TEXT,
    usuario_cambio VARCHAR(255),
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- TABLA CATEGORIA_PRODUCTOS
CREATE TABLE categoria_productos (
    idcategoria INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);


-- TABLA PRODUCTOS
CREATE TABLE producto (
    idproducto INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    precio DECIMAL(10, 2) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    idcategoria INT UNSIGNED,
    FOREIGN KEY (idcategoria) REFERENCES categoria_productos(idcategoria)
);



-- TABLA STOCK
CREATE TABLE stock (
    idstock INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idproducto INT UNSIGNED NOT NULL,
    cantidad INT UNSIGNED NOT NULL DEFAULT 0,
    FOREIGN KEY (idproducto) REFERENCES producto(idproducto)
);



-- TABLA VENTA
CREATE TABLE venta (
    idventa BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    total DECIMAL(10, 2) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idmiembro BIGINT UNSIGNED,
    idempleado BIGINT UNSIGNED,
    FOREIGN KEY (idmiembro) REFERENCES miembros(idmiembro),
    FOREIGN KEY (idempleado) REFERENCES empleados(idempleado)
);



-- TABLA DETALLE_VENTA
CREATE TABLE detalle_venta (
    iddetalle_venta BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idventa BIGINT UNSIGNED NOT NULL,
    idproducto INT UNSIGNED NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idventa) REFERENCES venta(idventa),
    FOREIGN KEY (idproducto) REFERENCES producto(idproducto)
);



-- TABLA PROVEEDORES
CREATE TABLE proveedores (
    idproveedor BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_compania VARCHAR(255) NOT NULL,
    nombre_contacto VARCHAR(255) NOT NULL,
    cargo_contacto VARCHAR(255),
    direccion VARCHAR(255),
    telefono_contacto VARCHAR(20)
);



-- TABLA COMPRA
CREATE TABLE compra (
    idcompra BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    total DECIMAL(10, 2),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    idempleado BIGINT UNSIGNED,
    idproveedor BIGINT UNSIGNED,
    FOREIGN KEY (idempleado) REFERENCES empleados(idempleado),
    FOREIGN KEY (idproveedor) REFERENCES proveedores(idproveedor)
);



-- TABLA DETALLE_COMPRA
CREATE TABLE detalle_compra (
    iddetalle_compra BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idcompra BIGINT UNSIGNED,
    idproducto INT UNSIGNED,
    cantidad INT,
    costo_unitario DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (idcompra) REFERENCES compra(idcompra),
    FOREIGN KEY (idproducto) REFERENCES producto(idproducto)
);



-- TABLA TIPO_EQUIPO
CREATE TABLE tipo_equipo (
    idtipo_equipo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);



-- TABLA EQUIPOS
CREATE TABLE equipos (
    idequipo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    idtipo_equipo BIGINT UNSIGNED,
    idproveedor BIGINT UNSIGNED,
    FOREIGN KEY (idtipo_equipo) REFERENCES tipo_equipo(idtipo_equipo),
    FOREIGN KEY (idproveedor) REFERENCES proveedores(idproveedor)
);

-- TABLA ROLES (ESTA TABLA LA USÉ YO PARA MANEJAR LOS PRIVILEGIOS EN MYSQL YA QUE COMO TAL NO EXISTEN LOS ROLES EN ESTE GESTOR)
-- ESTO VA A VARIAS DEPENDIENDO DE TU GESTOR, SI TU GESTOR PERMITE ROLES ENTONCES HAZLO COMO TU GESTOR TE LO DEJE HACER, PERO DE ESTA FORMA TENDRÁS QUE CAMBIAR EL CODIGO EN EL BACKEND
CREATE TABLE roles (
    nombre VARCHAR(50) PRIMARY KEY,
    privilegios TEXT
);



-- ############# CREAR UN USUARIO "erick"
CREATE USER 'erick'@gym IDENTIFIED BY 'admin';
-- darle privilegios en un tabla en especifico
GRANT ALL PRIVILEGES ON *.* TO 'erick'@'gym';



-- ############# VISTAS EXTRAS #############

-- VISTA USER_PRIVILEGES
CREATE VIEW user_privileges AS
SELECT
    user,
    host,
    GROUP_CONCAT(
        CONCAT(
            IF(Select_priv = 'Y', 'SELECT, ', ''),
            IF(Insert_priv = 'Y', 'INSERT, ', ''),
            IF(Update_priv = 'Y', 'UPDATE, ', ''),
            IF(Delete_priv = 'Y', 'DELETE, ', ''),
            IF(Create_priv = 'Y', 'CREATE, ', '')
        )
    ) AS roles
FROM mysql.user
WHERE host = 'gym'
GROUP BY user, host;



-- ############# PROCEDIMIENTOS ALMACENADOS EXTRAS ####################

-- PROCEDIMIENTO PARA ASIGNAR UN ROL
DELIMITER //

CREATE PROCEDURE cambiar_rol(IN nombre_usuario VARCHAR(50), IN nuevo_rol VARCHAR(50))
BEGIN
    -- Verificar si el usuario existe
    DECLARE user_exists INT DEFAULT 0;
    SELECT COUNT(*) INTO user_exists FROM mysql.user WHERE user = nombre_usuario;
    IF user_exists > 0 THEN

        -- Obtener los privilegios asociados al nuevo rol
        SELECT privilegios INTO @privilegios FROM roles WHERE nombre = nuevo_rol;

        -- Otorgar los privilegios al usuario
        IF @privilegios IS NOT NULL THEN
            SET @sql = CONCAT('GRANT ', @privilegios, ' ON *.* TO \'', nombre_usuario, '\'@\'gym\';');
            PREPARE stmt FROM @sql;
			EXECUTE stmt;
			DEALLOCATE PREPARE stmt;

        END IF;
    ELSE
        SELECT 'El usuario especificado no existe';
    END IF;
END //

DELIMITER ;



-- PROCEDIMIENTO PARA CAMBIAR USUARIO Y CONTRASEÑA
DELIMITER //

CREATE PROCEDURE CambiarNombreYContraseña(IN nuevo_nombre VARCHAR(255), IN nueva_contraseña VARCHAR(255), IN nombre_viejo VARCHAR(255))
BEGIN
    DECLARE exit handler for sqlexception
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Verificar si el nuevo nombre es diferente del nombre viejo
    IF nuevo_nombre <> nombre_viejo THEN
        -- Cambiar el nombre del usuario
        SET @rename_user_query = CONCAT('RENAME USER ''', nombre_viejo, '''@''gym'' TO ''', nuevo_nombre, '''@''gym''');
        PREPARE stmt FROM @rename_user_query;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;

    -- Cambiar la contraseña del usuario
    SET @password_change_query = CONCAT('ALTER USER ''', nuevo_nombre, '''@''gym'' IDENTIFIED BY ''', nueva_contraseña, '''');
    PREPARE stmt FROM @password_change_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    COMMIT;
END //

DELIMITER ;


-- ############# TRIGGER EXTRAS #############

-- TRIGGER PARA GENERAR MATRICULA
DELIMITER //
CREATE TRIGGER generar_matricula BEFORE INSERT ON miembros
FOR EACH ROW
BEGIN
    DECLARE year_prefix VARCHAR(4);
    DECLARE new_id INT;
    
    -- Obtener el año actual
    SET year_prefix = YEAR(NEW.fechaRegistro);
    
    -- Obtener el nuevo id del miembro
    SELECT MAX(idmiembro) + 1 INTO new_id FROM miembros;
    
    -- Si no hay ningún registro en la tabla, establecer el nuevo_id a 1
    IF new_id IS NULL THEN
        SET new_id = 1;
    END IF;
    
    -- Establecer la nueva matrícula
    SET NEW.matricula = CONCAT(year_prefix, '-', new_id);
END;
//

DELIMITER ;

