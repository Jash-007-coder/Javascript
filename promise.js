const promise = new Promise((resolve, reject) => {
    const success = true; // Simulating success or failure

    setTimeout(() => {
        if (success) {
            resolve("Operation Successful!");
        } else {
            reject("Operation Failed!");
        }
    }, 2000); // Simulate a 2-second delay
});

promise
    .then((result) => {
        console.log("Success:", result); // Logs: Success: Operation Successful!
    })
    .catch((error) => {
        console.error("Error:", error); // Logs if rejected
    })
    .finally(() => {
        console.log("Operation completed."); // Logs regardless of outcome
    });

    // Fetch data from an API
fetch("https://jsonplaceholder.typicode.com/posts/1")
.then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json(); // Convert response to JSON
})
.then((data) => {
    console.log("Post data:", data);
})
.catch((error) => {
    console.error("Failed to fetch data:", error);
});

const getUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, name: "Alice" }), 1000);
    });
};

const getPosts = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Post1", "Post2"]), 1000);
    });
};

getUser()
    .then((user) => {
        console.log("User fetched:", user);
        return getPosts(user.id);
    })
    .then((posts) => {
        console.log("Posts fetched:", posts);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    User fetched: { id: 1, name: "Alice" }
Posts fetched: [ 'Post1', 'Post2' ]

const fetchUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("User data"), 1000);
    });
};

const fetchPosts = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Post data"), 2000);
    });
};

Promise.all([fetchUser(), fetchPosts()])
    .then((results) => {
        console.log("Results:", results); // Logs: [ 'User data', 'Post data' ]
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    const fetchData = (url) => {
        return fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        });
    };
    
    fetchData("invalid_url")
        .then((data) => console.log("Data:", data))
        .catch((error) => console.error("Fetch failed:", error)); // Logs the HTTP error

        
        const fetchWithRetry = (url, retries = 3) => {
            return new Promise((resolve, reject) => {
                const attempt = () => {
                    fetch(url)
                        .then((response) => {
                            if (!response.ok) throw new Error("Fetch failed!");
                            return resolve(response.json());
                        })
                        .catch((error) => {
                            if (retries === 0) return reject(error);
                            console.log(`Retrying... (${retries} attempts left)`);
                            retries--;
                            attempt();
                        });
                };
                attempt();
            });
        };
        
        fetchWithRetry("https://jsonplaceholder.typicode.com/posts/1")
            .then((data) => console.log("Data fetched:", data))
            .catch((error) => console.error("All retries failed:", error));

            