const axios = require('axios');
const dotenv = require('dotenv');
const Hashids = require('hashids/cjs');
dotenv.config();
const key = process.env.key;
const salt = process.env.salt;

(async () => {
    const id = 'ai_course';
    const r1 = await axios.post(
        "http://localhost:3000/content",
        {
            id,
            name: 'AI Course'
        },
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    );
    console.log(r1.data);
    const r2 = await axios.post(
        'http://localhost:3000/accesskey',
        {
            content_id: id,
        },
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    )
    console.log(r2.data);
    const accesskey = r2.data.update[0].key;
    const r3 = await axios.post(
        'http://localhost:3000/section',
        {
            content_id: id,
            id: 'lesson_1',
            name: 'Lesson #1'
        },
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    );
    const r4 = await axios.post(
        'http://localhost:3000/section',
        {
            content_id: id,
            id: 'lesson_2',
            name: 'Lesson #2'
        },
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    );
    const r5 = await axios.get(
        `http://localhost:3000/content/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${accesskey}`,
                'Content-Type': 'application/json',
            }
        }
    )
    console.log(r5.data);
    // const r2 = await axios.get(
    //     "http://localhost:3000/content",
    //     {
    //         headers: {
    //             'Authorization': `Bearer ${key}`,
    //             'Content-Type': 'application/json',
    //         }
    //     }
    // );
    // console.log(r2.data);
    // const hashids = new Hashids(salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    // const id = 1;
    // const code = hashids.encode(id);
    // console.log(code);
    // const r3 = await axios.get(
    //     `http://localhost:3000/content/${id}`,
    //     {
    //         headers: {
    //             'Authorization': `Bearer ${code}`,
    //             'Content-Type': 'application/json',
    //         }
    //     }
    // );
    // console.log(r3.data);
})();