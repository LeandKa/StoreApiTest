const factory = require('../utils/factory');
const request = require('supertest');
const app = require('../../app');
const truncate = require('../utils/truncate');



describe("Categoria", () => {

    afterAll(async () => {
        await truncate();
        await app.close();
    });

    it("Create Categoria", async () => {

        const categoria = await factory.create("Categoria");

        const response = await request(app)
            .post("/categoria")
            .send({
                name: categoria.name
            });

        expect(response.status).toBe(200);
    });

    it("Create Categoria with no fields", async () => {
        const categoria = await factory.create("Categoria");

        const response = await request(app)
            .post("/categoria")
            .send({
                name: null
            });

        expect(response.status).toBe(400);

    });
    it("Delete Categoria", async () => {
        const categoria = await factory.create("Categoria");

        const response = await request(app)
            .delete("/delete-Categoria")
            .send({
                id: categoria.id
            });

        expect(response.status).toBe(200);

    });

});