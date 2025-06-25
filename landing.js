document.getElementById('begin-test').addEventListener('click', function() {
    window.location.href = 'test.html';  // Redirect to the test page

    // Start the timer immediately when the test page is loaded
    let timeLeft = 30 * 60; // 30 minutes in seconds
    const timerDisplay = document.getElementById('timer');
    
    // Timer functionality
    function startTimer() {
        setInterval(function() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            if (timeLeft <= 5 * 60) { // Less than 5 minutes left
                timerDisplay.style.color = 'red';
                if (seconds % 2 === 0) {
                    timerDisplay.style.visibility = (timerDisplay.style.visibility === 'hidden') ? 'visible' : 'hidden'; // Flash the timer
                }
            }
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);
                alert("Time is up! Please submit your essay.");
            }
        }, 1000);
    }

    startTimer();  // Start the timer immediately when the page is loaded
});
