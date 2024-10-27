// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Habilita acesso do frontend
const app = express();
const PORT = 3000;

// Configuração do CORS para aceitar requisições do frontend
app.use(cors());

// Rota para buscar vagas da API do Remotive
app.get('/jobs', async (req, res) => {
  try {
    const { search, category, limit } = req.query; // Parâmetros opcionais

    const response = await axios.get('https://remotive.com/api/remote-jobs', {
      params: { search, category, limit },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados da API Remotive:', error);
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
});

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
