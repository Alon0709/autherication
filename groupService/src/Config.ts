import 'dotenv/config'

const Config = {
    port: Number(process.env.INNER_PORT) || 4321,
    urlOfDB: `mongodb://${process.env.MONGO_PATH || 'localhost'}:27017/microserviceTask`,
    dbName: 'microserviceTask',
    groupsCollection: 'groups',
};
export default Config;