const axios = require('axios');
const dotenv = require('dotenv');
const Hashids = require('hashids/cjs');
dotenv.config();
const key = process.env.key;
const salt = process.env.salt;

(async () => {
    const r1 = await axios.post(
        "http://localhost:3000/items",
        {
            name: 'New Item'
        },
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    )
    const r2 = await axios.get(
        "http://localhost:3000/items",
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    );
    console.log(r2.data);
    const hashids = new Hashids(salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    const id = 1;
    const code = hashids.encode(id);
    console.log(code);
    const r3 = await axios.get(
        `http://localhost:3000/items/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${code}`,
                'Content-Type': 'application/json',
            }
        }
    );
    console.log(r3.data);
})();