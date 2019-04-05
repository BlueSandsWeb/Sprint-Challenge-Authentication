const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  try {
    let user = req.body;
    if (user.username && user.password) {
      const hash = bcrypt.hashSync(user.password, 12);
      user.password = hash;
      const [id] = await db('users').insert(user);
      const newUser = await db('users').where({ id }).first();
      const token = generateToken(newUser);
      res.status(201).json({ token });
    } else {
      res.status(400).json({ message: "Please fill out all of the fields" });
    }
  } catch (error) {
    res.status(500).json({ message: `error: ${error}` })
  }

}

async function login(req, res) {
  try {
    let { username, password } = req.body;
    if (username && password) {
      const user = await db('users').where({ username }).first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }

    } else {
      res.status(400).json({ message: "Please fill in all fields" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.  If this continues, please contact sysadmin" });
  }
}


function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options);
}