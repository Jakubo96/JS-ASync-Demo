import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

function tapLoggingExample() {
    of(1, 2, 3)
        .pipe(
            tap(() => console.log('LOG STH'))
        )
        .subscribe(console.log);
}

function tapNoSubscribeExample() {
    of(1, 2, 3)
        .pipe(
            tap(console.log)
        ).subscribe();
}

const complexObs = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.error('UNAUTHORIZED');
    subscriber.next('3');
    subscriber.complete();
});

function complexObsExample() {
    complexObs
        .subscribe(value => console.log(`Next: ${value}`),
            error => console.log(`Error: ${error}`),
            () => console.log('Complete'));
}

// show with no error and no complete
function finalizeExample() {
    complexObs
        .pipe(finalize(() => console.log('Somehow completed (finalize)')))
        .subscribe(value => console.log(`Next: ${value}`),
            error => console.log(`Error: ${error}`),
            () => console.log('Complete'));
}

// tapLoggingExample();
// tapNoSubscribeExample();

// complexObsExample();
// finalizeExample();
