const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://moomooh.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.json({
        'Hello!': 'welcome to MooMooh.io NFT API'
    });
});

router.get('/mooc1/metadata/:tokenid', (req,res) => {
  let tokenid = req.params.tokenid;
  const finalPart = tokenid.substring(String(tokenid).length,String(tokenid).length-5);
  console.log(finalPart);
  if(finalPart==".json"){
    tokenid = tokenid.substring(0,String(tokenid).length-5);
  }
  console.log(tokenid);
  let ipfsPart = "";
  if(tokenid<=1800){
    ipfsPart = "QmSW2fMVyjrfxRQTjSDg1ktHJpGYppsNe5QE3VNaCmqgVj";
  }else{
    ipfsPart = "QmduWNQnZH3bff9DWxtZmMuxj7HYpXPx1BWUUz9ek6ks3a";
  }
  res.setHeader('Access-Control-Allow-Origin', 'https://moomooh.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.json({
      "image": 'ipfs://'+ ipfsPart +'/' + tokenid + '.png',
      "name": 'MooMooh NFT #' + tokenid,
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

router.get('/mooc2/metadata/:tokenid', (req,res) => {
    const tokenid = req.params.tokenid;
    const mod = tokenid % 1000;
    const infoId = parseInt(tokenid) + parseInt(1);
    const infoImage = parseInt(mod) + parseInt(1);
    res.setHeader('Access-Control-Allow-Origin', 'https://moomooh.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.json({
        "image": 'ipfs://QmSfV3X1KUtpjDaz7ruWrCQmxjvuncWb5wdaPHDQZtBBRf/' + infoImage + '.png',
        "name": 'MooMint NFT #' + infoId,
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

module.exports = app;
module.exports.handler = serverless(app);