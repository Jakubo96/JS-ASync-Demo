import { combineLatest, forkJoin, interval, Observable, zip } from 'rxjs';
import { take } from 'rxjs/operators';

const firstObs = interval(1000).pipe(take(5));
const secondObs = interval(2500).pipe(take(3));

const obsNeverComplete = new Observable(subscriber => {
    subscriber.next('first');
    subscriber.next('second');
    subscriber.next('third');
    // no complete
});

function zipExample() {
    zip(firstObs, secondObs)
        .subscribe(console.log);
}

function forkJoinExample() {
    forkJoin([firstObs, secondObs])
        .subscribe(console.log);
}

function forkJoinFail() {
    forkJoin([firstObs, obsNeverComplete])
        .subscribe(console.log);
}

function combineLatestExample() {
    combineLatest([firstObs, secondObs])
        .subscribe(console.log);
}

// zipExample();
// forkJoinExample();
// forkJoinFail();
// combineLatestExample();
