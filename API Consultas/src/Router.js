import { Router } from "express";

import Login from "./Controller/LoginController.js";
import PacienteController from "./Controller/PacienteController.js";
import ConsultaController from "./Controller/ConsultaController.js"
import AtendenteController from "./Controller/AtendenteController.js"
import MedicoController from "./Controller/MedicoController.js"
import authorize from './Middlewares/auth.js'


const routes = new Router();


//Criar Cadastro de Usuario
routes.post("/signPaciente", Login.signup);
//Login de Usuario
routes.post("/loginPaciente", Login.login);


//PACIENTE
//Consultar todos os Pacientes.
routes.get("/paciente/:id",authorize(['Atendente','Gerente']), PacienteController.list);
//Consultar um cadastro.
routes.get("/paciente/:id",authorize(['Atendente','Gerente']), PacienteController.listOne);
//Atualizar dados 
routes.put("/paciente/:id",authorize(['Atendente','Paciente','Gerente']), PacienteController.update);
//Deletar dados 
routes.delete("/paciente/:id",authorize(['Paciente','Gerente']), PacienteController.delete);


//CONSULTA
//Listar Conultas criadas.
routes.get("/consulta",authorize(['Medico','Atendente']),  ConsultaController.list);
//Listar uma consulta especifica.
routes.get("/consulta/:id",authorize(['Medico','Atendente']),  ConsultaController.listOne);
//Criar uma consulta.
routes.post("/consulta/:id",authorize(['Medico']),  ConsultaController.create);
//Editar Consulta.
routes.put("/consulta/:id",authorize(['Medico','Atendente']),  ConsultaController.update);
//Apagar registro da consulta.
routes.delete("/consulta/:id",authorize(['Atendente','Medico']),  ConsultaController.delete);


//ATENDENTE
//Consultar todas as Atendentes Contratadas.
routes.get("/atendente",authorize(['Gerente']), AtendenteController.list)
//Consultar uma Atendente especifica.
routes.get("/atendente/:id",authorize(['Gerente']),  AtendenteController.listOne);
//Atualizar cadastro de Atendente.
routes.put("/atendente/:id",authorize(['Gerente']), AtendenteController.update);
//Deletar cadastro de Atendente.
routes.delete("/atendente/:id",authorize(['Gerente']), AtendenteController.delete);

//MEDICO
//Listar Medicos Contratados.
routes.get("/medico",authorize(['Gerente']),  MedicoController.list);
//Listar um Medico Especifico.
routes.get("/medico/:mid",authorize(['Gerente']),  MedicoController.listOne);
//Edtar Cadastro de Medico.
routes.put("/medico/:mid",authorize(['Gerente']),  MedicoController.update);
//Apagar cadastro de Medico.
routes.delete("/medico/:mid",authorize(['Gerente']), MedicoController.delete);


// 404 - Page/Resource Not Found
routes.use((req, res, next) => {
    return res.status(404).json({
        error: true,
        message: `Resource '${req.url}' Not Found!`
    });
  });
  
  // 500 - Internal Server Error
  routes.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        errror: true,
        message: "Internal Server Error"
    });
  });
  
  export default routes;