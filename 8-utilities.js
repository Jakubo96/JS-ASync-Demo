const rxjs = require('rxjs');
const ops = require('rxjs/operators');

function tapLoggingExample() {
    rxjs.of(1, 2, 3)
        .pipe(
            ops.tap(() => console.log('LOG STH'))
        )
        .subscribe(console.log);
}

function tapNoSubscribeExample() {
    rxjs.of(1, 2, 3)
        .pipe(
            ops.tap(console.log)
        ).subscribe();
}

const complexObs = new rxjs.Observable(subscriber => {
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
        .pipe(ops.finalize(() => console.log('Somehow completed (finalize)')))
        .subscribe(value => console.log(`Next: ${value}`),
            error => console.log(`Error: ${error}`),
            () => console.log('Complete'));
}

// tapLoggingExample();
// tapNoSubscribeExample();

// complexObsExample();
// finalizeExample();
