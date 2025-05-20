(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  // Data alvo para a contagem regressiva (13 de dezembro de 2025)
  let targetDate = "12/13/2025";
  
  const countDown = new Date(targetDate).getTime(),
      x = setInterval(function() {    
        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day));
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        // Quando a data for atingida
        if (distance < 0) {
          document.getElementById("countdown").style.display = "none";
          clearInterval(x);
        }
      }, 0)
}());
