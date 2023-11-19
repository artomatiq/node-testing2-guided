const Hobbit = require('./hobbits-model')
const db = require('../../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()    
})

beforeEach( async () => {
    await db.seed.run()
})

test('environment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('getAll', () => {
    test('resolves all the hobbits in the table', async ()=> {
        const result = await Hobbit.getAll()
        expect(result).toHaveLength(4)

    })
})

describe('getById', ()=>{
    test('resolves the hobbit by the given id', async () => {
        let result = await Hobbit.getById(1)
        expect(result).toMatchObject({name: 'sam'})
        result = await Hobbit.getById(2)
        expect(result).toMatchObject({name: 'frodo'})
        result = await Hobbit.getById(3)
        expect(result).toMatchObject({name: 'pippin'})
        result = await Hobbit.getById(4)
        expect(result).toMatchObject({name: 'merry'})                  
    })
})

describe('insert', () => {
    test('resolves the newly-created hobbit', async () => {
        const result = await Hobbit.insert({name:'Jacko'})
        expect(result.id).toBeDefined()
        expect(result.name).toBe('Jacko')
    })
})