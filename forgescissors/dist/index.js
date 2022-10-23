"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var app = (0, express_1.default)();
var PORT = 5000;
// open livereload high port and start to watch public directory for changes
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);
// ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once("connection", function () {
    setTimeout(function () {
        liveReloadServer.refresh("/");
    }, 100);
});
app.get("/", function (req, res, next) {
    try {
        res.send("Hello!");
        console.log('root');
    }
    catch (error) {
        next(error);
    }
});
app.use(connectLiveReload());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "YOUR$UP3R$3CR3T",
    resave: true,
    saveUninitialized: true
}));
app.use('/api/auth', require('./authenticate'));
app.use('/api/auth', require('./token'));
app.use('/api/acc', require('./acc'));
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});
