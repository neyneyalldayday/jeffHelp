document.addEventListener("DOMContentLoaded", () => {
  // Wait for the DOM to be fully loaded
  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Get the values from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      // Send a POST request to your server with the signup data
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Redirect to the signin page after successful signup
        window.location.href = "/";
      } else {
        // Handle errors, e.g., display an error message
        console.error("Error during signup:", response.statusText);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });
});
