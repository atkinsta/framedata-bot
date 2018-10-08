require("dotenv").config();

const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

const wrap = new Snoowrap({
    userAgent = "framedata-bot",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

const storm = new Snoostorm(wrap);

const stream = {
    subreddit: "Tekken",
    results: 25
}

const comments = storm.CommentStream(stream);

comments.on("comment", comment => {
    console.log("comment");
});
