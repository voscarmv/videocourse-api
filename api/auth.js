const db = require('./db');
const dotenv = require('dotenv');
const Hashids = require('hashids/cjs');

dotenv.config();

const key = process.env.key;
const salt = process.env.salt;

function makeHash(id) {
    const hashids = new Hashids(salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    return hashids.encode(id);
}

function keyVerify(req, res, next) {
    const keyver = req.headers['authorization']?.replace('Bearer ', '');
    if (!keyver) {
        return res.status(401).json({ message: 'No key found in headers.' });
    }
    if (keyver !== key) {
        return res.status(401).json({ message: 'Wrong key.' });
    }
    next();
}

async function hashVerify(req, res, next) {
    const content_id = req.params.id;
    const key = req.headers['authorization']?.replace('Bearer ', '');
    const keyver = await db.readAccessKey(content_id, key);
    if (!key) {
        return res.status(401).json({ message: 'No key found in headers.' });
    }
    if (!keyver) {
        return res.status(401).json({ message: 'Wrong key.' });
    }
    if (keyver.length < 1) {
        return res.status(401).json({ message: 'Wrong key.' });
    }
    next();
}

module.exports = {
    makeHash,
    keyVerify,
    hashVerify
}