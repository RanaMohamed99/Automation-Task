import supertest from 'supertest';
const api = supertest('http://localhost:3000/api/v1');
var tokenn;

describe("POST /users", () => {

    describe("given an email, name and password", () => {
        
        it('should respond with a token', async () => {
            const response = await api.post('/users').send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.token).toBeDefined()
        })
        it('should respond with a success message', async () => {
            const response = await api.post('/users').send({
                "name": "user1",
                "email": "user1@gmail.com",
                "password": "user123"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toEqual("User registered with success")
        })
        
    })

    describe("when given an invalid request body", () => {

        it('should respond with status code 400 bad request when given an empty request body', async () => {
            const response = await api.post('/users').send({})
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(400)
        })
        it('should respond with status code 400 bad request when given no request body', async () => {
            const response = await api.post('/users')
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(400)
        })

    })
    describe("when email is already registered", () => {

        it('should respond with status code 401 unauthorized', async () => {
            const response = await api.post('/users').send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
            })
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(401)
            expect(response.body.message).toEqual("User already registered")
        })
    })
})

describe("POST /auth", () => {

    describe("given a valid email and password", () => {
        
        it('should respond with token', async () => {
            const response = await api.post('/auth').send({
                "email": "user@gmail.com",
                "password": "user123"
            })
            .set("Content-type", "application/json")
            tokenn = response.body.token;
            expect(response.statusCode).toBe(200)
            expect(response.body.token).toBeDefined()
        })
    })

    describe("when email or password are invalid", () => {

        it('should respond with status code 401 unauthorized when email is inccorect', async () => {
            const response = await api.post('/auth').send({
                "email": "user@gmail.com",
                "password": "user1234"
            })
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(401)
            expect(response.body.message).toEqual('Incorrect email or password')
        })
        it('should respond with status code 401 unauthorized when password is incorrect', async () => {
            const response = await api.post('/auth').send({
                "email": "userr@gmail.com",
                "password": "user123"
            })
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(401)
            expect(response.body.message).toEqual('Incorrect email or password')
        })

        it('should respond with status code 400 of bad request when request body is epmty', async () => {
            const response = await api.post('/auth').send({})
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(400)
        })
        it('should respond with a status code 400 of bad request when there is no request body', async () => {
            const response = await api.post('/auth')
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(400)
        })

    })
})

describe("GET /users",  () => {
    
    describe("given a valid authorization header", () => {

        it('should respond with a json of user data', async () => {
            const response = await api.get('/users')
            .set('Authorization', tokenn)
            .expect("Content-type", "application/json; charset=utf-8")
            expect(response.statusCode).toBe(200)
            expect(typeof response.body.id).toBe("number")
            expect(response.body.email).toEqual('user@gmail.com')
            expect(response.body.name).toEqual('user')
            expect(response.body.password).toEqual('user123')
            expect(response.body.imageUrl).toEqual('https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg')
        })
        
    })

    describe("given an invalid authorization header", () => {

        it('should respond with status code 403 forbidden incase of invalid authorization header', async () => {
            const response = await api.get('/users')
            .set('Authorization' , 'wewewewewewe')
            expect(response.statusCode).toBe(403)
        })
    })
})

describe("PATCH /users",  () => {
    
    describe("given a valid authorization header and body", () => {

        it('should respond with successful message and updated values', async () => {
            const response = await api.patch('/users')
            .set('Authorization' , tokenn)
            .send({
                "name": "newName",
                "email": "new_email@gmail.com",
                "password": "newpassword123"
            })
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toEqual('User updated with success')
        })

        it('should respond with updated email when updating email only', async () => {
            const response = await api.post('/auth').send({
                "email": "new_email@gmail.com",
                "password": "newpassword123"
            })
            tokenn = response.body.token;
            const responsee = await api.patch('/users')
            .set('Authorization' , tokenn)
            .set("Content-type", "application/json")
            .send({
                "email": "new_email2@gmail.com",
            })
            .expect("Content-type", "application/json; charset=utf-8")
            expect(responsee.statusCode).toBe(200)
            expect(responsee.body.data.email).toEqual('new_email2@gmail.com')
            expect(responsee.body.data.name).toEqual('newName')
            expect(responsee.body.data.password).toEqual('newpassword123')
        })
        
    })

    describe("given an invalid authorization header or empty request body", () => {

        it('should respond with status code 403 forbidden in case of invalid authorization header', async () => {
            const response = await api.patch('/users')
            .set('Authorization' , "testtt")
            .send({
                email:"newtest@test.com",
                username: "newtest",
                password: "newpassword" 
            })
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(403)
        })
        it('should respond with status code 400 of bad request incase of empty request body', async () => {
            const response = await api.post('/auth').send({
                "email": "new_email2@gmail.com",
                "password": "newpassword123"
            })
            tokenn = response.body.token;
            const response1 = await api.patch('/users')
            .set('Authorization' , tokenn)
            expect(response1.statusCode).toBe(400)
        })

    })
})

describe("DELETE /users",  () => {
    
    describe("given a valid authorization token", () => {

        it('should respond with a message of successfully deleting user', async () => {
            const response = await api.post('/auth').send({
                "email": "new_email2@gmail.com",
                "password": "newpassword123"
            })
            tokenn = response.body.token;
            const response1 = await api.delete('/users')
            .set('Authorization' ,tokenn)
            .set("Content-type", "application/json")
            expect(response1.statusCode).toBe(200)
            expect(response1.body.message).toEqual('User deleted with success')
        })
        
    })

    describe("given an invalid authorization token", () => {

        it('should respond with status code 403 forbidden incase of invalid authorization header', async () => {
            const response = await api.delete('/users')
            .set('Authorization' , 'wewewewewewe')
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(403)
            expect(response.body.message).toEqual('Unauthorized to delete')
        })
    })
})

describe("DELETE /all-users",  () => {
    
    describe("given a valid keyadmin", () => {

        it('should respond with a message of successfully deleting user', async () => {
            const response = await api.delete('/all-users')
            .send({
                "key_admin" : "keyadmin123"
            })
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toEqual('Users deleted with success')
        })
        
    })

    describe("given an invalid request body", () => {

        it('should respond with status code 403 forbidden incase of invalid key admin', async () => {
            const response = await api.delete('/all-users')
            .set("Content-type", "application/json")
            .send({
                "key_admin": "keyadmin12keyyyy3"
            })
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(403)
            expect(response.body.message).toEqual('Unauthorized access')
        })
        it('should respond with status code 400 forbidden incase empty request body', async () => {
            const response = await api.delete('/all-users')
            .set("Content-type", "application/json")
            expect(response.statusCode).toBe(400)
        })
    })
})

