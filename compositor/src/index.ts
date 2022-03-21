import Compositor from "./composer";
import config from "./config";
function main() {
    const compositor = new Compositor(config.port);
    compositor.startServer();
}

main();