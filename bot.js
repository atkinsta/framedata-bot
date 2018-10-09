require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");

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

//Very primitive, not smart filter. It'll do. 
const characterList = ["akuma", "alisa", "asuka", "bob", "bryan", "claudio", "dragunov", "eddy", "feng", "geese", "gigas", "heihachi", "hworang", "jack7", "jin", "josie", "katarina", "kazumi", "kazuya", "king", "kuma", "lars", "law", "lee", "leo", "lili", "lucky", "master", "miguel", "nina", "panda", "paul", "shaheen", "steve", "xiaoyu", "yoshimitsu", "eliza", "anna", "lei", "noctis"]

comments.on("comment", comment => {
    if (comment.body.includes("!frames")) {
        let body = comment.body;
        let start = "!frames";
        let reg = new RegExp(start + "\\s(\\w+)");
        console.log(body.match(reg));
        let term = body.match(reg);
        if (term[1] === "Lucky") {
            comment.reply(`[Lucky Chloe's Frame Data](http://rbnorway.org/lucky-chloe-t7-frames/)\n\n\n^^This ^^is ^^a ^^bot. ^^To ^^learn ^^more ^^about ^^usage ^^visit [^^my ^^github](http://www.github.com/atkinsta/framedata-bot)`)
        }
        else if (term[1] === "Devil") {
            comment.reply(`[Devil Jin's Frame Data](http://rbnorway.org/devil-jin-t7-frames/)\n\n\n^^This ^^is ^^a ^^bot. ^^To ^^learn ^^more ^^about ^^usage ^^visit [^^my ^^github](http://www.github.com/atkinsta/framedata-bot)`)
        }
        else if (term[1] === "Master") {
            comment.reply(`[Master Raven's Frame Data](http://rbnorway.org/master-raven-t7-frames/)\n\n\n^^This ^^is ^^a ^^bot. ^^To ^^learn ^^more ^^about ^^usage ^^visit [^^my ^^github](http://www.github.com/atkinsta/framedata-bot)`)
        }
        else if (characterList.includes(term[1].toLowerCase())) {
            comment.reply(`[${term[1]}'s Frame Data](http://rbnorway.org/${term[1]}-t7-frames/)\n\n\n^^This ^^is ^^a ^^bot. ^^To ^^learn ^^more ^^about ^^usage ^^visit [^^my ^^github](http://www.github.com/atkinsta/framedata-bot)`)
        }
        else {
            comment.reply("I couldn't find that character.")
        }   
    }
});

app.listen(process.env.PORT, () => {
    console.log("Bot started");
});

app.get("/", (req, res) => {
    res.json("All good");
});

setInterval(function() {
    http.get("http://pure-savannah-70164.herokuapp.com/");
}, 300000);
