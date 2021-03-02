import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'

let cachedDb: Db = null

async function connectToDatabase(uri:string) {

    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('user')

    cachedDb = db
    return db
}

export default async (request: NowRequest, response: NowResponse) => {
    const { level, experience, challenges, login } = request.body
        
    const userExpereience = {
        userLogin: login,
        userLevel: level,
        userExpereience: experience,
        userChallenge: challenges,
    }

    console.log(request.body)

    const filter = { login }

    const updateDoc = {
        $set: {
            userExpereience
        },
      }
    const options = { upsert: true };

    const db = await connectToDatabase(process.env.MONGODB_URI)

    //Inserindo os Dados
    const collection = db.collection('users')
    //await collection.insertOne({
    //    userExpereience, user
    //})

    await collection.updateOne(filter, updateDoc, options) 

    return response.status(201).json({ ok: true })
}