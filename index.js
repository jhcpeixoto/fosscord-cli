#!/usr/bin/env node
const { program } = require("commander");
const exec = require("child_process").execSync;
const pm2 = require("pm2");

const apiUrl = "https://github.com/fosscord/fosscord-api";
const gatewayUrl = "https://github.com/fosscord/fosscord-gateway";

function init() {
    console.log("Cloning the repos...");
    exec(
        "git clone " + apiUrl + " api && git clone " + gatewayUrl + " gateway"
    );
    console.log("Installing dependancies...");
    exec("cd api && npm i && cd ../gateway && npm i");
    console.log(
        "NOTE: You should complete the installation with the adding of the database (see https://docs.fosscord.com/contributing.html#mongodb for instructions)."
    );
}
program.command("init").description("initialize the instance").action(init);

function start() {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        console.log("Starting API...");
        pm2.start(
            {
                name: "fosscord-api",
                script: "cd api && npm run start",
                exec_mode: "cluster",
            },
            function (err, apps) {
                pm2.disconnect();
                if (err) throw err;
            }
        );

        console.log("Starting gateway...");
        pm2.start(
            {
                name: "fosscord-gateway",
                script: "cd gateway && npm run start",
                exec_mode: "cluster",
            },
            function (err, apps) {
                pm2.disconnect();
                if (err) throw err;
            }
        );
    });
}
program.command("start").description("start the instance").action(start);

function stop() {
    console.log("Stopping API...");
    pm2.stop("fosscord-api", (err, proc) => {
        if (err) throw err;
    });

    console.log("Stopping gateway...");
    pm2.stop("fosscord-gateway", (err, proc) => {
        if (err) throw err;
    });
}
program.command("stop").description("stop the instance").action(stop);

function update() {
    console.log("Updating the instance...");
    exec("cd api && git pull && npm i && cd ../gateway && git pull && npm i");
}
program.command("update").description("update the instance").action(update);

program.parse();
