
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        timer = 0; // Set the timer to zero
        submitQuiz(); // Call the submitQuiz function
      }
    }, 1000);
  }
  
  function submitQuiz() {
    // Add code to submit the quiz automatically here
    document.querySelector("#quiz-form").submit();
  }

  var duration = 60 * 1; // 1 minutes
  var display = document.querySelector('#timer');
  startTimer(duration, display);
  function suresubmitbefore()
  {
    Swal.fire({
      position: 'top-middle',
      icon: 'success',
      title: 'Test has Successfully completed',
      showConfirmButton: false,
      timer: 1500,
    })
  }
    