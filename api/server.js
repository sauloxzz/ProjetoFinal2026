const jsonServer = require("json-server")
const path = require("path")
const fs = require("fs")
const express = require("express")
const multer = require("multer")
const auth = require("json-server-auth")

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

// Documentação Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json'); // Arquivo de documentação Swagger
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const port = 3000;
let imagem = ""

if (!fs.existsSync(path.join(__dirname, "uploads"))) {
    fs.mkdirSync(path.join(__dirname, "uploads"))
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"))
    },
    filename: (req, file, cb) => {
        imagem = Date.now() + (path.extname(file.originalname) || ".jpg")
        cb(null, imagem)
    }
})

// Configuração do Multer
let upload = multer({ storage })
server.use("/static", express.static(path.join(__dirname, "uploads")))
server.use(middlewares)
// server.use(upload.any())

// Você pode definir diferentes níveis de acesso para diferentes endpoints aqui.
const rules = auth.rewriter({
    "/colaboradores*": "/660/colaboradores",
});
server.use(rules);

server.use((req, res, next) => {
    if (req.originalUrl === "/users") {
        req.body = { ...req.body, arquivo: imagem }
    }
    if (imagem !== "") {
        req.body = { ...req.body, arquivo: imagem }
    }
    next()
})

server.put("/users/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = router.db.get("users").find({ id }).value();

    if (!user) {
        return res.status(404).send("Usuário não encontrado");
    }

    const updatedUser = {
        ...user,
        ...req.body,
        arquivo: imagem
    };

    // Atualize o usuário no banco de dados
    router.db.get("users").find({ id }).assign(updatedUser).write();

    res.json(updatedUser);
});

server.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    return res.status(200).json({ filename: req.file.filename });
});

server.post("/api/consultora", express.json(), (req, res) => {
    const { pergunta } = req.body;
    if (!pergunta) {
        return res.status(400).json({ error: "Pergunta não fornecida." });
    }

    const query = pergunta.toLowerCase();
    let resposta = "Olá! Como sua consultora virtual Swarovski, estou aqui para ajudar você a encontrar o brilho perfeito. ";

    if (query.includes("anel") || query.includes("anéis") || query.includes("anelzinho")) {
        resposta += "Os anéis Swarovski são lendários pelo seu design elegante. Atualmente, os anéis da coleção Idyllia (em verde e azul com lapidações de flor) são destaques incríveis na nossa loja!";
    } else if (query.includes("colar") || query.includes("colares") || query.includes("pingente")) {
        resposta += "Para colares e pingentes, o Colar Idyllia Flor Multicor e o Pingente Idyllia Florido Pavé são escolhas maravilhosas, unindo um acabamento de combinação de metais com lapidações brilhantes.";
    } else if (query.includes("relógio") || query.includes("relogio") || query.includes("relogios")) {
        resposta += "Nossos relógios combinam estilo e utilidade. Destaco o sofisticado Relógio Prata Cristal e o moderno Relógio Prata Azul, ambos ideais para elevar qualquer look.";
    } else if (query.includes("preço") || query.includes("preco") || query.includes("valor") || query.includes("quanto custa")) {
        resposta += "Temos peças luxuosas para todos os gostos! Nossos anéis começam em R$ 1.000,00 e colares em R$ 3.700,00. Tudo com parcelamento facilitado em até 10x ou 12x sem juros.";
    } else if (query.includes("coleção") || query.includes("colecoes") || query.includes("coleções") || query.includes("idyllia")) {
        resposta += "A coleção Idyllia é inspirada em elementos da natureza, como flores exuberantes e combinações de lapidações que capturam a luz de maneira mágica. É perfeita para presentes inesquecíveis!";
    } else {
        resposta += "Seja para um presente especial ou para completar seu visual com elegância, temos a joia ideal. Você tem interesse em alguma categoria específica como anéis, colares ou relógios?";
    }

    return res.json({ resposta });
});

server.use(auth);
server.db = router.db
server.use(router)

server.listen(port, () => {
    console.log("\x1b[36m%s\x1b[0m", "JSON Server executando na porta: " + port)
    console.log("\x1b[1m%s\x1b[0m", "\nRecursos disponíveis: \n")
    Object.keys(router.db.__wrapped__).forEach(recurso => console.log(`http://localhost:${port}/${recurso}`))
    console.log(`\nhttp://localhost:${port}/static`);
})