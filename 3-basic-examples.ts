import { interval, Observable, pipe, range } from 'rxjs';
import { count, filter, map, max, reduce, scan, take } from 'rxjs/operators';

function successfulObservable() {
    const obs = new Observable(subscriber => {
        subscriber.next('first value');
        subscriber.next('another value');
        subscriber.next('yet another value');

        subscriber.complete();
    });

    obs.subscribe(value => console.log(value),
        error => undefined,
        () => console.log('completed'));
}


function failedObservable() {
    const obs = new Observable(subscriber => {
        subscriber.next('first value');

        subscriber.error('oops!');

        subscriber.next('another one?');

        subscriber.complete();
    });

    obs.subscribe(value => console.log(value),
        error => console.log(error),
        () => console.log('completed'));
}


// ARRAY LIKE OPERATORS

function basicOpsExample() {
    range(0, 10) // or interval/timer
        .pipe(
            // map(value => value * value),
            // filter(value => value % 2 === 1),
            // count(value => value > 10),
            // reduce(((acc, value) => acc + value)),
            // scan(((acc, value) => acc + value)),
            // max()
        )
        .subscribe(console.log);

}


// successfulObservable();
// failedObservable();

// basicOpsExample();
