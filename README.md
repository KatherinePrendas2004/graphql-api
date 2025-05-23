Entendido. Aquí tienes un documento modificado que se centra únicamente en el uso de **GraphQL** en lugar del backend completo:

---

## KidsTube\_Pro\_GraphQL

### Descripción

KidsTube\_Pro\_GraphQL es el servicio que maneja la API de **GraphQL** para interactuar con los datos de la plataforma KidsTube. La API permite consultas eficientes y específicas para obtener la información necesaria sin sobrecargar al servidor.

La plataforma permite:

* **Consultas personalizadas**: Obtener solo la información relevante, como perfiles, contenido y estadísticas de visualización.
* **Mutaciones**: Realizar operaciones como crear, editar o eliminar registros de usuarios, contenido y configuraciones.
* **Autenticación**: Gestionar el acceso seguro mediante tokens JWT.
* **Interacción con YouTube**: Validar y acceder a contenido seguro de YouTube.

---

### Diagrama
![image](https://github.com/user-attachments/assets/46ec163c-f5a1-4807-bc64-31fac6606ee7)


---

### Tecnologías utilizadas

* **Node.js**: Entorno de ejecución para JavaScript en el servidor.
* **Apollo Server**: Framework para crear un servidor GraphQL con Node.js.
* **GraphQL**: Lenguaje para consultar y manipular datos de manera eficiente.
* **MongoDB + Mongoose**: Base de datos y modelo de datos utilizados por el servicio.
* **JWT (JSON Web Token)**: Autenticación de usuarios mediante tokens.
* **YouTube Data API**: Obtención de información segura de videos.
* **dotenv**: Gestión de variables de entorno sensibles.

---

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/KatherinePrendas2004/graphql-api.git
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd graphql-api
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` y configura las siguientes variables de entorno:

   ```
   MONGODB_URI=tu_cadena_de_conexion
   JWT_SECRET=tu_clave_secreta
   YOUTUBE_API_KEY=tu_clave_de_youtube
   ```

5. Inicia el servidor:

   ```bash
   node app.js
   ```

---

### Ejemplo de consulta GraphQL

```graphql
query {
  getChildProfiles(parentId: "abc123") {
    name
    age
    watchHistory {
      videoId
      title
      watchedAt
    }
  }
}
```

### Ejemplo de mutación GraphQL

```graphql
mutation {
  createChildProfile(
    input: {
      name: "Luisito"
      age: 6
      parentId: "abc123"
    }
  ) {
    id
    name
    age
  }
}
```



