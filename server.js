const app = require('./app');  
const port = 5500;

app.listen(port, function() {  
    console.log('Express server listening on port http://0.0.0.0:' + port);
});