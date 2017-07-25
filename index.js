/**
 * Created by baidu on 17/4/19.
 */
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.use('/static', express.static('asserts'));

app.use('/api/*', bodyParser.json());


app.all('/api/*', require('./app/api'));


let server = app.listen(8000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('BFE Publisher http://%s:%s', host, port);
});