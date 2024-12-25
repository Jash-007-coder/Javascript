function divideNumbers(a, b) {
    try {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

console.log(divideNumbers(10, 2)); // Output: 5
console.log(divideNumbers(10, 0)); // Output: Error: Division by zero is not allowed

async function getUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log(userData);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

getUserData(); // Fetches user data and logs it

class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

function validateInput(input) {
    try {
        if (input.length === 0) {
            throw new ValidationError("Input cannot be empty", "inputField");
        }
        console.log("Valid input:", input);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`Validation Error on ${error.field}: ${error.message}`);
        } else {
            console.error("Unexpected Error:", error.message);
        }
    }
}

validateInput(""); // Validation Error: Input cannot be empty
validateInput("Valid data"); // Valid input: Valid data

async function processData() {
    try {
        await fetchData();
    } catch (error) {
        console.error("Error caught in processData:", error.message);
        // Rethrow the error for further handling
        throw error;
    }
}

async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        const posts = await response.json();
        console.log(posts);
    } catch (error) {
        console.error("Error caught in fetchData:", error.message);
        // Rethrow the error so it can be caught by processData
        throw error;
    }
}

processData().catch(error => {
    console.log("Final error handler:", error.message);
});

function fetchDataFromDatabase(callback) {
    setTimeout(() => {
        const error = null;
        const data = { id: 1, name: "Sample Data" };
        if (error) {
            callback(new Error("Database error occurred"));
        } else {
            callback(null, data);
        }
    }, 1000);
}

fetchDataFromDatabase((error, data) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Data:", data);
    }
});

function processOrder(order) {
    try {
        if (!order.product || order.quantity <= 0) {
            throw new Error("Invalid order: Product must exist and quantity should be greater than 0");
        }
        console.log("Order processed:", order);
    } catch (error) {
        console.error("Order Processing Error:", error.message);
    }
}

const order = { product: "Laptop", quantity: 0 };
processOrder(order); // Error: Invalid order: Product must exist and quantity should be greater than 0

const validOrder = { product: "Laptop", quantity: 3 };
processOrder(validOrder); // Order processed: { product: 'Laptop', quantity: 3 }

async function getData() {
    try {
        // Fetch data from an API
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        console.log("User Data:", data);

        // Simulate a process that could fail
        const processData = await performComplexCalculation();
        console.log("Processing Results:", processData);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

async function performComplexCalculation() {
    // Simulating a failure in a computation
    throw new Error("Complex calculation failed");
}

getData(); 

function fetchDataFromMultipleSources() {
    Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/users/1"),
    ])
        .then(async (responses) => {
            const posts = await responses[0].json();
            const user = await responses[1].json();
            console.log("Posts:", posts);
            console.log("User:", user);
        })
        .catch((error) => {
            console.error("Error fetching data:", error.message);
        });
}

fetchDataFromMultipleSources();

