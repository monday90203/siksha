const cards = document.querySelectorAll(".movie-card");

const overlay = document.getElementById("movieOverlay");
const closeBtn = document.getElementById("closeMovieOverlay");

const titleEl = document.getElementById("overlayTitle");
const posterEl = document.getElementById("overlayPoster");
const ratingEl = document.getElementById("overlayRating");
const reviewEl = document.getElementById("overlayReview");

// 카드 클릭 → 오버레이 열기
cards.forEach(card => {
  card.addEventListener("click", () => {
    titleEl.textContent = card.dataset.title;
    posterEl.src = card.dataset.poster;
    ratingEl.textContent = card.dataset.rating;
    reviewEl.textContent = card.dataset.review;

    overlay.classList.remove("hidden");
  });
});

// 닫기
closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// 배경 클릭 닫기 (선택)
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});
