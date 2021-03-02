import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'

const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET

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

async function getAccessToken({ code, client_id, client_secret }) {
    const request = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    })
    const text = await request.text()
    const params = new URLSearchParams(text)
    return params.get("access_token")
}

async function fetchGitHubUser(token) {
    const request = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: "token " + token
        }
    });
    return await request.json()
}

export default async (request: NowRequest, response: NowResponse) => {

    const code = request.body.userSession
    const access_token = await getAccessToken({ code, client_id, client_secret })
    const userGithub = await fetchGitHubUser(access_token)

    if (userGithub.id == undefined) {
        console.log(code)
        const user = {
            userLoggingIn: false
        }

        console.log(user)

        return response.json(user)
    } 
        const user = {
            userLoggingIn: true,
            id: userGithub.id,
            username: userGithub.login,
            name: userGithub.name,
            avatar: userGithub.avatar_url
        }

        console.log(user)
        const filter = { username: userGithub.login }

        const updateDoc = {
            $set: {
                user
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
    
        return response.json(user)

}


// https://github.com/login/oauth/authorize?client_id=b263019b332553f85c1b&redirect_uri=http://localhost:3000/api/github
