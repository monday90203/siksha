// ✦ Mouse Star Sparkle (throttled)
let lastSparkleTime = 0;
const SPARKLE_INTERVAL = 120; // ms (값 키울수록 더 적게 나옴)

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastSparkleTime < SPARKLE_INTERVAL) return;

  lastSparkleTime = now;

  const star = document.createElement("span");
  star.className = "mouse-star";
  star.textContent = "✦";

  star.style.left = e.pageX + "px";
  star.style.top = e.pageY + "px";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 800);
});
