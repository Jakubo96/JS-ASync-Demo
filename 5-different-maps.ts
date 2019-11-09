import { concatMap, delay, exhaustMap, flatMap, map, mergeAll, switchMap, take } from 'rxjs/operators';
import { interval, of } from 'rxjs';

const baseObs = interval(500).pipe(take(10));

function simpleMap() {
    baseObs.pipe(
        map(value => value * 10)
    ).subscribe(console.log);
}

// mergeMap === flatMap === map => mergeAll

function mapWithInnerObservable() {
    baseObs.pipe(
        map(value => magicalEndpoint(value))
    ).subscribe(value => {
        // value.subscribe(innerValue => console.log(innerValue));
        console.log(value);
    });
}

function mapAndMergeAll() {
    baseObs.pipe(
        map(value => magicalEndpoint(value)),
        mergeAll()
    ).subscribe(console.log);
}

function flatMapExample() {
    baseObs.pipe(
        flatMap(value => magicalEndpoint(value))
    ).subscribe(console.log);
}

// concatMap === map => concatAll
function concatMapExample() {
    baseObs.pipe(
        concatMap(value => magicalEndpoint(value))
    ).subscribe(console.log);
}

// switchMap === map => switchAll

function switchMapNoCancel() {
    baseObs.pipe(
        switchMap(value => of(value * 10).pipe(delay(400)))
    ).subscribe(console.log);
}

function switchMapCancel() {
    baseObs.pipe(
        switchMap(value => of(value * 10).pipe(delay(600)))
    ).subscribe(console.log);
}

function switchMapRandomized() {
    const randomDelay = () => Math.round(Math.random() * 1000);

    baseObs
        .pipe(
            switchMap(value => of(value * 10).pipe(delay(randomDelay())))
        ).subscribe(console.log);
}

// ehxaustMap === map => exhaustAll

function exhaustMapNoIgnore() {
    baseObs.pipe(
        exhaustMap(value => of(value * 10).pipe(delay(400)))
    ).subscribe(console.log);
}

function exhaustMapIgnore() {
    baseObs.pipe(
        exhaustMap(value => of(value * 10).pipe(delay(1000)))
    ).subscribe(console.log);
}

function magicalEndpoint(value) {
    const delayTime = Math.round(Math.random() * 5000);
    return of(value * 10).pipe(delay(delayTime));
}


// simpleMap();

// mapWithInnerObservable();
// mapAndMergeAll();
// flatMapExample();

// concatMapExample();

// switchMapNoCancel();
// switchMapCancel();
// switchMapRandomized();

// exhaustMapNoIgnore();
// exhaustMapIgnore();
