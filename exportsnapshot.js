const arrayToCsv = require('arrays-to-csv');
const axios = require('axios');

let counter = 0;

const dataArrays = [];

async function makeGetRequest() {
    try {
        const config = {
            method: 'get',
            url: 'https://deep-index.moralis.io/api/v2/nft/0x69eb0e4f570c28c56326d6c78fde3ec03aa3b969/owners?chain=eth&format=decimal',
            headers: { 'accept': 'application/json', 'X-API-Key': `${process.env.MORALIS_API_KEY}`}
        }
    
        const data = await axios(config).then(result => result.data)
        data.result.map(result => {
            let amount = result.amount;
            if(result.owner_of == '0x5a379aacf8bf1e9d4e715d00654846eb1cfc8a76') { return }
            if(result.amount == 3) { amount = 5};
            if(result.amount == 4) { amount = 10};
            if(result.amount == 5) { amount = 25};
            for (let i = 0; i < amount; i++) {
                dataArrays.push({"index": counter, "wallet": result.owner_of})
                counter += 1;
            }
        });
    } catch (error) {
        console.log(error)
    }
}

async function makeCSV(array){
    var csvGenerator = new arrayToCsv(array, { delimiter: ',', quote: '' });

    const today = new Date(Date.now())
    //Execute the method
    csvGenerator.saveFile(`./${today}.csv`);
}

async function main(){
    await makeGetRequest();
    await makeCSV(dataArrays);
}

main();