var fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


async function f1(url, index) {

    console.log(url+" "+index)

    try {

        let response = await fetch(url);

        let commits = await response.json();


        fs.writeFile('./fixtures/'+index+'.json', JSON.stringify(commits), (err) => {

            // In case of a error throw err.
            if (err) throw err;
        })
    } catch (error) {
        console.log("passed");
    }

}

function createJson(){

    fs.readFile('urls.txt', function read(error, data) {
        if (error) { throw error; }
        data.toString().split("\n").forEach(function(line, index, arr) {
            if (index === arr.length - 1 && line === "") { return; }
            f1(line, index);
        });
        console.log("end");
    });

}

createJson()