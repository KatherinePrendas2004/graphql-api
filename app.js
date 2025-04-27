const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const conectarDB = require('./utils/conexion');
require('dotenv').config();

const typeDefs = require('./graph/typeDefs');
const resolvers = require('./graph/resolvers');
const User = require('./models/user');

// Conectar a MongoDB
conectarDB();

// Configurar el contexto para autenticación con JWT
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        if (!token) return { user: null };

        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            return { user: decoded };
        } catch (error) {
            return { user: null };
        }
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
    console.log(`Servidor GraphQL corriendo en ${url}`);
});