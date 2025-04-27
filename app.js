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
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        console.log('Token recibido:', token); // Depuración

        if (!token) {
            console.log('No se proporcionó token');
            return { user: null };
        }

        try {
            const cleanToken = token.startsWith('Bearer ') ? token.replace('Bearer ', '') : token;
            console.log('Token limpio:', cleanToken); // Depuración
            const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
            console.log('Token decodificado:', decoded); // Depuración

            // Verificar que el usuario existe y está activo
            const userId = decoded.id || decoded.userId; // Manejar ambos casos
            if (!userId) {
                console.log('userId no encontrado en el token');
                return { user: null };
            }

            const user = await User.findOne({ _id: userId, email: decoded.email });
            if (!user) {
                console.log('Usuario no encontrado');
                return { user: null };
            }
            if (user.status !== 'active') {
                console.log('Usuario no está activo');
                return { user: null };
            }

            return { user: { ...decoded, userId } }; // Asegúrate de que userId esté disponible
        } catch (error) {
            console.error('Error al verificar token:', error.message);
            return { user: null };
        }
    },
    cors: {
        origin: 'http://localhost:5500', // Puerto de tu frontend
        credentials: true
    }
});

const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
    console.log(`Servidor GraphQL corriendo en ${url}`);
});