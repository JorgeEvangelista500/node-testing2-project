const Players = require('./players/players-model')
const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
});

beforeEach( async () => {
    await db('players').truncate()
})

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('test server endpoints', () => {
    test('call the `up` endpoint', async () => {
        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });
    });
})

test('[GET] /players', async () => {
    let result = await request(server).get('/players');
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).toHaveLength(0);
});

test('[GET] /players/:id', async () => {
    let result = await Players.insert({ name: 'Carmelo' });
    result = await request(server).get('/players/' + result.id);
    expect(result.body.name).toBe('Carmelo');
});

test('[POST] /players', async () => {
    let result = await request(server)
        .post('/players')
        .send({ name: 'Dame' });
    expect(result.status).toBe(201);

    result = await Players.getById(1);
    expect(result.name).toBe('Dame');
});

test('[DELETE] /players/:id', async () => {
    let {id} = await Players.insert({ name: 'Pippin' });
    let result = await request(server).delete('/players/' + id);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ name: 'Pippin', id: 1 });
    const players = await db('players');
    expect(players).toHaveLength(0);
});


test('[PUT] /players/:id', async () => {
    let {id} = await Players.insert({ name: 'Pippin1' });
    let result = await request(server)
        .put('/players/' + id)
        .send({ name: 'Pippin2' });
    expect(result.body).toEqual({ name: 'Pippin2', id });
    let hobbit = await Players.getById(id);
    expect(hobbit).toEqual({ name: 'Pippin2', id })
});