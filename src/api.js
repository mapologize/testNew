const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/', (req,res) => {
    res.json({
        'Hello!': 'welcome to MooMooh.io NFT API'
    });
});

router.get('/mooc2/metadata/:tokenid', (req,res) => {
    const tokenid = req.params.tokenid;
    const mod = tokenid % 1000;
    const infoId = parseInt(tokenid) + parseInt(1);
    const infoImage = parseInt(mod) + parseInt(1);
    res.json({
        "image": 'ipfs://QmSfV3X1KUtpjDaz7ruWrCQmxjvuncWb5wdaPHDQZtBBRf/' + infoImage + '.png',
        "name": 'MooMooh Glass #' + infoId,
        "external_url": "",
        "description": "Playing Oracle NFT with MooMooh.io",
        "attributes": [
          {
            "trait_type": "Website",
            "value": "moomooh.io"
          }
        ],
        "unlockable_content": [],
        "explicit_and_sensitive_content": false
    });
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);