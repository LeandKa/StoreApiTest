const { User } = require('../../Models');
const { Cart } = require('../../Models');
const { CartItem } = require('../../Models');
const { Product } = require('../../Models');
const { Categoria } = require('../../Models');
const { factory } = require("factory-girl");
const faker = require('faker');


factory.define("User", User, {
    id:1,
    Name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    permissao: 'commom',
    cartId:1
}),

factory.define("Categoria", Categoria, {
    name: "categoria"
}),

factory.define("Product", Product, {
    title: faker.name.findName(),
    description:faker.name.title(),
    favorite:1,
    categoriaId:1,
    price: 123.34
})


factory.define("Cart",Cart,{
    nomeCart:faker.name.jobTitle()
})

factory.define("CartItem",CartItem,{
    products:1,
    cartItemId:1,
    quantify:1,
    price:123.00,
    total:123.00
})


module.exports = factory;