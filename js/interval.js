function interval(func,interval) {
    setTimeout(function () {

        func();

        setTimeout(arguments.callee, interval);
    }, interval)
}