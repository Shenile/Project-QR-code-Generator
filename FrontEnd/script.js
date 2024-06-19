document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('qrForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
    
        const userInput = document.getElementById('textInput').value;
        console.log('User input:', userInput);
    
        // Send user input to backend
        fetch('http://localhost:3000/qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userInput })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
    
            // Display QR code image to the user
            renderQRCode(data.qrImage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function renderQRCode(base64Data) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    if (!qrCodeContainer) {
        console.error('QR Code Container not found');
        return;
    }

    // Create an image element
    const img = document.createElement('img');
    img.src = `data:image/png;base64, ${base64Data}`;  // Set image source to base64 data
    img.alt = 'QR Code';

    // Clear previous QR code image if exists
    qrCodeContainer.innerHTML = '';
    
    // Append the image to the container
    qrCodeContainer.appendChild(img);

    // Show the container if it's hidden
    qrCodeContainer.classList.remove('hidden');
}
