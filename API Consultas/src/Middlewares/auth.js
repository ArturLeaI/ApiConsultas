import jwt from 'jsonwebtoken'
import {promisify} from "util"

export default function authorize(arrrayOfAuthUsers = undefined) {
    return  (req, res, next) => {
        console.log(arrrayOfAuthUsers)
        // verificar se o token foi informado no cabeçalho da requisição
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: true,
                message: "Token não encontrado!"
            })
        }
        const [, token] = req.headers.authorization.split(' ') // => [Bearer, {TOKEN}]

        try {
           const decode = jwt.verify(token, process.env.API_SECRET);
           req.userID = decode.id;
           req.user
           console.log(req.userID)

           // caso contrário - nosso usuário possui diferentes papéis
           // verificar se o usário é autorizado
           if(arrrayOfAuthUsers.indexOf(decode.role) === -1) {
                return res.status(401).json({
                    error: true,
                    message: 'Usuário não autorizado!'
                })
           }
           next();
        } catch(exception) {
            console.log(exception.nome)
            if(exception.nome === 'TokenExpiredError') {
                return res.status(401).json({
                    error: true,
                    message: "Tempo de acesso expirado!"
                });
            }

            return res.status(401).json({
                error: true,
                message: 'Token inválido!'
            })
        }

    }
}