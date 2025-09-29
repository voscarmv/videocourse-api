const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const key = process.env.key;

(async () => {
    const id = 'ai_course';
    const r1 = await axios.post(
        "https://videocourse-api.vercel.app/content",
        {
            id,
            name: 'AI Course',
            description: '# Title'
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
        'https://videocourse-api.vercel.app/accesskey',
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
    const accesskey = r2.data.key;
    const r3 = await axios.post(
        'https://videocourse-api.vercel.app/section',
        {
            content_id: id,
            id: 'lesson_1',
            name: 'Lesson #1',
            markdown: '## Lesson 1',
            vidurl: 'https://www.youtube.com/watch?v=2cXJXacMT7o'
        },
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    );
    const r4 = await axios.post(
        'https://videocourse-api.vercel.app/section',
        {
            content_id: id,
            id: 'lesson_2',
            name: 'Lesson #2',
            markdown: '## Lesson 2',
            vidurl: 'https://www.youtube.com/watch?v=2cXJXacMT7o'
        },
        {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            }
        }
    );
    const r5 = await axios.get(
        `https://videocourse-api.vercel.app/content/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${accesskey}`,
                'Content-Type': 'application/json',
            }
        }
    )
    console.log(r5.data);
})();