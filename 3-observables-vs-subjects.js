const rxjs = require('rxjs');

function observableVersionShowcase() {
    const observableWithRandomValue = new rxjs.Observable(subscriber => {
        subscriber.next(randomValue());
        subscriber.complete();
    });

    observableWithRandomValue.subscribe(value => console.log(`First subscription: ${value}`));
    observableWithRandomValue.subscribe(value => console.log(`Second subscription: ${value}`));
    observableWithRandomValue.subscribe(value => console.log(`Third subscription: ${value}`));
}

function subjectVersionShowcase() {
    const subjectWithRandomValue = new rxjs.Subject();
    subjectWithRandomValue.next(randomValue());


    subjectWithRandomValue.subscribe(value => console.log(`First subscription: ${value}`));
    subjectWithRandomValue.subscribe(value => console.log(`Second subscription: ${value}`));
    subjectWithRandomValue.subscribe(value => console.log(`Third subscription: ${value}`));

    subjectWithRandomValue.next(randomValue());
    subjectWithRandomValue.complete();
}

function observableMulticastBySubject() {
    const observableWithRandomValue = new rxjs.Observable(subscriber => {
        subscriber.next(randomValue());
        subscriber.complete();
    });

    const subject = new rxjs.Subject();

    subject.subscribe(value => console.log(`First subscription: ${value}`));
    subject.subscribe(value => console.log(`Second subscription: ${value}`));
    subject.subscribe(value => console.log(`Third subscription: ${value}`));

    observableWithRandomValue.subscribe(subject);
}

// BONUS!

function behaviorSubject() {
    const behaviorSubject = new rxjs.BehaviorSubject();
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
    const replaySubject = new rxjs.ReplaySubject(2); // you can also specify for how long these last 2 values should be stored
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
    const asyncSubject = new rxjs.AsyncSubject();

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

// behaviorSubject();
// replaySubject();
// asyncSubject();
