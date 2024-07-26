import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';

import fileUpload from 'express-fileupload';
import indexRoutes from './routes/index.routes.js';
// import miembrosRoutes from './routes/miembros.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js'

 import entidadesRoutes from './routes/entidades.routes.js'

import configuracionRoutes from './routes/configuracion.routes.js'
import compraRoutes from './routes/compra.routes.js'




const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
    cors({
      // origin: "http://localhost:3000",
    })
  );


app.use(indexRoutes);
// app.use('/api', miembrosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', entidadesRoutes);
app.use('/api', configuracionRoutes);
app.use('/api', compraRoutes);


app.listen(3000);
console.log('Servidor corriendo en el puerto 3000');