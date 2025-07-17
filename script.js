$(document).ready(function() {
    let state = {
        sessionLength: 25,
        breakLength: 5,
        isRunning: false,
        currentMode: "session", // or "break"
        timer: null,
        timeLeft: 1500, // in seconds
    };

    // Increment/Decrement Logic
    $('#break-increment').on('click', function() {
        if (state.breakLength < 60) {
            state.breakLength++;
            $('#break-length').text(state.breakLength);
        }
    });

    $('#break-decrement').on('click', function() {
        if (state.breakLength > 1) {
            state.breakLength--;
            $('#break-length').text(state.breakLength);
        }
    });

    $('#session-increment').on('click', function() {
        if (state.sessionLength < 60) {
            state.sessionLength++;
            $('#session-length').text(state.sessionLength);
            if (!state.isRunning) {
                state.timeLeft = state.sessionLength * 60;
                updateDisplay();
            }
        }
    });

    $('#session-decrement').on('click', function() {
        if (state.sessionLength > 1) {
            state.sessionLength--;
            $('#session-length').text(state.sessionLength);
            if (!state.isRunning) {
                state.timeLeft = state.sessionLength * 60;
                updateDisplay();
            }
        }
    });

    function updateDisplay() {
        let minutes = Math.floor(state.timeLeft / 60);
        let seconds = state.timeLeft % 60;
        $('#time-left').text(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }

    $('#start_stop').on('click', function() {
        if (state.isRunning) {
            clearInterval(state.timer);
            state.isRunning = false;
            $('#start_stop').text('Start');
        } else {
            state.isRunning = true;
            $('#start_stop').text('Pause');
            state.timer = setInterval(() => {
                state.timeLeft--;
                updateDisplay();
                if (state.timeLeft < 0) {
                    $('#beep').trigger('play');
                    if (state.currentMode === 'session') {
                        state.currentMode = 'break';
                        state.timeLeft = state.breakLength * 60;
                        $('#timer-label').text('Break');
                    } else {
                        state.currentMode = 'session';
                        state.timeLeft = state.sessionLength * 60;
                        $('#timer-label').text('Session');
                    }
                    updateDisplay();
                }
            }, 1000);
        }
    });

    $('#reset').on('click', function() {
        clearInterval(state.timer);
        state.isRunning = false;
        state.sessionLength = 25;
        state.breakLength = 5;
        state.currentMode = "session";
        state.timeLeft = 1500;
        $('#session-length').text(state.sessionLength);
        $('#break-length').text(state.breakLength);
        $('#timer-label').text('Session');
        updateDisplay();
        $('#start_stop').text('Start');
        $('#beep').trigger('pause');
        $('#beep').prop('currentTime', 0);
    });
});
