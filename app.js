// Fetch posts from the JSONPlaceholder API
const fetchPosts = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error; // Re-throw to handle it later if needed
    }
};

// Render posts on the page
const displayPosts = (posts) => {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = ""; // Clear any existing content

    posts.forEach((post) => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        postsContainer.appendChild(div);
    });
};

// Add event listener to fetch and display posts
document.getElementById("fetchPostsBtn").addEventListener("click", async () => {
    try {
        const posts = await fetchPosts();
        displayPosts(posts.slice(0, 10)); // Show only the first 10 posts
    } catch (error) {
        document.getElementById("posts").innerHTML = "<p>Failed to load posts.</p>";
    }
});

// Fetch a user by ID
const fetchUser = async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }
    return response.json();
};

// Fetch posts by a user
const fetchUserPosts = async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user posts");
    }
    return response.json();
};

// Fetch and display user's posts
document.getElementById("fetchPostsBtn").addEventListener("click", async () => {
    const userId = 1; // Example: Fetch posts by user ID 1
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "<p>Loading...</p>";
    try {
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);

        postsContainer.innerHTML = `<h2>Posts by ${user.name}</h2>`;
        posts.forEach((post) => {
            const div = document.createElement("div");
            div.className = "post";
            div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            postsContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error:", error);
        postsContainer.innerHTML = "<p>Failed to load user's posts.</p>";
    }
});


// Fetch two APIs in parallel
const fetchParallel = async () => {
    const urls = [
        "https://jsonplaceholder.typicode.com/users",
        "https://jsonplaceholder.typicode.com/posts"
    ];

    try {
        const [users, posts] = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));

        console.log("Users:", users);
        console.log("Posts:", posts);

        const postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = `<p>Fetched ${users.length} users and ${posts.length} posts in parallel!</p>`;
    } catch (error) {
        console.error("Error in parallel fetching:", error);
        document.getElementById("posts").innerHTML = "<p>Failed to fetch data.</p>";
    }
};

// Event listener
document.getElementById("fetchPostsBtn").addEventListener("click", fetchParallel);

// Fetch with retry logic
const fetchWithRetry = async (url, retries = 3) => {
    while (retries > 0) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Return the data on success
        } catch (error) {
            retries--;
            console.error(`Retrying... (${3 - retries} attempts left)`);
            if (retries === 0) throw new Error("Failed after retries: " + error.message);
        }
    }
};

// Fetch posts with retry
document.getElementById("fetchPostsBtn").addEventListener("click", async () => {
    try {
        const posts = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts");
        console.log("Fetched posts with retry:", posts);
    } catch (error) {
        console.error("Error with retry logic:", error);
        document.getElementById("posts").innerHTML = "<p>Failed to load posts after retries.</p>";
    }
});


let controller;

document.getElementById("fetchPostsBtn").addEventListener("click", async () => {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "<p>Loading...</p>";

    // Abort previous request if any
    if (controller) controller.abort();
    controller = new AbortController();
    
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            signal: controller.signal,
        });
        const posts = await response.json();
        postsContainer.innerHTML = `<p>Fetched ${posts.length} posts!</p>`;
    } catch (error) {
        if (error.name === "AbortError") {
            console.warn("Request was aborted.");
        } else {
            console.error("Error:", error);
            postsContainer.innerHTML = "<p>Failed to load posts.</p>";
        }
    }
});


// JavaScript (app.js)

// Select HTML elements
const fetchButton = document.getElementById("fetch-btn");
const userDataDiv = document.getElementById("user-data");

// Function to fetch user data
const fetchUserData = () => {
    return new Promise((resolve, reject) => {
        userDataDiv.innerHTML = "<p class='loading'>Loading user data...</p>";

        // Simulate an API fetch
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate

            if (success) {
                resolve({
                    id: 1,
                    name: "John Doe",
                    email: "john.doe@example.com",
                    city: "New York",
                });
            } else {
                reject("Failed to fetch user data. Try again.");
            }
        }, 2000); // Simulate 2 seconds delay
    });
};

// Add click event listener to the button
fetchButton.addEventListener("click", () => {
    fetchUserData()
        .then((user) => {
            // Display user data on success
            userDataDiv.innerHTML = `
                <h3>User Data:</h3>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>City:</strong> ${user.city}</p>
            `;
        })
        .catch((error) => {
            // Display error message on failure
            userDataDiv.innerHTML = `<p style="color: red;">${error}</p>`;
        })
        .finally(() => {
            console.log("Fetch operation completed.");
        });
});


// Select the hoverable box element
const hoverBox = document.querySelector(".hover-box");

// Function to create the ripple effect
const createHoverEffect = (e) => {
    // Get the position of the mouse relative to the box
    const rect = hoverBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create a new div for the hover effect
    const effect = document.createElement("div");
    effect.classList.add("hover-effect");
    effect.style.left = `${x - 10}px`; // Center the effect
    effect.style.top = `${y - 10}px`;

    // Add the effect div to the hover-box
    hoverBox.appendChild(effect);

    // Remove the effect after the animation ends
    setTimeout(() => {
        effect.remove();
    }, 600); // Match the animation duration
};

// Add event listener to the hover box
hoverBox.addEventListener("mousemove", createHoverEffect);

// Select the button and the div to display user data
const fetchButton = document.getElementById("fetch-btn");
const userDataDiv = document.getElementById("user-data");

// Function to fetch user data using async/await
async function fetchUserData() {
    try {
        userDataDiv.innerHTML = "<p class='loading'>Loading user data...</p>";

        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const user = await response.json();

        // Display user data
        userDataDiv.innerHTML = `
            <div class="user-info">
                <h3>User Info:</h3>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
            </div>
        `;
    } catch (error) {
        // Display error message
        userDataDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Add event listener to the button
fetchButton.addEventListener("click", fetchUserData);

