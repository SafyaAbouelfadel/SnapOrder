// Example function to fetch data from an API
function fetchData() {
    fetch('/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Process the data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Call the fetchData function to test error handling
fetchData();
