
const childProcess = require('child_process');
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

        childProcess.exec(command, {
            cwd: path.dirname(__dirname)
        }, (error, stdout, stderr) => {
            return new Promise((resovle, reject) => {
                if (error) {
                    reject(error);
                }
                else {
                    resovle(stdout);
                }
            });
        }).then(stdout => {

        }).catch(error => {

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


