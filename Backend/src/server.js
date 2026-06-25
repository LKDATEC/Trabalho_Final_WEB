const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuração de CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:5000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());



app.use(
'/cidades',
require('./routes/cidadeRoutes')
);


app.use(
'/equipamentos',
require('./routes/equipamentoRoutes')
);


app.use(
'/funcionarios',
require('./routes/funcionarioRoutes')
);


app.use(
'/servicos',
require('./routes/servicoRoutes')
);



app.get('/',(req,res)=>{

res.json({
status:"API Supabase funcionando"
});

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});