const express = require('express')
const router = express.Router();

const someData = [
    {
        "text": "hello",
        "createdAt": "2018-10-08T14:16:50.2152"
    },
    {
        "text": "World",
        "createdAt": "2017-05-06T23:36:50.2152"
    },
]

router.get('/', async (req, res) => {
    const posts = await getSomething();
    res.send(await posts)
});

router.post('/', async (req, res) => {
    const posts = await getSomething();
    await posts.push({
        "text": req.body.text,
        createdAt: new Date(),
    });
    res.status(201).send();
})

router.delete('/:text', async (req, res) => {
    const posts = await getSomething();
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].text === req.params.text) {
            console.log('find it')
            posts.splice(i, 1);
        }
    }
    res.status(200).send();
});

async function getSomething() {
    return someData;
}

module.exports = router;