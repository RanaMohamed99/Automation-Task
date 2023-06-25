const request = require('supertest');
const assert = require('assert');
import app from '../../../app.js'

describe("POST /users", () => {

    describe("given a username and password", () => {
        
        it('should specify json in the content type header', async () => {
            const response = await request(app).post("/users").send({
                email:"test@test.com",
                username: "test",
                password: "password" 
            })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        it('should respond with a token', async () => {
            const response = await request(app).post("/users").send({
                email:"test@test.com",
                username: "test",
                password: "password" 
            })
            expect(response.body.token).toBeDefined()
        })
        it('should respond with a successfull message', async () => {
            const response = await request(app).post("/users").send({
                email:"test@test.com",
                username: "test",
                password: "password"  
            })
            expect(response.body.message).toEqual("User registered with success")
        })
    })

    describe("when email or username or password are missing", () => {

        it('should respond with a 400 when email is mising', async () => {
            const response = await request(app).post("/users").send({
                username: "test",
                password: "password"  
            })
            expect(response.statusCode).toBe(400)
        })
        it('should respond with a 400 when username is missing', async () => {
            const response = await request(app).post("/users").send({
                email: "test@test.test",
                password: "password"  
            })
            expect(response.statusCode).toBe(400)
        })
        it('should respond with a 400 when password is missing', async () => {
            const response = await request(app).post("/users").send({
                email: "test@test.test",
                username: "test", 
            })
            expect(response.statusCode).toBe(400)
        })

    })
})

describe("POST /auth", () => {

    describe("given email and password", () => {
        
        it('should specify json in the content type header', async () => {
            const response = await request(app).post("/auth").send({
                email:"test@test.com",
                password: "password" 
            })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        it('should respond with a token', async () => {
            const response = await request(app).post("/auth").send({
                email:"test@test.com",
                password: "password" 
            })
            expect(response.body.token).toBeDefined()
        })
    })

    describe("when email or username or password are missing", () => {

        it('should respond with a 400 when email is mising', async () => {
            const response = await request(app).post("/auth").send({
                password: "password"  
            })
            expect(response.statusCode).toBe(400)
        })
        it('should respond with a 400 when password is mising', async () => {
            const response = await request(app).post("/auth").send({
                username: "test", 
            })
            expect(response.statusCode).toBe(400)
        })

    })
})

describe("GET /users",  () => {
    
    describe("given a valid authorization header", () => {

        it('should respond with a json of user data', async () => {
            const response = await request(app).get("/users")
            .set('Authorization' , 'eyJhbGciOiJI')
            expect(response.statusCode).toBe(200)
            expect(response.body.email).toEqual('test@test.test')
            expect(response.body.username).toEqual('test')
        })
        
    })

    describe("given an invalid authorization header", () => {

        it('should respond with status code 401 incase of invalid authorization header', async () => {
            const response = await request(app).get("/users")
            .set('Authorization' , 'wewewewewewe')
            expect(response.statusCode).toBe(401)
        })
        it('should respond with status code 401 incase of invalid authorization header', async () => {
            const response = await request(app).get("/users")
            .set('Authorization' , 12345)
            expect(response.statusCode).toBe(401)
        })

    })
})

describe("PATCH /users",  () => {
    
    describe("given a valid authorization header and body", () => {

        it('should respond with successful message', async () => {
            const response = await request(app).patch("/users")
            .set('Authorization' , 'eyJhbGciOiJI')
            .send({
                email:"newtest@test.com",
                username: "newtest",
                password: "newpassword" 
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toEqual("User updated with success")
        })
        
    })

    describe("given an invalid authorization header and body", () => {

        it('should respond with status code 401 in case of invalid authorization header', async () => {
            const response = await request(app).patch("/users")
            .set('Authorization' , 'wewewewewewe')
            .send({
                email:"newtest@test.com",
                username: "newtest",
                password: "newpassword" 
            })
            expect(response.statusCode).toBe(401)
        })
        it('should respond with status code 400 in case of missing email', async () => {
            const response = await request(app).patch("/users")
            .set('Authorization' , 'eyJhbGciOiJI')
            .send({
                username: "newtest",
                password: "newpassword" 
            })
            expect(response.statusCode).toBe(400)
        })
        it('should respond with status code 400 in case of missing username', async () => {
            const response = await request(app).patch("/users")
            .set('Authorization' , 'eyJhbGciOiJI')
            .send({
                email:"newtest@test.com",
                password: "newpassword" 
            })
            expect(response.statusCode).toBe(400)
        })
        it('should respond with status code 400 in case of missing password', async () => {
            const response = await request(app).patch("/users")
            .set('Authorization' , 'eyJhbGciOiJI')
            .send({
                username: "newtest",
                email:"newtest@test.com",
            })
            expect(response.statusCode).toBe(400)
        })
        it('should respond with status code 400 in case of missing body', async () => {
            const response = await request(app).patch("/users")
            .set('Authorization' , 'eyJhbGciOiJI')
            .send({})
            expect(response.statusCode).toBe(400)
        })

    })
})

describe("DELETE /users",  () => {
    
    describe("given a valid token", () => {

        it('should respond with a message of successfully deleting user', async () => {
            const response = await request(app).delete("/users")
            .set('Authorization' , 'eyJhbGciOiJI')
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toEqual("User deleted with success")
        })
        
    })

    describe("given an invalid token", () => {

        it('should respond with status code 401 incase of invalid authorization header', async () => {
            const response = await request(app).delete("/users")
            .set('Authorization' , 'wewewewewewe')
            expect(response.statusCode).toBe(401)
        })
        it('should respond with status code 401 incase of invalid authorization header', async () => {
            const response = await request(app).delete("/users")
            .set('Authorization' , 12345)
            expect(response.statusCode).toBe(401)
        })

    })
})

describe("DELETE /all-users",  () => {
    
    describe("given a valid keyadmin", () => {

        it('should respond with a message of successfully deleting user', async () => {
            const response = await request(app).delete("/all-users")
            .send({
                key_admin: "keyadmin123"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toEqual("Users deleted with success")
        })
        
    })

    describe("given an invalid keyadmin", () => {

        it('should respond with status code 401 incase of invalid authorization header', async () => {
            const response = await request(app).delete("/all-users")
            .send({
                key_admin: "keyadmin12keyyyy3"
            })
            expect(response.statusCode).toBe(400)
        })
        it('should respond with status code 401 incase of invalid authorization header', async () => {
            const response = await request(app).delete("/all-users")
            .send({})
            expect(response.statusCode).toBe(400)
        })

    })
})

