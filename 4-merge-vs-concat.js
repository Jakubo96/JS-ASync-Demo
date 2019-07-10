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

// merge();
// concat();
