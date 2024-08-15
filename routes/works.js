var express = require("express");
var router = express.Router();

const axios = require("axios");
const client = axios.create();

client.defaults.headers.common.Authorization =
    "secret_T5SmjIBJXh5h5mBvvyXwZ58yyJB2bu3ZUV01NxhTCVO";
client.defaults.headers.common["Notion-Version"] = "2022-06-28";

/* GET users listing. */

router.get("/block/:blockId", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { blockId } = req.params;
    try {
        // const { data } = await client.get(
        //     `https://api.notion.com/v1/blocks/${blockId}/children`
        // );
        const pageRes = await client.get(
            `https://api.notion.com/v1/pages/${blockId}`
        );
        const blockRes = await client.get(
            `https://notion-api.splitbee.io/v1/page/${blockId}`
        );
        // console.log(data);
        return res.send({ page: pageRes.data, blockObj: blockRes.data });
    } catch (e) {
        console.log("error::::", e.message);
    }
    res.render("index", { title: "Express" });
});

router.get("/database/:databaseId", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { databaseId } = req.params;
    try {
        const pageListRes = await client.post(
            `https://api.notion.com/v1/databases/${databaseId}/query`
        );

        return res.send(pageListRes.data.results);
    } catch (e) {
        console.log("error::::", e.message);
    }
    res.render("index", { title: "Express" });
});

module.exports = router;
