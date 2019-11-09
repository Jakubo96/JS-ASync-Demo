import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

function observableVersionShowcase() {
    const observableWithRandomValue = new Observable(subscriber => {
        subscriber.next(randomValue());
        subscriber.complete();
    })
        .pipe(
            tap(() => console.log('side effect'))
        );

    observableWithRandomValue.subscribe(value => console.log(`First subscription: ${value}`));
    observableWithRandomValue.subscribe(value => console.log(`Second subscription: ${value}`));
    observableWithRandomValue.subscribe(value => console.log(`Third subscription: ${value}`));
}

function subjectVersionShowcase() {
    const subjectWithRandomValue = new Subject();

    subjectWithRandomValue.next(randomValue());

    subjectWithRandomValue.subscribe(value => console.log(`First subscription: ${value}`));
    subjectWithRandomValue.subscribe(value => console.log(`Second subscription: ${value}`));
    subjectWithRandomValue.subscribe(value => console.log(`Third subscription: ${value}`));

    subjectWithRandomValue.next(randomValue());
    subjectWithRandomValue.complete();
}

function observableMulticastBySubject() {
    const observableWithRandomValue = new Observable(subscriber => {
        subscriber.next(randomValue());
        subscriber.complete();
    })
        .pipe(
            tap(() => console.log('side effect'))
        );

    const subject = new Subject();

    subject.subscribe(value => console.log(`First subscription: ${value}`));
    subject.subscribe(value => console.log(`Second subscription: ${value}`));
    subject.subscribe(value => console.log(`Third subscription: ${value}`));

    observableWithRandomValue.subscribe(subject);
}


function promiseVersionShowcase() {
    const promise = new Promise(resolve => {
        console.log('side effect');
        resolve(randomValue());
    });
    setTimeout(() => {
        promise.then(console.log);
        promise.then(console.log);
        promise.then(console.log);
    }, 1000);
}

// BONUS!

function behaviorSubject() {
    const behaviorSubject = new BehaviorSubject('initial value');
    behaviorSubject.next('first');
    behaviorSubject.next('second');
    behaviorSubject.next('third');
    behaviorSubject.subscribe(console.log);

    // console.log(behaviorSubject.value);

    behaviorSubject.next('fourth');
    behaviorSubject.next('fifth');
    behaviorSubject.complete();
}

function replaySubject() {
    const replaySubject = new ReplaySubject(2); // you can also specify for how long these last 2 values should be stored
    replaySubject.next('first');
    replaySubject.next('second');
    replaySubject.next('third');

    replaySubject.subscribe(console.log);
    // no replaySubject.value

    replaySubject.next('fourth');
    replaySubject.next('fifth');
    replaySubject.complete();
}

function asyncSubject() {
    const asyncSubject = new AsyncSubject();

    asyncSubject.next('first');
    asyncSubject.next('second');
    asyncSubject.next('third');

    asyncSubject.subscribe(console.log);

    asyncSubject.next('fourth');
    asyncSubject.next('fifth');
    asyncSubject.complete();
}

function randomValue() {
    return Math.round(Math.random() * 100);
}

// observableVersionShowcase();
// subjectVersionShowcase();
// observableMulticastBySubject();
// promiseVersionShowcase();
//
// behaviorSubject();
// replaySubject();
// asyncSubject();
