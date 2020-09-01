const factory = require('../utils/factory');
const request = require('supertest');
const app = require('../../app');
const truncate = require('../utils/truncate');
const bcrpty = require('bcrypt');

describe("Users", () => {


    afterAll(async () => {
        await app.close();
    });


    it("Create Users", async () => {

        const user = await factory.create("User");

        const response = await request(app)
            .post("/create-user")
            .send({
                Name: user.Name,
                email: user.email,
                password: user.password,
                permissao:user.permissao,
                cartId:user.cartId
            });

        expect(response.status).toBe(200);
    });


    it("Creater Users missing field", async () => {

        const user = await factory.create("User");

        const response = await request(app)
            .post("/create-user")
            .send({
                email: user.email,
                Name: user.Name,
                password: user.password,
                permissao:user.permissao
            });

        expect(response.status).toBe(400);
    });

    it("Delete Users", async () => {
        const user = await factory.create("User")

        const response = await request(app)
            .delete("/delete-User")
            .send({
                id: 1
            });

        expect(response.status).toBe(200);
    });

    it("Delete User not found", async () => {
        const user = await factory.create("User");

        const response = await request(app)
            .delete("/delete-User")
            .send({
                id: ""
            })

        expect(response.status).toBe(404);

    });

    it("Edit a User", async () => {
        const user = await factory.create("User");

        const response = await request(app)
            .put('/update-User')
            .set('id', 1)
            .send({
                Name: user.Name,
                email: user.email,
                password: user.password,
                permissao:user.permissao,
                cartId: user.cartId
            });

        expect(response.status).toBe(200);
    });


    it("Edit User with no Id", async () => {
        const user = await factory.create("User");

        const response = await request(app)
            .put('/update-User')
            .set('id', '')
            .send({
                Name: user.Name,
                email: user.email,
                password: user.avatar,
                permissao: user.permissao
            });
    });

})