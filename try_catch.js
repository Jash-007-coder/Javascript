try {
    // Block of code to test for errors
    // This is where your code goes that might throw an error
} catch (error) {
    // Block of code to handle the error
    // This runs if an error occurs in the try block
    console.error(error); // Printing the error to console
}

try {
    let result = 10 / 0; // This will throw Infinity, not an exception.
    console.log(result); // Doesn't print anything as the try block exits after the error
} catch (error) {
    console.error("Error occurred: " + error.message); // The error will be handled here
}

function divideNumbers(a, b) {
    try {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");  // Throwing an error manually
        }
        return a / b;
    } catch (error) {
        console.error(error.message); // Output the error message from the thrown error
    }
}

console.log(divideNumbers(10, 0)); // Error: Division by zero is not allowed
console.log(divideNumbers(10, 2)); // Output: 5

async function fetchData() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {  // Check if the response is successful
            throw new Error('Network error');
        }
        let data = await response.json();
        console.log(data);  // This code will run if no errors occur
    } catch (error) {
        console.error('Error during fetch:', error.message); // Catch and log any error
    }
}

fetchData(); // Attempt to fetch the data

try {
    try {
        // some operation that might throw an error
        throw new Error("An inner error occurred");
    } catch (error) {
        console.error("Caught in nested try-catch:", error.message);
        // Re-throw the error after handling
        throw new Error("Re-throwing the error to outer catch");
    }
} catch (outerError) {
    console.error("Caught in the outer catch block:", outerError.message);
}

try {
    let result = 5 / 0;
    console.log(result);
} catch (error) {
    console.error("Error: ", error.message);
} finally {
    console.log("This will run regardless of errors.");
}

let items = ['123', 'abc', '456'];
for (let i = 0; i < items.length; i++) {
    try {
        let parsed = JSON.parse(items[i]);
        console.log(parsed);
    } catch (error) {
        console.error("Error parsing item:", items[i], error.message);
    }
}

function fetchUserData() {
    try {
        // Attempt to fetch data
        let data = fetch("https://api.example.com/users");
        return data;
    } catch (error) {
        console.error("Error in fetching user data:", error.message);
        throw error; // Re-throw to handle elsewhere
    }
}

