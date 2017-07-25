
const childProcess = require('child_process');
const path = require('path');
let buildPATH = path.join(__dirname, '../');

let api = {
    push (req, res) {
        let params = req.params;
        let gitURL = (params.project['git_http_url'] || params.project['git_ssh_url']);
        let name = params['name'];
        let command = `
            cd ${buildPATH}
            rm -rf ${name}
            git clone ${gitURL}
            cd ${name}
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


