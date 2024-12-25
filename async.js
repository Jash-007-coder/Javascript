// Define an async function
async function example() {
    let value = await somePromise();
    console.log(value);
}

async function fetchData() {
    return "Data fetched";
}

// Calling the function
fetchData().then((result) => console.log(result)); // Output: Data fetched

function delayedResolve() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Success!"), 2000);
    });
}

async function example() {
    console.log("Before await");
    const result = await delayedResolve(); // Waits for the Promise to resolve
    console.log(result); // Output: Success!
    console.log("After await");
}

example();

Before await
[2-second delay]
Success!
After await

fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));

    async function fetchPost() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    fetchPost();

    async function fetchUserAndPosts() {
        try {
            const userResponse = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const user = await userResponse.json();
    
            console.log("User:", user);
    
            const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const posts = await postsResponse.json();
    
            console.log("Posts:", posts);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    fetchUserAndPosts();

    async function fetchWithError() {
        try {
            const response = await fetch("invalid_url"); // Invalid URL
            const data = await response.json(); // Won't execute if fetch fails
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    }
    
    fetchWithError();

    Failed to fetch data: Failed to fetch

    async function fetchParallel() {
        const urls = [
            "https://jsonplaceholder.typicode.com/posts/1",
            "https://jsonplaceholder.typicode.com/posts/2",
            "https://jsonplaceholder.typicode.com/posts/3"
        ];
    
        try {
            const responses = await Promise.all(urls.map((url) => fetch(url)));
            const data = await Promise.all(responses.map((res) => res.json()));
    
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    fetchParallel();

    const urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3"
    ];
    
    async function fetchSequential() {
        for (let url of urls) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
    
    fetchSequential();

    const result = await fetch("https://example.com"); // Syntax Error!

    async function fetchExample() {
        const result = await fetch("https://example.com");
    }

    