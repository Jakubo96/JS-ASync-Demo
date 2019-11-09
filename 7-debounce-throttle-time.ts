import { interval, of, range } from 'rxjs';
import { concatMap, debounceTime, delay, take, throttleTime } from 'rxjs/operators';

function debounceTimeNoFilter() {
    interval(500).pipe(
        debounceTime(400),
        take(10)
    ).subscribe(console.log);
}

function debounceTimeFilter() {
    interval(500).pipe(
        debounceTime(600),
        take(10)
    ).subscribe(console.log);
}

function debounceTimeRandom() {
    const randomDelay = () => Math.round(Math.random() * 1000);

    range(1, 10)
        .pipe(
            concatMap(value => of(value)
                .pipe(delay(randomDelay()))),
            debounceTime(500)
        )
        .subscribe(console.log)
}

function throttleTimeNoFilter() {
    interval(500).pipe(
        take(10),
        throttleTime(400)
    ).subscribe(console.log);
}

function throttleTimeFilter() {
    interval(500).pipe(
        take(10),
        throttleTime(2000)
    ).subscribe(console.log);
}

function throttleTimeFastNoFilter() {
    interval(500).pipe(
        take(10),
        throttleTime(1)
    ).subscribe(console.log);
}

// debounceTimeNoFilter();
// debounceTimeFilter();
// debounceTimeRandom();

// throttleTimeNoFilter();
// throttleTimeFilter();
// throttleTimeFastNoFilter();
