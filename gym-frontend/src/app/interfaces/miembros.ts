export interface IMiembro{
    idmiembro?: number;
    matricula:string;
    nombre:string;
    telefono:string;
    direccion:string;
    edad:number;
    sufreEnfermedad:boolean;
    tieneSeguro:boolean;
    enfermedad:string;
    institucion:string;
    nombreContacto:string;
    telefonoContacto:string;
    imagen:string;
    estado?:string;
}