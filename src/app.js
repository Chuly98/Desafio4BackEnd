import e from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./router/products.router.js";
import cartRouter from "./router/carts.router.js";
import viewsRouter from "./router/views.router.js";
import { __dirname } from "./utils.js";
import mongoose from "../config.js";
import { saveMessage } from "./controllers/message.controller.js";


const app = e();
const PORT = process.env.PORT || 8080;

app.use(e.json());
app.use(e.urlencoded({ extended: true }));


app.use(e.static(__dirname + "/public"));

// Configuración de Handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Rutas de la API y de las vistas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

// Inicialización del servidor HTTP y Socket.io
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

// Manejo de conexiones de Socket.io
socketServer.on("connection", (socket) => {
    console.log("Cliente conectado a través de Socket.io");

    // Escucha los mensajes del chat y los emite a todos los clientes
    socket.on("chat message", async (data) => {
        const { user, message } = data;

        try {
            const savedMessage = await saveMessage(user, message);
            socketServer.emit('chat message', savedMessage);
        } catch (error) {
            console.error("Error al guardar el mensaje en MongoDB:", error);
        }
    });

    // Manejo de eventos de desconexión
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});