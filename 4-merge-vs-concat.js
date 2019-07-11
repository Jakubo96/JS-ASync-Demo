const rxjs = require('rxjs');
const ops = require('rxjs/operators');

const firstObs = rxjs.of(1, 2, 3).pipe(ops.delay(1000));
const secondObs = rxjs.of(4, 5, 6);

function merge() {
    rxjs.merge(firstObs, secondObs)
        .subscribe(console.log);
}

function concat() {
    rxjs.concat(firstObs, secondObs)
        .subscribe(console.log);
}

const firstInterval = rxjs.interval(1000)
    .pipe(
        ops.mapTo('FIRST'),
        ops.take(5)
    );

const secondInterval = rxjs.interval(2500)
    .pipe(
        ops.mapTo('SECOND'),
        ops.take(5)
    );

function intervalMerge() {
    rxjs.merge(firstInterval, secondInterval)
        .subscribe(console.log)
}

function intervalConcat() {
    rxjs.concat(firstInterval, secondInterval)
        .subscribe(console.log)
}

// merge();
// concat();

// intervalMerge();
// intervalConcat();