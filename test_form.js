const fs = require('fs');

async function testWeb3Forms() {
    try {
        const payload = {
            access_key: "87403c7e-d81c-4e3e-8e68-4b68f6232ab6",
            name: "Test User",
            email: "test@example.com",
            message: "This is a test message from the build script"
        };

        console.log("Sending payload:", payload);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        console.log("Status Code:", response.status);

        const text = await response.text();
        console.log("Response text:", text);
    } catch (e) {
        console.error("Fetch threw error:", e);
    }
}

testWeb3Forms();
