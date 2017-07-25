
const exec = require('child_process').exec;
const path = require('path');
let buildPATH = path.join(__dirname, '../');

let api = {
    push (req, res) {
        let command = `
            cd ${buildPATH}
            rm -rf my-blog
            git clone https://github.com/maoliang2271/my-blog.git
            cd my-blog
            npm i && npm start
        `;

        let child = exec(command);

        child.stdout.on('data', function(data) {
          console.log('stdout: ' + data);
        });
        child.stderr.on('data', function(data) {
          console.log('stdout: ' + data);
        });
        child.on('close', function(code) {
          console.log('closing code: ' + code);
        });
        
    }
};


module.exports = function (req, res) {
    let apiName = req.path.replace('/api/', '');
    if (typeof api[apiName] === 'function') {
        if (req.body) {
            req.params = JSON.parse(JSON.stringify(req.body || {}));
        }
        api[apiName](req, res);
    }
};


