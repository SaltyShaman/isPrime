console.log("Prime is in");

document.getElementById("checkButton").addEventListener("click", function() {
    const inputValue = document.getElementById("numberInput").value.trim();

    // Ensure the input is a valid number
    if (inputValue === "" || isNaN(Number(inputValue))) {
        document.getElementById("result").innerText = "Please enter a valid number.";
        return;
    }

    const num = BigInt(inputValue); // Convert to BigInt for large numbers
    const result = isPrime(num) ? `${num} is a prime number` : `${num} is NOT a prime number`;
    document.getElementById("result").innerText = result;
});

function isPrime(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n || n % 3n === 0n) return false;

    for (let i = 5n; i * i <= n; i += 6n) {
        if (n % i === 0n || n % (i + 2n) === 0n) return false;
    }

    if (n < 4294967296n) return deterministicMillerRabin(n);
    return aksPrime(n);
}

function deterministicMillerRabin(n) {
    const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
    if (bases.includes(n)) return true;
    for (let a of bases) {
        if (!millerRabinTest(n, a)) return false;
    }
    return true;
}

function millerRabinTest(n, a) {
    let d = n - 1n, r = 0n;
    while (d % 2n === 0n) {
        d /= 2n;
        r++;
    }
    let x = modExp(a, d, n);
    if (x === 1n || x === n - 1n) return true;
    for (let i = 0n; i < r - 1n; i++) {
        x = modExp(x, 2n, n);
        if (x === n - 1n) return true;
    }
    return false;
}

function modExp(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) result = (result * base) % mod;
        exp /= 2n;
        base = (base * base) % mod;
    }
    return result;
}

function aksPrime(n) {
    if (n < 2n) return false;
    if (n === 2n) return true;
    if (n % 2n === 0n) return false;

    let r = 1n;
    while ((r * r) <= n) {
        if (n % r === 0n && r !== 1n && r !== n) return false;
        r++;
    }
    return true;
}
