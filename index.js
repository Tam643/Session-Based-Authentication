const http = require('http');
const app = require('./app');

const port = process.env.PORT;

//  server listening
app.listen(port , () => {
    console.log(`Sever running on port ${port}`);
})