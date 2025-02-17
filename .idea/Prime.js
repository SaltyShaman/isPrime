function isPrime(n) {
    if (n <= 1) {
        return `${n} is not a prime number`;
    }
    if (n === 2 || n === 3) {
        return `${n} is a prime number`;
    }
    if (n % 2 === 0 || n % 3 === 0) {
        return `${n} is not a prime number`;
    }

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return `${n} is not a prime number`;
        }
    }
    return `${n} is a prime number`;
}

// Test cases
console.log(isPrime(7));   // 7 is a prime number
console.log(isPrime(10));  // 10 is not a prime number
console.log(isPrime(29));  // 29 is a prime number
console.log(isPrime(49));  // 49 is not a prime number
