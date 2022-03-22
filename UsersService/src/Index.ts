import mongoose from "mongoose";
import Config from "./Config";
import Server from "./Server";

function main() {
    const server = new Server(Config.port);
    mongoose.connect(Config.urlOfDB).then(() => server.startServer()).catch((err) => {
        console.log(`an error:${err}, has accured while connecting to the database. server wont start`);
    });
}

main();
