// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes'); // Correctly import taskRoutes
// const userRoutes = require('./routes/userRoutes');
// const { authMiddleware } = require('./authMiddleware');

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     const PORT = process.env.PORT || 5000;
//     const server = http.createServer(app);
//     const io = new Server(server, {
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//       }
//     });

//     io.on('connection', (socket) => {
//       console.log('a user connected');
//       socket.on('disconnect', () => {
//         console.log('user disconnected');
//       });
//     });

//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.log('notConnected', err);
//   });

// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', authMiddleware, taskRoutes); // Use middleware correctly
// app.use('/api/users', userRoutes);

























const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { authMiddleware } = require('./authMiddleware');

dotenv.config();
const app = express();

// Middleware for parsing and session handling
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('notConnected', err);
  });

// Dummy user data
const users = [{ id: 1, username: 'user', password: 'password' }];

// Passport.js configuration
passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Authentication middleware
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/users', userRoutes);

app.get('/login', (req, res) => {
  res.send('<form method="post" action="/login">Username: <input type="text" name="username"/><br>Password: <input type="password" name="password"/><br><input type="submit" value="Login"/></form>');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send('Welcome to the dashboard! <a href="/logout">Logout</a>');
});

app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

