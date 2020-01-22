const { User, validate } = require("../models/User");
const redis = require("redis");

async function authenticate(request, response) {}

async function logout(request, response) {}

module.exports = { authenticate, logout };
