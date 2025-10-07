const fetch = require('node-fetch');
const secretId = process.env.BELVO_ID;
const secretPassword = process.env.BELVO_PASSWORD;
const baseUrl = process.env.BASE_URL;

function generateExternalId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result;
    result = '';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("External ID generated:", result);
    return result;
}


async function getAllOwners(linkId) {

    const query = new URLSearchParams({
        link: linkId,
        page_size: '100',
        page: '1',
    }).toString();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        // body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/owners/?${query}`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));
    // console.log(data.results);
    var owners = [];
    if(data.results){
        data.results.forEach((element) => {
            let owner = {
                firstName: element.first_name,
                lastName: element.last_name,
                fullName: element.display_name,
                email: element.email,
                document_type: element.document_id.document_type,
                document_number: element.document_id.document_number,
                phone: element.phone_number,
                id: element.id
            };
            owners.push(owner)
        });
    }
   
    // console.log(result);
    return owners;
}

async function getAllAccounts(linkId) {

    const query = new URLSearchParams({
        link: linkId,
        page_size: '100',
        page: '1',
    }).toString();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        // body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/accounts/?${query}`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    var accounts = [];

    data.results.forEach((element) => {
        // console.log(element);
        let account = {
            name: element.name,
            type: element.type,
            number: element.number,
            currency: element.currency,
            category: element.category,
            id: element.id
        };
        accounts.push(account)
    });
    // console.log(result);
    return accounts;
}

async function getAllTransactions(linkId) {

    const query = new URLSearchParams({
        link: linkId,
        page_size: '100',
        page: '1',
    }).toString();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        // body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/transactions/?${query}`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    var transactions = [];

    if(data.results){
        data.results.forEach((element) => {
            // console.log(element);
            let transaction = {
                name: element.account.name,
                type: element.type,
                number: element.account.number,
                currency: element.currency,
                category: element.category,
                merchant: element.merchant.name,
                amount: element.amount,
                id: element.id
            };
            transactions.push(transaction)
        });
    };

    
    // console.log(result);
    return transactions;
}

async function getAllBalances(linkId) {

    const query = new URLSearchParams({
        link: linkId,
        page_size: '100',
        page: '1',
    }).toString();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        // body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/br/balances/?${query}`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    var balances = [];
    
    if(data.results){
        data.results.forEach((element) => {
            // console.log(element);
            let balance = {
                currency: element.currency,
                available: element.available,
                blocked: element.blocked,
            };
            balances.push(balance);
        });
    };

    
    // console.log(result);
    return balances;
}

async function getAllBills(linkId) {

    const query = new URLSearchParams({
        link: linkId,
        page_size: '100',
        page: '1',
    }).toString();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        // body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/bills/?${query}`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    var bills = [];
    
    if(data.results){
        data.results.forEach((element) => {
            // console.log(element);
            let bill = {
                name: element.account.name,
                currency: element.account.currency,
                category: element.account.category,
                total_amount: element.total_amount,
                id: element.id

            };
            bills.push(bill);
        });
    };

    
    // console.log(result);
    return bills;
}

async function getAllInvestments(linkId) {

    const query = new URLSearchParams({
        link: linkId,
        page_size: '100',
        page: '1',
    }).toString();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        // body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/br/investments/?${query}`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    var investments = [];
    
    if(data.results){
        data.results.forEach((element) => {
            // console.log(element);
            let investiment = {
                product_name: element.product_name,
                currency: element.currency,
                type: element.type,
                net_value: element.balance.net_value,
                id: element.id
            };
            investments.push(investiment);
        });
    };

    
    return investments;
}

async function getAllInvestmentsTransactions(linkId) {

    const query = new URLSearchParams({
        link: linkId,
        page_size: '100',
        page: '1',
    }).toString();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        // body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/br/investment-transactions/?${query}`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    var investmentsTransactions = [];
    
    if(data.results){
        data.results.forEach((element) => {
            // console.log(element);
            let transaction = {
                product_name: element.investment.product_name,
                currency: element.investment.currency,
                type: element.investment.type,
                net_value: element.net_value,
                id: element.id
            };
            investmentsTransactions.push(transaction);
        });
    };

    
    return investmentsTransactions;
}

async function deleteResource(resource, id) {

    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        redirect: "follow"
    };


    const response = await fetch(`${baseUrl}/api/${resource}/${id}`, requestOptions);
}

module.exports = {
  getAllOwners,
  getAllAccounts,
  getAllTransactions,
  getAllBalances,
  getAllBills,
  getAllInvestments,
  getAllInvestmentsTransactions,
  deleteResource
};