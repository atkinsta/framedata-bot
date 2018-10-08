require("dotenv").config();

const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

const wrap = new Snoowrap({
    userAgent: "framedata-bot",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

wrap.config({requestDelay: 1000, warnings: false, continueAfterRatelimitError: true})

const storm = new Snoostorm(wrap);

const stream = {
    subreddit: "Tekken",
    results: 25
}

const comments = storm.CommentStream(stream);

comments.on("comment", comment => {
    if (comment.body.includes("!frames")) {
        let body = comment.body;
        let start = "!frames";
        let reg = new RegExp(start + "\\s(\\w+)");
        console.log(body.match(reg));
        let term = body.match(reg);
        comment.reply(`[${term[1]}'s Frame Data](http://rbnorway.org/${term[1]}-t7-frames/)\n\n\n^^This ^^is ^^a ^^bot. ^^To ^^learn ^^more ^^about ^^usage ^^visit [^^my ^^github](http://www.github.com/atkinsta/framedata-bot)`)
    }
});
