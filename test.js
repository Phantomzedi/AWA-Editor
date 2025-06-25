// Declare the timeLeft variable properly
let timeLeft = 30 * 60; // 30 minutes in seconds (this is the countdown timer)
let timerInterval; // Will hold the interval ID for the timer
const timerDisplay = document.getElementById('timer'); // Reference to the timer element
let isTimerRunning = false; // Flag to check if timer is running

// Load the JSON file with prompts
function loadPrompts() {
    fetch('assets/awa-ets.json')  // Path to your JSON file (now named awa-ets.json)
        .then(response => response.json())
        .then(data => {
            console.log("Prompts loaded:", data); // Log to verify the loaded data
            const prompts = data.topics;  // Accessing the 'topics' array inside the JSON
            randomizeTopic(prompts); // Pass the correct array to the function
        })
        .catch(error => console.error('Error loading prompts:', error));
}

// Function to randomly select a topic and display it
function randomizeTopic(prompts) {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const selectedPrompt = prompts[randomIndex];

    // Display the topic and instructions
    displayTopic(selectedPrompt);
}

// Function to display the selected topic and instructions on the page
function displayTopic(prompt) {
    const topicElement = document.getElementById('random-topic');
    const promptText = `
        <strong>Topic:</strong> ${prompt.topic}<br><br>
        <strong>Instructions:</strong> ${prompt.prompt}
    `;
    topicElement.innerHTML = promptText;
}

// Start the timer when the user clicks "Start Timer"
document.getElementById('start-timer').addEventListener('click', function() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
});

// Update the timer every second
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60); // Get minutes from seconds
    let seconds = timeLeft % 60;  // Get remaining seconds
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;  // Update the timer display

    if (timeLeft <= 5 * 60) { // Less than 5 minutes left
        timerDisplay.style.color = 'red'; // Change color to red
        if (seconds % 2 === 0) {
            timerDisplay.style.visibility = (timerDisplay.style.visibility === 'hidden') ? 'visible' : 'hidden'; // Flash the timer
        }
    }

    if (timeLeft > 0) {
        timeLeft--; // Decrease time by 1 second
    } else {
        clearInterval(timerInterval);  // Stop the timer when it reaches 0
        alert("Time is up! Please submit your essay.");
    }
}

// Enable text editing functionality (cut, paste, undo, redo)
document.getElementById('cut').addEventListener('click', function() {
    document.getElementById('essay-editor').setSelectionRange(0, document.getElementById('essay-editor').value.length);
    document.execCommand('cut');
});

document.getElementById('paste').addEventListener('click', function() {
    document.execCommand('paste');
});

document.getElementById('undo').addEventListener('click', function() {
    document.execCommand('undo');
});

document.getElementById('redo').addEventListener('click', function() {
    document.execCommand('redo');
});

// Save essay functionality
document.getElementById('save-essay').addEventListener('click', function() {
    const essayText = document.getElementById('essay-editor').value;
    if (essayText.trim() === "") {
        alert("Please write your essay before saving.");
        return;
    }

    const essayBlob = new Blob([essayText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(essayBlob);
    link.download = 'essay_' + new Date().toISOString() + '.txt';  // Save as text file with timestamp
    link.click();
});

// Load the prompts when the page is loaded
window.onload = function() {
    loadPrompts();  // Load the prompts from the JSON file
};
