import express from 'express'

const app = express()

app.use(express.json())
app.post('/users', (req, res) => {
    const { password, email, username } = req.body
    if (!password || !email || !username){
        res.sendStatus(400)
        return
    }
    res.send({token: "eyJhbGciOiJI", message: "User registered with success" })
})

app.post('/auth', (req, res) => {
    const { password, email } = req.body
    if (!password || !email) {
        res.sendStatus(400)
        return
    }
    res.send({token: "eyJhbGciOiJI"})
})

app.get('/users',(req,res) => {
    const  Authorization  = req.headers.authorization
    if( Authorization != "eyJhbGciOiJI"){
        res.sendStatus(401)
        return
    }
    res.send({
        "id": 121212,
        "username": "test",
        "email": "test@test.test",
        "password": "password",
        "imageUrl": "https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg"
      })
})

app.patch('/users', (req, res) => {
    const  Authorization  = req.headers.authorization
    const { password, email, username } = req.body
    if(Authorization != "eyJhbGciOiJI" || !password || !email || !username){
        if( Authorization != "eyJhbGciOiJI"){
            res.sendStatus(401)
            return
        }
        else if (!password || !email || !username){
            res.sendStatus(400)
            return
        }
    }
    res.send({message: "User updated with success" })
})

app.delete('/users',(req,res) => {
    const  Authorization  = req.headers.authorization
    if( Authorization != "eyJhbGciOiJI"){
        res.sendStatus(401)
        return
    }
    res.send({message: "User deleted with success"})
})

app.delete('/all-users',(req,res) => {
    const { key_admin } = req.body
    if (!key_admin || (key_admin != "keyadmin123") ){
        res.sendStatus(400)
        return
    }
    res.send({message: "Users deleted with success"})
})

export default app
