//Model para atendente e Chefe de departamento.
import mongoose from 'mongoose';

//Usuário Geral
const UserSchema = new mongoose.Schema ({
    nome: {
        type: String,
        required: true
    },

    cpf: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    genero: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },

    data_nasc: {
        type: Date, //YYYY-MM-DD - Sem horário.
        required: true
    },
    
    endereco: {
        rua: { 
            type: String,
            required: [true, "Preencha a rua."]
        },
    
        cidade: {
            type: String,
            required: [true, "Insira a cidade."]
        },
    
        cep: {
            type: String,
            required: [true, "Preencha o CEP."]
        }
      },
    
    contato: {
        telefone: {
            type: String,
            required: [true, "Insira telefone para contato."]
        },
    
        whatsapp: {
            type: String,
            required: [true, "Insira telefone para contato via WhatsApp."]
        }
      }
}, {
        timestamps: true, discriminatorKey: '_role',
        deleted: true
}            
);

export const User = mongoose.model('Usuário', UserSchema);

//Modelo para Pacientes
export const PacienteModel = User.discriminator('Paciente', mongoose.Schema({}));

//Modelo Cargo - ADMIN
//export const AdminModel = User.discriminator('Administrador');

//Modelo Cargo - Gerente
export const GerenteModel = User.discriminator('Gerente', mongoose.Schema({}));

//Modelo Cargo - Atendente (recepcionistas, secretárias(os))
export const AtendenteModel = User.discriminator('Atendente', mongoose.Schema({}));

//Modelo Cargo - Médicos
export const MedicoModel = User.discriminator('Médico', mongoose.Schema({
    crm: {
        type: String,
        required: [true, "Insira o CRM"]
    },
}));
