require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const prefix = "!";

var players;

client.once("ready", () => {
    console.log("Odds Bot is online!");
    getData();
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    let name = message.author.username;
    let command = args[0];

    switch(command) {
        case "join":
            if (players.hasOwnProperty(name)) {
                message.channel.send("You have already joined!");
                return;
            }
            players[name] = {score: 0, status: "Yes", username: ""};
            fs.writeFile("players.json", JSON.stringify(players), finished);
            showData(message);
            break;
        case "win":
            if (!players.hasOwnProperty(name)) {
                message.channel.send("You have not joined!");
                return;
            }

            players[name].score = parseFloat(players[name].score) + 1;
            fs.writeFile("players.json", JSON.stringify(players), finished);
            showData(message);
            break;
        case "oops":
            if (!players.hasOwnProperty(name)) {
                message.channel.send("You have not joined!");
                return;
            }

            players[name].score = parseFloat(players[name].score) - 1;
            fs.writeFile("players.json", JSON.stringify(players), finished);
            showData(message);
            break;
        case "unpause":
            if (!players.hasOwnProperty(name)) {
                message.channel.send("You have not joined!");
                return;
            }

            players[name].status = "Yes";
            fs.writeFile("players.json", JSON.stringify(players), finished);
            showData(message);
            break;
        case "pause":
            if (!players.hasOwnProperty(name)) {
                message.channel.send("You have not joined!");
                return;
            }

            players[name].status = "No";
            fs.writeFile("players.json", JSON.stringify(players), finished);
            showData(message);
            break;
        case "name":
            if (args.length < 2) {
                message.channel.send("Please specify a name for yourself!");
                return;
            }

            players[name].username = args[1];
            fs.writeFile("players.json", JSON.stringify(players), finished);
            showData(message);
            break;
        case "show":
            showData(message);
            break;
        case "help":
            message.channel.send("Use the following commands:\n!join to add yourself to the competition\n!win to add a point to yourself\n!oops to remove a point from yourself\n!show to display the current standings \n!name <your username> to set your lichess username\n!pause to take a break from receiving challenges\n!unpause to re-join the competition – please don't @ players who are inactive\n!help to show this list.");
            break;
        }
});

function showData(message) {
    let playersArray = [];
    for (let key in players) {
        playersArray.push([key, players[key].score, players[key].status, players[key].username]);
    }

    playersArray.sort(function(a, b) {
        return b[1] - a[1];
    });

    columns = [["   Player"], ["Wins"], ["Active"], ["Lichess Name"]];
    for (let i = 0; i < playersArray.length; i += 1) {
        let player = playersArray[i];
        columns[0].push(`${i+1}. ${player[0]}`);
        columns[1].push(`${player[1]}`);
        columns[2].push(`${player[2]}`);
        columns[3].push(`${player[3]}`);
    }

    for (let column of columns) {
        let maxLength = 0;
        for (let i = 0; i < column.length; i += 1) {
            maxLength = Math.max(maxLength, column[i].length);
        }
        for (let i = 0; i < column.length; i += 1) {
            column[i] += " ".repeat(maxLength - column[i].length + 3);
        }
    }

    rows = transpose(columns);

    let text = "```";
    for (let i = 0; i < rows.length; i += 1) {
        for (let j = 0; j < rows[i].length; j += 1) {
            text += rows[i][j];
        }
        text += "\n";
    }
    text += "```";

    message.channel.send(text);

}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function getData() {
    let playersData = fs.readFileSync("players.json");
    players = JSON.parse(playersData);
}

function finished() {
    // Just a blank callback function for readFile()
}

client.login("ODA4NDkzMzU5ODA2OTM5MTQ2.YCHWHg._2VG3y5g4_vY7kcMxvw4wx98vZI");
