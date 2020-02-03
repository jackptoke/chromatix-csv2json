const fs = require('fs');
const csv2json = require('csv2json');

const orderJson = './ordersJson.json';
const orderCSV = './node-data-processing-medium-data.csv';
let books = convertCSVOrdersToJSON();

//A method to convert CSV to JSON
function convertCSVOrdersToJSON(){
    if(fs.existsSync(orderCSV)){
        try{
            const start =  new Date();
            console.log("Start converting..." + start);
            fs.createReadStream(orderCSV)//reading the CSV data
            .pipe(csv2json({ //converting the CSV to JSON objects
                separator: ','
            }))
            .pipe( fs.createWriteStream(orderJson) //writing the result to a JSON file
                .on('finish', ()=>{ 
                    //when finishes saving the file
                    //calculate how long it took to complete the task
                    const finish = new Date();
                    const timeTaken = finish.getTime() - start.getTime();
                    const milliSecondInASecond = 1000;
                    console.log("Finish converting..." + finish);
                    console.log("It took: " + (timeTaken/milliSecondInASecond) + "seconds.");
                    })
            );
        }
        catch(err){
            console.error(err);
        }
    }
}