var express = require("express");
var app = express();
var cors = require("cors");
const tmi = require("tmi.js");
const fetch = require("node-fetch");
global.fetch = fetch;

const { BOT_USERNAME, OAUTH_TOKEN, ACCESS_TOKEN } = require("./tokens");

const Unsplash = require("unsplash-js").default;

const unsplash = new Unsplash({ accessKey: ACCESS_TOKEN });

app.use(cors());

const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN,
  },
};

let story = [];

const client = new tmi.client(opts);
client.on("message", onMessageHandler);
client.connect();

function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  }
  const message = msg;
  const command = message.split(" ", 1)[0];

  if (message.startsWith("!nextline")) {
    const newStoryLine = message.substring(9);

    story.push(newStoryLine);

    client.say(target, `${newStoryLine}`);
  } else if (message.startsWith("!prevline")) {
    client.say(target, `${story[story.length - 1]}`);
  } else if (message.startsWith("!stop")) {
    client.say(target, `${story.join("")}`);
  }
}

app.get("/story/start/:username", function (req, res) {
  console.log(req.params.username);
  const username = req.params.username;
  story = [];
  client.join(username);
  res.send("story started");
});

app.get("/story/stop/:username", async function (req, res) {
  const username = req.params.username;

  client.part(username);

  const resp = await getResponse(story);
  console.log(resp);

  const ret = { username, story: resp };

  res.send(ret);
});

app.listen(5000);

async function getResponse(story) {
  let resp = [];
  for (const line of story) {
    await unsplash.photos
      .getRandomPhoto({ query: line, count: 1 })
      .then((res) => res.json())
      .then((json) => {
        resp.push({ text: line, image: json[0]["urls"]["regular"] });
      });
  }

  console.log(resp);

  return resp;
}
