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



server.post('/api/newuser', (rec,rez) => {
    var newUser = rec.body;

    const hasher = bcrypt.hashSync(newUser.password, 8);

    newUser.password = hasher;

    Softy.add(newUser)
    .then(nooby => {
        rez.status(201).json({message: `New User ${nooby} is now registered`})
    })
    .catch(err => {
        rez.status(500).json({message: 'user name already exists'})
    })
});


server.post('/api/login', (rec,rez) => {
    var {username, password} = rec.body;

    Softy.getBy({name: username}).first()

    // note... all that doubling/sending stuff confuses me... thus I re-write things
    // and change the names, so I know exactly what it's doing :) 

    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            rez.status(201).json({message: `Welcome ${user.name} ?|?|?`});
        } else {
            rez.status(402).json({message: "Invalid Login Attempt"})
        }
    }).catch(err => { rez.status(500).json({mess: "You See This?  You F'd Up Somewhere..."})})
})


// not real specific on how we want to do this, so... I'll do it like we did in class
function allInTheFamily ( ma, pa, granny) {
    const {username, password} = ma.headers
    //console.log(ma.headers);
    if( username && password) {
        Softy.getBy({name: username}).first()
        .then(paul => {
            console.log('paul:', paul);
            console.log(password)
            if (paul && bcrypt.compareSync(password, paul.password)) {
                granny();
            } else {
                pa.send('Nah... that ain\'t right user info... try again')
            }
        })
        .catch(err => {
            pa.send('You done did something wrong...')
        })
    } else {
       pa.status(400).json({message: "No... No.  You did something very wrong"})
    }
}


server.get('/api/users', allInTheFamily, (rec, rez) =>{
    Softy.getStuff()
    .then(pomPom => {
        rez.json(pomPom);

    })
    .catch(err => {
        rez.send('Somehow you got all the way here... and still f\'d up...')
    })
})


server.post('/api/users', )


server.get('/', (rec,rez) =>{
    rez.send('L00k5 L1K3 W3 M4D3 1T')
})

const port = process.env.PORT || 5500;
server.listen(port, () => console.log(`Heyo, we is running on port ${port} !!! `));