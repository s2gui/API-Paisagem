const dados = require('./dados.json');
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const server = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
server.use(express.json());
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


server.use(cors());
server.use(express.json());

server.listen(3000, () => {
    console.log("Servidor está funcional");
});

// Create do CRUD
server.post('/paisagem', (req, res) => {
    const novoPaisagem = req.body;

    if (!novoPaisagem.nome || !novoPaisagem.lugar || !novoPaisagem.tipo || !novoPaisagem.link) {
        return res.status(400).json({ mensagem: "Dados incompletos" });
    } else {
        dados.Paisagem.push(novoPaisagem);
        salvarDados(dados);
        return res.status(201).json({ mensagem: "Dados completos" });
    }
});

// Update do CRUD
server.put('/paisagem/:id', (req, res) => {
    const paisagemId = parseInt(req.params.id);
    const atualizarPaisagem = req.body;

    const indicePaisagem = dados.Paisagem.findIndex(paisagem => paisagem.id === paisagemId);

    if (indicePaisagem === -1) {
        return res.status(404).json({ mensagem: "Paisagem não encontrada" });
    }

    dados.Paisagem[indicePaisagem] = {
        ...dados.Paisagem[indicePaisagem],
        ...atualizarPaisagem
    };

    salvarDados(dados);
    return res.json({ mensagem: "Atualização feita com sucesso!" });
});

// Read do CRUD
server.get('/paisagem', (req, res) => {
    return res.json(dados.Paisagem);
});

server.put('/paisagem/:id', (req, res) => {
    const paisagemId = parseInt(req.params.id);
    const atualizarPaisagem = req.body;

    const indicePaisagem = dados.Paisagem.findIndex(paisagem => paisagem.id === paisagemId);

    if (indicePaisagem === -1) {
        return res.status(404).json({ mensagem: "Não encontrado" })
    }

    dados.Paisagem[indicePaisagem].nome = atualizarPaisagem.nome ||
        dados.Paisagem[indicePaisagem].nome

    dados.Paisagem[indicePaisagem].lugar = atualizarPaisagem.lugar ||
        dados.Paisagem[indicePaisagem].lugar

    dados.Paisagem[indicePaisagem].tipo = atualizarPaisagem.tipo ||
        dados.Paisagem[indicePaisagem].tipo

    dados.Paisagem[indicePaisagem].link = atualizarPaisagem.link ||
        dados.Paisagem[indicePaisagem].link

    salvarDados(dados);

    return res.json({ mensagem: "Atualizado com sucesso", paisagem: dados.paisagem[indicePaisagem] });

})

// Delete do CRUD
server.delete('/paisagem/:id', (req, res) => {
    const id = parseInt(req.params.id);

    dados.Paisagem = dados.Paisagem.filter(paisagem => paisagem.id !== id);

    salvarDados(dados);
    return res.status(200).json({ mensagem: "Paisagem excluída!" });
});

//Salvar Dados
function salvarDados() {
    fs.writeFileSync(__dirname + "/dados.json", JSON.stringify(dados, null, 2));
}