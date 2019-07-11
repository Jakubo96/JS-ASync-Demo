const rxjs = require('rxjs');
const ops = require('rxjs/operators');

function debounceTimeNoFilter() {
    rxjs.interval(500).pipe(
        ops.debounceTime(400),
        ops.take(10)
    ).subscribe(console.log);
}

function debounceTimeFilter() {
    rxjs.interval(500).pipe(
        ops.debounceTime(600),
        ops.take(10)
    ).subscribe(console.log);
}


function debounceTimeRandom() {
    const randomDelay = () => Math.round(Math.random() * 1000);

    rxjs.range(1, 10)
        .pipe(
            ops.concatMap(value => rxjs.of(value)
                .pipe(ops.delay(randomDelay()))),
            ops.debounceTime(500)
        )
        .subscribe(console.log)
}


// debounceTimeNoFilter();
// debounceTimeFilter();
// debounceTimeRandom();
