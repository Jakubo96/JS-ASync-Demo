const rxjs = require('rxjs');
const ops = require('rxjs/operators');

const baseObs = rxjs.interval(500).pipe(ops.take(10));

function simpleMap() {
    baseObs.pipe(
        ops.map(value => value * 10)
    ).subscribe(console.log);
}

// mergeMap === flatMap === map => mergeAll

function mapWithInnerObservable() {
    baseObs.pipe(
        ops.map(value => magicalEndpoint(value))
    ).subscribe(value => {
        // value.subscribe(innerValue => console.log(innerValue));
        console.log(value);
    });
}

function mapAndMergeAll() {
    baseObs.pipe(
        ops.map(value => magicalEndpoint(value)),
        ops.mergeAll()
    ).subscribe(console.log);
}

function flatMap() {
    baseObs.pipe(
        ops.flatMap(value => magicalEndpoint(value))
    ).subscribe(console.log);
}

// concatMap === map => concatAll
function concatMap() {
    baseObs.pipe(
        ops.concatMap(value => magicalEndpoint(value))
    ).subscribe(console.log);
}

// switchMap === map => switchAll

function switchMapNoCancel() {
    baseObs.pipe(
        ops.switchMap(value => rxjs.of(value * 10).pipe(ops.delay(400)))
    ).subscribe(console.log);
}

function switchMapCancel() {
    baseObs.pipe(
        ops.switchMap(value => rxjs.of(value * 10).pipe(ops.delay(600)))
    ).subscribe(console.log);
}

function switchMapRandomized() {
    const randomDelay = () => Math.round(Math.random() * 1000);
    
    baseObs
        .pipe(
            ops.switchMap(value => rxjs.of(value * 10).pipe(ops.delay(randomDelay())))
        ).subscribe(console.log);
}

// ehxaustMap === map => exhaustAll

function exhaustMapNoIgnore() {
    baseObs.pipe(
        ops.exhaustMap(value => rxjs.of(value * 10).pipe(ops.delay(400)))
    ).subscribe(console.log);
}

function exhaustMapIgnore() {
    baseObs.pipe(
        ops.exhaustMap(value => rxjs.of(value * 10).pipe(ops.delay(1000)))
    ).subscribe(console.log);
}

function magicalEndpoint(value) {
    const delayTime = Math.round(Math.random() * 5000);
    return rxjs.of(value * 10).pipe(ops.delay(delayTime));
}


// simpleMap();

// mapWithInnerObservable();
// mapAndMergeAll();
// flatMap();

// concatMap();

// switchMapNoCancel();
// switchMapCancel();
switchMapRandomized();

// exhaustMapNoIgnore();
// exhaustMapIgnore();
