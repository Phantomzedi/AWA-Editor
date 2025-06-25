// Wait for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 30 * 60; // 30 minutes in seconds
    const timerDisplay = document.getElementById('timer');
    let isTimerRunning = false;
    let timerInterval;

    // Timer functionality
    function startTimer() {
        timerInterval = setInterval(function() {
            let minutes = Math.floor(timeLeft / 60); // Get minutes
            let seconds = timeLeft % 60; // Get seconds
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

            if (timeLeft <= 5 * 60) { // Less than 5 minutes left
                timerDisplay.style.color = 'red';
                if (seconds % 2 === 0) {
                    timerDisplay.style.visibility = (timerDisplay.style.visibility === 'hidden') ? 'visible' : 'hidden'; // Flash the timer
                }
            }

            if (timeLeft > 0) {
                timeLeft--; // Decrease time by 1 second
            } else {
                clearInterval(timerInterval); // Stop the timer when it reaches 0
                alert("Time is up! Please submit your essay.");
            }
        }, 1000); // Start the timer immediately
    }

    // Load the JSON file with prompts
    function loadPrompts() {
        fetch('assets/awa-ets.json')  // Path to your JSON file (now named awa-ets.json)
            .then(response => response.json())
            .then(data => {
                console.log("Prompts loaded:", data);
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

    // Start the timer immediately when the test page is loaded
    if (!isTimerRunning) {
        isTimerRunning = true;
        startTimer(); // Only call startTimer once
    }

    // Load the prompts when the page is loaded
    loadPrompts();  // Load the prompts from the JSON file

    // Text editor buttons functionality
    const editor = document.getElementById('essay-editor');

    // Cut functionality
    document.getElementById('cut').addEventListener('click', function() {
        editor.setSelectionRange(0, editor.value.length);  // Select the entire content
        document.execCommand('cut'); // Execute the cut command
    });

    // Paste functionality
    document.getElementById('paste').addEventListener('click', function() {
        document.execCommand('paste');  // Execute the paste command
    });

    // Undo functionality
    document.getElementById('undo').addEventListener('click', function() {
        document.execCommand('undo');  // Execute the undo command
    });

    // Redo functionality
    document.getElementById('redo').addEventListener('click', function() {
        document.execCommand('redo');  // Execute the redo command
    });

    // Save essay functionality
    document.getElementById('save-essay').addEventListener('click', function() {
        const essayText = editor.value;
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
});
