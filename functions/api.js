import express from "express";
import serverless from "serverless-http";

let app = express();
let router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get('/test', async (req,res) => {
    res.json({
        hello: "test!"
      });

})

router.post('/testpost', async (req,res) => {
    res.json({
        hello: "hit the POST!"
      });
})

app.use(`/.netlify/function/api`, router);

export default app;
export const handler = serverless(app);