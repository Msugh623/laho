import express from "express";
import cors from "cors";
import http from "http";
import { config } from "dotenv";
import path from "path";
import rootdirname from "./rootdirname";
import { parsFe } from "./handlers/clienthandlers";
import listingsRouter from "./routes/requestRouter";
import UseAuthHandler from "./middleware/authMiddleware";
import authRouter from "./routes/authRouter";
import usersRouter from "./routes/usersRouter";
import mediaRouter from "./routes/mediaRouter";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/adminRouter";
import makeSitemap from "./utils/makeSitemap";
const { authHandler } = new UseAuthHandler();
config({
  quiet: true,
});
const port = process.env.PORT || 3000;
const app = express();
const server = new http.Server(app);
app.get("/heartbeat",(_,res)=>{
    res.send("[ OK ]")
})
app.use(express.static(path.join(rootdirname(), "public")));
app.use(express.json());
app.use(cookieParser());
app.use(authHandler.checkAuth, authHandler.parseUser);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Auth"],
    // credentials:true
  })
);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/listings", listingsRouter);
app.use("/files", mediaRouter);
app.use("/admin", adminRouter);

// Send frontend
app.get("/:path(*)", parsFe);

server.listen(port, () => {
  console.log(
    `\n\x1b[37m${"server running at http://localhost:" + port}\x1b[39m\n`
  );
  setTimeout(async () => {
    try {
      await makeSitemap();
    } catch (e) {
      console.log("SITEMAPERR:", e);
      await makeSitemap();
    }
    setInterval(async () => {
      try {
        await makeSitemap();
      } catch (e) {
        console.log("SITEMAPERR:", e);
        await makeSitemap();
      }
    }, 1000 * 60 * 60 * 12);
  }, 5000);
});

setInterval(() => {
  setTimeout(() => {
    (async () => {
      try {
        const _ = await fetch("https://landhome.onrender.com/heartbeat", {
          method: "GET",
        });
        console.log(`Ping: ${new Date().toString()}`);
      } catch (err) {
        console.error(`PINGERROR: ${err}`);
      }
    })();
  }, [Math.floor(Math.random() * 1000 * 20)]);
}, 1000 * 60);