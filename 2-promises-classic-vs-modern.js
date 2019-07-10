const axios = require('axios');
const baconUrl = 'https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1';

function classicPromiseVersion() {
    return axios.get(baconUrl)
        .then(json => json.data.join(' '));
}

async function modernPromiseVersion() {
    const json = await axios.get(baconUrl);

    return json.data.join(' ');
}

function errorHandlingClassicPromise() {
    Promise.reject('Handled by Promise.catch()')
        .then(() => console.log('ok'))
        .catch(error => console.log(error));

    Promise.resolve(null)
        .then(value => {
            try {
                value.join('');
            } catch (e) {
                console.log('Handled by try/catch block')
            }
        });
}

async function errorHandlingModernPromise() {
    try {
        await Promise.reject('Something wrong happened');
    } catch (e) {
        console.log('Handled by try/catch block');
    }

    try {
        const result = await Promise.resolve(null);
        result.join('');
    } catch (e) {
        console.log('Handled by try/catch as well!')
    }
}

// classicPromiseVersion().then(console.log);
// modernPromiseVersion().then(console.log);

// errorHandlingClassicPromise();
// errorHandlingModernPromise();
