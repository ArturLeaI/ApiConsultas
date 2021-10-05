import mongoose from 'mongoose';

const ConsultaSchema = new mongoose.Schema({
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Médico',
        required: true
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: false
    },
    data_hora: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Disponível', 'Ocupado', 'Confirmado', 'Atendido', 'Não atendido'],
        default: 'Disponível'
    }
}, { timestamps: true });

export default mongoose.model('Consulta', ConsultaSchema);