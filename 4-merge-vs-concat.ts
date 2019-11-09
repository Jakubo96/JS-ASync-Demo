import { concat, interval, merge, of } from 'rxjs';
import { delay, mapTo, take } from 'rxjs/operators';

const firstObs = of(1, 2, 3).pipe(delay(1000));
const secondObs = of(4, 5, 6);

function mergeExample() {
    merge(firstObs, secondObs)
        .subscribe(console.log);
}

function concatExample() {
    concat(firstObs, secondObs)
        .subscribe(console.log);
}

const firstInterval = interval(1000)
    .pipe(
        mapTo('FIRST'),
        take(5)
    );

const secondInterval = interval(2500)
    .pipe(
        mapTo('SECOND'),
        take(5)
    );

function intervalMerge() {
    merge(firstInterval, secondInterval)
        .subscribe(console.log)
}

function intervalConcat() {
    concat(firstInterval, secondInterval)
        .subscribe(console.log)
}

// mergeExample();
// concatExample();

// intervalMerge();
// intervalConcat();
