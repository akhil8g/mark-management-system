function sendValue(numberValue) {
    const url = '/weak'; // Replace with your server endpoint

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numberValue }), // Send the numeric value in JSON format
    })
    .then(response => {
        // Handle response if needed
        console.log('Response:', response);
    })
    .catch(error => {
        // Handle error if request fails
        console.error('Error:', error);
    });
}