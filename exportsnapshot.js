const data = require('./nov22.json'); 
const arrayToCsv = require('arrays-to-csv');

const dataArrays = [];
let counter = 0

data.result.map(result => {
    for (let i = 0; i < result.amount; i++) {
        dataArrays.push({"index": counter, "wallet": result.owner_of})
        counter += 1;
    }
});
    // dataArrays.push({"wallet": result.owner_of, "amount": result.amount})
    

console.log(dataArrays);

//Create the generator
var csvGenerator = new arrayToCsv(dataArrays, { delimiter: ',', quote: '' });

//Execute the method
csvGenerator.saveFile('./data.csv');