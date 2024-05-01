import express from 'express';
import cors from 'cors';
import Chance from 'chance';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing Json

// Make animals
const chance = new Chance();

const animals = [...Array(250).keys()].map(id => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name:chance.name(),
    }
})

// Endpoints to search for animals
app.get('/', (req, res) => {
    const q = req.query.q?.toLowerCase() || '';
    const results = animals.filter(animal => animal.type.toLowerCase().includes(q))

    res.send(results)

});

app.listen(8080, () => console.log('Listening on port: http//localhost:8080'));


