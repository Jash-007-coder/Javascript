// Simulating an asynchronous data fetch
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Alice", job: "Engineer" },
                { id: 2, name: "Bob", job: "Designer" },
                { id: 3, name: "Charlie", job: "Developer" }
            ]);
        }, 1000); // Simulates 1 second delay
    });
};

// Async function to load and display the data
const loadData = async () => {
    try {
        // Get the data container element
        const dataContainer = document.getElementById("dataContainer");
        
        // Clear any existing content
        dataContainer.innerHTML = "<p>Loading...</p>";
        
        // Fetch data asynchronously
        const data = await fetchData();

        // Clear loading text
        dataContainer.innerHTML = "";

        // Render the data into HTML
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "item";
            div.textContent = `${item.name} - ${item.job}`;
            dataContainer.appendChild(div);
        });
    } catch (error) {
        // Handle any errors during fetch
        console.error("Error fetching data:", error);
        document.getElementById("dataContainer").textContent = "Failed to load data!";
    }
};

// Add event listener to the button
document.getElementById("loadDataBtn").addEventListener("click", loadData);
