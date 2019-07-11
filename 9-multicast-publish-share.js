const rxjs = require('rxjs');
const ops = require('rxjs/operators');

const baseObs = new rxjs.Observable(subscriber => {
    subscriber.next(randomValue());
    subscriber.complete();
}).pipe(
    ops.tap(() => console.log('side effect'))
);

function classicExample() {
    baseObs.subscribe(console.log);
    baseObs.subscribe(console.log);
    baseObs.subscribe(console.log);
    baseObs.subscribe(console.log);
    baseObs.subscribe(console.log);
}

function multicastExample() {
    const multicastObs = baseObs.pipe(
        ops.multicast(() => new rxjs.Subject())
    );

    multicastObs.subscribe(console.log);
    multicastObs.subscribe(console.log);
    multicastObs.subscribe(console.log);
    multicastObs.subscribe(console.log);
    multicastObs.subscribe(console.log);

    setTimeout(() => multicastObs.connect(), 3000);
}

function publishExample() {
    const publishedObs = baseObs.pipe(
        ops.publish()
    );

    publishedObs.subscribe(console.log);
    publishedObs.subscribe(console.log);
    publishedObs.subscribe(console.log);
    publishedObs.subscribe(console.log);
    publishedObs.subscribe(console.log);

    setTimeout(() => publishedObs.connect(), 3000);
}

// share = publish + refCount (but restart when a reference count drops to 0)
function shareExampleDelay() {
    const sharedObs = baseObs
        .pipe(
            ops.delay(1000),
            ops.share()
        );

    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
}

function shareExampleNoDelay() {
    const sharedObs = baseObs
        .pipe(
            ops.share()
        );

    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
    sharedObs.subscribe(console.log);
}


function refCountDelayExample() {
    const publishedRefCountObs = baseObs
        .pipe(
            ops.delay(1000),
            ops.publish(),
            ops.refCount()
        );

    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
}

function refCountNoDelayExample() {
    const publishedRefCountObs = baseObs
        .pipe(
            ops.publish(),
            ops.refCount()
        );

    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
    publishedRefCountObs.subscribe(console.log);
}

const fiveRandomValues = new rxjs.Observable(subscriber => {
    subscriber.next(randomValue());
    subscriber.next(randomValue());
    subscriber.next(randomValue());
    subscriber.next(randomValue());
    subscriber.next(randomValue());
    subscriber.complete();
}).pipe(
    ops.tap(() => console.log('side effect'))
);

function shareReplayDelayExample() {
    const sharedReplayObs = fiveRandomValues
        .pipe(
            ops.delay(1000),
            ops.shareReplay(3)
        );

    sharedReplayObs.subscribe(value => console.log(`First: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Second: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Third: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Fourth: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Fifth: ${value}`));
}

function shareReplayNoDelayExample() {
    const sharedReplayObs = fiveRandomValues.pipe(
        ops.shareReplay(2)
    );

    sharedReplayObs.subscribe(value => console.log(`First: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Second: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Third: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Fourth: ${value}`));
    sharedReplayObs.subscribe(value => console.log(`Fifth: ${value}`));
}

function randomValue() {
    return Math.round(Math.random() * 100);
}

// classicExample();

// multicastExample();
// publishExample();

// shareExampleDelay();
// shareExampleNoDelay();

// refCountDelayExample();
// refCountNoDelayExample();

// shareReplayDelayExample();
// shareReplayNoDelayExample();
