import 'dotenv/config'

const Config = {
    port: Number(process.env.INNER_PORT) || 3005,
    urlOfDB: `mongodb://${process.env.MONGO_PATH || 'localhost'}:27017/microserviceTask`,
    dbName: 'microserviceTask',
    peopleCollection: 'people',
};
export default Config;
