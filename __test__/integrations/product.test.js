const factory = require('../utils/factory');
const request = require('supertest');
const app = require('../../app');
const truncate = require('../utils/truncate');



describe("Product", () => {
    afterAll(async () => {
        await app.close();
    });

    it("Create Product", async () => {

        const productFactory = await factory.create("Product")

        const response = await request(app)
            .post("/product")
            .send(productFactory);

        expect(response.status).toBe(200);
    });

    it("Edit a Product", async () => {
        const productFactory = await factory.create("Product")

        const response = await request(app)
            .put(`/update-Product/${productFactory.id}`)
            .send(productFactory);

        expect(response.status).toBe(200);
    });

    it("Edit User with no Id", async () => {

        const productFactory = await factory.create("Product")

        const response = await request(app)
            .put('/update-Product')
            .set('id', '')
            .send(productFactory);
    });

    it("Delete Product", async () => {

        const productFactory = await factory.create("Product")

        const response = await request(app)
            .delete("/delete-Product")
            .send({
                id: productFactory.id
            });

        expect(response.status).toBe(200);
    });

    it("Delete Product not found", async () => {

        const response = await request(app)
            .delete("/delete-Product")
            .send({
                id: ""
            })

        expect(response.status).toBe(404);

    });
});