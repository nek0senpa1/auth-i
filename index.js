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

const Softy = require('./userstuff/softserver');



server.post('api/newuser', (rec,rez) => {
    var newUser = rec.body;

    const hasher = bcrypt.hashSync(newUser.password, 8);

    newUser.password = hasher;

    Softy.putStuff(newUser)
    .then(nooby => {
        rez.status(201).json({message: `New User ${nooby} is now registered`})
    })
    .catch(err => {
        rez.status(500).json(err);
    })
});



server.get('/', (rec,rez) =>{
    rez.send('L00k5 L1K3 W3 M4D3 1T')
})

const port = process.env.PORT || 5500;
server.listen(port, () => console.log(`Heyo, we is running on port ${port} !!! `));