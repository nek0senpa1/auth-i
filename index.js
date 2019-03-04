const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const knex = require('knex');
const knexConfig = require('./knexfile');

const doublebee = knex(knexConfig.development);

server.use(knexConfig)

server.get('/', (rec,rez) =>{
    rez.send('L00k5 L1K3 W3 M4D3 1T')
})

const port = process.env.PORT || 5500;
server.listen(port, () => console.log(`Heyo, we is running on port ${port} !!! `));