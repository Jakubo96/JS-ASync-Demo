const rxjs = require('rxjs');
const ops = require('rxjs/operators');

const firstObs = rxjs.interval(1000).pipe(ops.take(5));
const secondObs = rxjs.interval(2500).pipe(ops.take(3));

const obsNeverComplete = new rxjs.Observable(subscriber => {
    subscriber.next('first');
    subscriber.next('second');
    subscriber.next('third');
    // no complete
});

function zip() {
    rxjs.zip(firstObs, secondObs)
        .subscribe(console.log);
}

function forkJoin() {
    rxjs.forkJoin([firstObs, secondObs])
        .subscribe(console.log);
}

function forkJoinFail() {
    rxjs.forkJoin([firstObs, obsNeverComplete])
        .subscribe(console.log);
}

function combineLatest() {
    rxjs.combineLatest([firstObs, secondObs])
        .subscribe(console.log);
}

// zip();
// forkJoin();
// forkJoinFail();
// combineLatest();
