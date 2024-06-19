import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { database } from "./db-config.js";
import indexRouter from "./api/index.js";
dotenv.config();

database.connect();
const app = express();
app.use(cookieParser("MY SECRET"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "somesecret",
    cookie: { maxAge: 60000, httpOnly: true },
  })
);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/", indexRouter);

// app.get("/setCookie", (req, res) => {
//   res.cookie("demo", "cookie123456", { signed: true, httpOnly: true });
//   res.json({ ok: 1 });
// });

// app.get("/getCookie", (req, res) => {
//   console.log("getCookie::::", req.cookies);
//   console.log(
//     "getCookie::::signedCookies::::",
//     req.signedCookies.sitesSecurity
//   );
//   res.json(req.cookies);
// });

// set session
app.get("/set_session", (req, res) => {
  //set a object to session
  // req.session.User = {
  //   website: "anonystick.com",
  //   type: "blog javascript",
  //   like: "4550",
  // };

  res.cookie("demo", "cookie123456", { signed: true, httpOnly: true });

  return res.status(200).json({ status: "success" });
});

//check session
app.get("/get_session", (req, res) => {
  if (req.session.User) {
    return res
      .status(200)
      .json({ status: "success", session: req.session.User });
  }
  return res.status(200).json({ status: "error", session: "No session" });
});

//destroy session
// app.get("/destroy_session", (req, res) => {
//   req.session.destroy(function (err) {
//     return res
//       .status(200)
//       .json({ status: "success", session: "cannot access session here" });
//   });
// });
