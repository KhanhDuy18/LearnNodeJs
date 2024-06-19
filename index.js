import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config();

const app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(cookieParser("secret"));

app.use(
  session({
    secret: "your_secret_key", // A secret key used to sign the session ID cookie
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
      maxAge: 3600000, // Sets the cookie expiration time in milliseconds (1 hour here)
      httpOnly: true, // Reduces client-side script control over the cookie
      // Ensures cookies are only sent over HTTPS
      // secure: true,
    },
  })
);

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/cookie/setCookie", (req, res) => {
  res.cookie("sessionId", "12345678", {
    // "expires" - The cookie expires in 24 hours
    // expires: new Date(Date.now() + 86400000),
    // We can also use "maxAge" to specify expiration time in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // "path" - The cookie is accessible for APIs under the '/api' route
    path: "/cookie",
    // "domain" - The cookie belongs to the 'example.com' domain
    // domain: "",
    // "secure" - The cookie will be sent over HTTPS only
    secure: true,
    // "HttpOnly" - The cookie cannot be accessed by client-side scripts
    httpOnly: true,
    // signed: true,
  });
  res.json("Set cookie");
});

app.get("/cookie/getCookie", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

app.get("/session/getCookie", (req, res) => {
  res.json(req.cookies);
});

app.get("/deleteCookie", (req, res) => {
  res.clearCookie("sessionId");
  res.send("Clear cookie");
});

app.get("/session", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

// set session
app.get("/set_session", (req, res) => {
  req.session.User = {
    username: "nodeJS",
    age: 23,
    email: "test@gamil.com",
  };

  return res.status(200).json({ status: "Set success" });
});

app.get("/get_session", (req, res) => {
  if (req.session.User) {
    return res.status(200).json({ status: "success", session: req.session });
  }
  return res.status(200).json({ status: "error", session: "No session" });
});

app.get("/destroy_session", (req, res) => {
  req.session.destroy(function (err) {
    return res
      .status(200)
      .json({ status: "success", session: "cannot access session here" });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
