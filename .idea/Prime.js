function isPrime(n) {

    if ( n <= 1) {
        return n + (" is not a prime number");
    }

    if ( n === 2 || n === 3) {
        return n + (" is a prime number");
    }
    if (n % 2 == 0 || n % 3 == 0) {
        return n + (" is not a prime number");
    }
    else {
        for (let i = 5; i <= Math.sqrt(n); i++) {
            if ( n % i === 0 || n % (i + 2) == 0) {
                return n +  (" is not a prime number");
            }
        }
        return n + (" is a prime number");
    }
}

console.log (isPrime(6));