const   express = require('express'),
        app     = express(),
        mongoose = require('mongoose'),
        methodOverride = require('method-override'),
        bodyParser = require("body-parser"),
        passport = require("passport"),
        LocalStrategy = require("passport-local"),
        User = require("./models/user.model"),
        cors = require('cors');

require('dotenv').config();

// BASE SETUP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Lasagna",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    next();
});

// CONNECT TO DB
const db = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("MongoDB is Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

// cors origin URL - Allow inbound traffic from origin
corsOptions = {
    origin: "Your FrontEnd Website URL",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB is set up locally');
});


// ROUTES
const indexRoutes = require('./routes/index'),
      recipeRoutes = require('./routes/recipes'),
      menuRoutes  = require('./routes/menus');

app.use('/', indexRoutes);
app.use('/recipes', recipeRoutes);
app.use('/menus', menuRoutes);

// LISTEN
const port = process.env.PORT || 5000;
app.listen(port, process.env.IP, () => {
    console.log('Server running!');
});