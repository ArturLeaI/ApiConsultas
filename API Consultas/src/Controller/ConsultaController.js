import Consulta from "../model/Consulta.js"
import bcrypt from 'bcrypt';

class ConsultaController{
    async list(req, res) {
        Consulta.find(JSON.parse(JSON.stringify({medico, paciente, data_hora, status}))).then((consulta) => {
            res.json({
                error: false,
                consulta: consulta
            });
        }).catch((err => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro ao listar os Consultas!"
            })
        }));
    }
    //GET /consulta/:id para listar apenas um paciente
    async listOne(req, res) {
        Consulta.findOne({ _id: req.params.consulta_id }).populate({path: 'professor', path: 'paciente', select: '-senha'}).then((consulta) => {
            return res.json({
                error: false,
                Consulta: consulta
            });
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "Erro ao listar o Consulta!"
            })
        })
    }

    //POST
    async create(req, res) {
        Consulta.create(req.body).then((consulta) => {
            return res.json(consulta);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 120,
                message: "Error: Consulta não foi cadastrado com sucesso"
            });
        });
    }
         
    //PUT /consulta/:id para editar consulta 
    async update(req, res) {
        Consulta.updateOne({ _id: req.params.id }, req.body).then(() => {
            return res.json({
                error: false,
                message: "Consulta editado com sucesso!"
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro ao editar consulta !"
            })
        })
    }
    //DELETE /paciente/:id para deletar um paciente
    async delete(req, res) {
        Consulta.deleteOne({ _id: req.params.id }).then(() => {
            return res.json({
                error: false,
                message: "CConsulta apagado com sucesso!"
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Error: não foi possível executar a solicitação de deleção!"
            })
        });
    }
}

export default new ConsultaController();