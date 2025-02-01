export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    mongo: {
        uri: process.env.DATABASE_URI,
        dbName: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
    },
});
