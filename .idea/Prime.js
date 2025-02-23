document.getElementById("checkButton").addEventListener("click", function () {
    const inputValue = document.getElementById("numberInput").value.trim();

    // Ensure the input is a valid number
    if (inputValue === "" || isNaN(Number(inputValue))) {
        document.getElementById("result").innerText = "Please enter a valid number.";
        return;
    }

    const num = BigInt(inputValue); // Convert to BigInt for large numbers
    const resultElement = document.getElementById("result");
    const primesArea = document.getElementById("primes");
    const nonPrimesArea = document.getElementById("nonPrimes");

    let primesList = primesArea.value.split(/\s+/).filter(Boolean);
    let nonPrimesList = nonPrimesArea.value.split(/\s+/).filter(Boolean);

    // Check for duplicates before adding
    if (isDuplicate(num, primesArea) || isDuplicate(num, nonPrimesArea)) {
        resultElement.innerText = `${num} is already checked.`;
        return;
    }

    if (isPrime(num)) {
        resultElement.innerText = `${num} is a prime number`;
        primesList.push(num.toString()); // Add to array
        primesArea.value = formatNumbers(primesList); // Format output
    } else {
        resultElement.innerText = `${num} is NOT a prime number`;
        nonPrimesList.push(num.toString()); // Add to array
        nonPrimesArea.value = formatNumbers(nonPrimesList);
    }
});

function formatNumbers(list) {
    let formattedText = "";
    for (let i = 0; i < list.length; i++) {
        if (i > 0 && i % 20 === 0) {
            formattedText += "\n"; // New line after every 20 numbers
        }
        formattedText += list[i] + " ";
    }
    return formattedText.trim(); // Trim any trailing space
}
function isDuplicate(num, textarea) {
    const values = textarea.value.split("\n"); // Convert to array
    return values.includes(num.toString()); // Check if number is already present
}

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
