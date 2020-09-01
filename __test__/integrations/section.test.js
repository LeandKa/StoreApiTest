const factory = require('../utils/factory');
const request = require('supertest');
const app = require('../../app');
const truncate = require('../utils/truncate');



describe("Authentication", () => {

    afterAll(async () => {
        await app.close();
    });


    it("authentication user and password with fields", async () => {

        const user = await factory.create("User");

        const response = await request(app)
            .post("/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(response.status).toBe(200);
    });

        it("authentication email with invalid field", async () => {

            const user = await factory.create("User");

            const response = await request(app)
                .post("/login")
                .send({
                    email: "email",
                    password: user.password
                });
            expect(response.status).toBe(400);

        });

    it("authentication password with invalid field", async () => {

        const user = await factory.create("User");

        const response = await request(app)
            .post("/login")
            .send({
                email: user.email,
                password: "1212"
            });
        expect(response.status).toBe(400);
    });

    it("authentication valid fields with token return ", async () => {
        const user = await factory.create("User");

        const response = await request(app)
            .post("/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(response.body).toHaveProperty("token");

    });

    it("Access a private route with token valid", async () => {

        const user = await factory.create("User");

        const response = await request(app)
            .get("/DashBoard")
            .set("token", user.generateToken());

        expect(response.status).toBe(200)

    });

    it("Access a private route with no token", async () => {

        const user = await factory.create("User");

        const response = await request(app)
            .get("/DashBoard")


        expect(response.status).toBe(401)

    });

    it("Access a private route with no token valid", async () => {
        const user = await factory.create("User");

        const response = await request(app)
            .get("/DashBoard")
            .set("token", "12121");

        expect(response.status).toBe(401);
    });
})
