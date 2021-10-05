import {Paciente} from "../model/User.js"
import bcrypt from 'bcrypt';

class PacienteController{
    async list(req, res) {
        Paciente.find(JSON.parse(JSON.stringify({  nome, cpf, email, senha, _role, genero, data_nasc, endereco, contato }))).select("-senha").then((paciente) => {
            res.json({
                error: false,
                paciente: paciente
            });
        }).catch((err => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro ao listar os Pacientes!"
            })
        }));
    }

    async listOne(req, res) {
        Paciente.findOne({ _id: req.params.id }).select("-senha").then((paciente) => {
            return res.json({
                error: false,
                Paciente: paciente
            });
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "Erro ao listar o Paciente!"
            })
        })
    }
         
 
    async update(req, res) {
        try { 
            //verficar se o email a ser atualizado já está ou não cadastrado
            if (req.body.email) {
                const emailExiste = await UserModel.findOne({ email: req.body.email });
                if (!emailExiste)
                    return res.status(400).json({error: true, message: "Email já cadastrado!"})
            }
    
            if (req.body.senha)
                req.body.senha = bcrypt.hashSync(req.body.senha, 8);
    
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

    async delete(req, res) {
        Paciente.deleteOne({ _id: req.params.id }).then(() => {
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

export default new PacienteController();