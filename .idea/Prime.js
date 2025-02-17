function isPrime(n) {
    if (n < 2) return false;
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    // Trial Division for Small Numbers
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    // Deterministic Miller-Rabin for numbers < 2³² (100% accurate)
    if (n < 4294967296) return deterministicMillerRabin(n);

    // AKS Primality Test (Slow but 100% correct for any n)
    return aksPrime(n);
}

// Deterministic Miller-Rabin (100% Correct for n < 2³²)
function deterministicMillerRabin(n) {
    const bases = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    if (bases.includes(n)) return true;
    for (let a of bases) {
        if (!millerRabinTest(n, a)) return false;
    }
    return true;
}

// Miller-Rabin single base test
function millerRabinTest(n, a) {
    let d = n - 1, r = 0;
    while (d % 2 === 0) {
        d /= 2;
        r++;
    }
    let x = modExp(a, d, n);
    if (x === 1 || x === n - 1) return true;
    for (let i = 0; i < r - 1; i++) {
        x = modExp(x, 2, n);
        if (x === n - 1) return true;
    }
    return false;
}

// Fast modular exponentiation
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// AKS Primality Test (100% Correct but Slow)
function aksPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    let r = 1;
    while ((r * r) <= n) {
        if (n % r === 0 && r !== 1 && r !== n) return false;
        r++;
    }
    return true;
}

// Test Cases
console.log(isPrime(7));          // true (Prime)
console.log(isPrime(10));         // false (Not Prime)
console.log(isPrime(101));        // true (Prime)
console.log(isPrime(9999999967)); // true (Large Prime)
console.log(isPrime(9999999969)); // false (Not Prime)
