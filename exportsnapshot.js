const arrayToCsv = require('arrays-to-csv');
const qs = require('qs');
const axios = require('axios');

let counter = 0;

const dataArrays = [];

let currentResult;

async function makeQueryRequest(){
    try {
        const config = {
            method: 'get',
            url: 'https://xgw7rsdx4aob.usemoralis.com:2053/server/classes/MintPassRedeems',
            data: {
                'order': '-block_number',
                'limit': 1
            },
            headers: {
                'X-Parse-Application-Id': 'Swb5XbAMRJIIswsSq89Kp9qeynciyZnbla1Ki39D'
            }
        }

        const data = await axios(config).then(result => result.data)

        console.log(data)
        currentResult = data.results

    } catch (error) {
        console.log(error);
    }
}

async function makeGetRequest() {
    try {
        const config = {
            method: 'get',
            url: 'https://deep-index.moralis.io/api/v2/nft/0x69eB0E4f570C28C56326D6c78fDE3eC03Aa3b969/owners?chain=eth&format=decimal',
            headers: { 'accept': 'application/json', 'X-API-Key': `${process.env.MORALIS_API_KEY}`}
        }

        const config2 = {
            method: 'get',
            url: 'https://deep-index.moralis.io/api/v2/nft/0xf2c183fdc12e29d7916bbba8fc56953cd70b3559/owners?chain=eth&format=decimal',
            headers: { 'accept': 'application/json', 'X-API-Key': `${process.env.MORALIS_API_KEY}`}
        }

        const data = await axios(config)
            .then(result => result.data)

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