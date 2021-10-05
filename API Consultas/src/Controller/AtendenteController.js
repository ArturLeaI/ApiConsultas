import {Atendente} from "../model/User.js"
import bcrypt from 'bcrypt';

class AtendenteController{
    async list(req, res) {
        Atendente.find(JSON.parse(JSON.stringify({ nome, cpf, email, senha, _role, genero, data_nasc, endereco, contato }))).select("-senha").then((atendente) => {
            res.json({
                error: false,
                atendente: atendente
            });
        }).catch((err => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro ao listar Atendentes!"
            })
        }));
    }
    //GET /atendente/:id para listar apenas uma Atendente
    async listOne(req, res) {
        Atendente.findOne({ _id: req.params.id }).select("-senha").then((atendente) => {
            return res.json({
                error: false,
                Atendente: atendente
            });
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "Erro ao listar Atendente!"
            })
        })
    }  
         
    //PUT /atendente/:id para editar um atendente existente
    async update(req, res) {
        try { 
            //verficar se o email a ser atualizado já está ou não cadastrado
            if (req.body.email) {
                const emailExiste = await UserModel.findOne({ email: req.body.email });
                if (!emailExiste)
                    return res.status(400).json({error: true, message: "Email já cadastrado!"})
            }
    
            if (req.body.senha)
                req.body.senha = bcrypt.hashSync(req.body.senha, 5);
    
            await UserModel.updateOne({ _id: req.userID }, req.body, { runValidators: true });
            return res.json({ error: false, message: "Usuário atualizado com sucesso!" });
        } catch(err) {
                if (err.name === "ValidationError") {
                    return res.status(400).json({
                        error: true,
                        message: err.message,
                        ValidationError: err.errors
                    });
                }

                return res.status(400).json({
                    error: true,
                    message: "Erro ao executar a solitação!"
                });
        };
    }
    //DELETE /atendente/:id para deletar cadastro de atendente
    async delete(req, res) {
        Atendente.deleteOne({ _id: req.params.id }).then(() => {
            return res.json({
                error: false,
                message: "Cadastro apagado com sucesso!"
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

export default new AtendenteController();