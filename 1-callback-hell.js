function callbacksVersion(value) {
    setTimeout(() => {
        value = printAndMultiply(value);
        setTimeout(() => {
            value = printAndMultiply(value);
            setTimeout(() => {
                value = printAndMultiply(value);
                setTimeout(() => {
                    value = printAndMultiply(value);
                    setTimeout(() => {
                        value = printAndMultiply(value);
                        setTimeout(() => {
                            value = printAndMultiply(value);
                            setTimeout(() => {
                                value = printAndMultiply(value);
                                setTimeout(() => {
                                    value = printAndMultiply(value);
                                    setTimeout(() => {
                                        value = printAndMultiply(value);
                                        setTimeout(() => {
                                            value = printAndMultiply(value);
                                            setTimeout(() => {
                                                printAndMultiply(value);
                                            }, 500);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

function classicPromiseVersion(initialValue) {
    timeoutPromiseWrapped(initialValue)
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => timeoutPromiseWrapped(printAndMultiply(val)))
        .then(val => printAndMultiply(val));
}

async function modernPromiseVersion(initialValue) {
    let val = await timeoutPromiseWrapped(initialValue);
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    val = await timeoutPromiseWrapped(printAndMultiply(val));
    printAndMultiply(val);
}

function printAndMultiply(value) {
    console.log(value);
    return value * 2;
}

function timeoutPromiseWrapped(value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), 500);
    })

}

// callbacksVersion(1);
// classicPromiseVersion(1);
// modernPromiseVersion(1);
