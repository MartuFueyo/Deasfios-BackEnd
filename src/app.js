import express from "express";
import ProductManager from "./dao/ProductManager.js";
import ChatManager from "./dao/ChatManager.js";
import __dirname from "./utils.js";
import ExpressHandlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import viewsRouter from "./routes/views.router.js";
import {Server} from "socket.io";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.routes.js"
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js"

const app = express();
const puerto = 8080;
app.use(cookieParser()); 
app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://martinalejandrofueyo:Data1994@clustercoderhouse.ubf1ebd.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
        ttl:20
    }),
    secret:"S3cr3t0",
    resave:false,
    saveUninitialized:false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const httpServer = app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});
const socketServer = new Server(httpServer);
const PM = new ProductManager();
const CM = new ChatManager();

app.set("views", __dirname + "/views");
app.engine('Handlebars', ExpressHandlebars.engine({Handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set("view engine", "Handlebars");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/api/sessions/", sessionsRouter);
app.use("/", viewsRouter);

mongoose.connect("mongodb+srv://martinalejandrofueyo:Data1994@clustercoderhouse.ubf1ebd.mongodb.net/?retryWrites=true&w=majority");

socketServer.on("connection", (socket) => {
    console.log("Nueva Conexión!");

    const products = PM.getProducts();
    socket.emit("realTimeProducts", products);

    socket.on("nuevoProducto", (data) => {
        const product = {title:data.title, description:"", code:"", price:data.price, status:"", stock:10, category:"", thumbnails:data.thumbnails};
        PM.addProduct(product);
        const products = PM.getProducts();
        socket.emit("realTimeProducts", products);
    });

    socket.on("eliminarProducto", (data) => {
        PM.deleteProduct(parseInt(data));
        const products = PM.getProducts();
        socket.emit("realTimeProducts", products);
    });

    socket.on("newMessage", async (data) => {
        CM.createMessage(data);
        const messages = await CM.getMessages();
        socket.emit("messages", messages);
    });
});