const grid = document.getElementById("commissionGrid");
const addBtn = document.getElementById("addImageBtn");
const input = document.getElementById("imageInput");

// overlay
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");
const overlaySource = document.getElementById("overlaySource");
const closeOverlay = document.getElementById("closeOverlay");
const deleteOverlay = document.getElementById("deleteOverlay");  // ✅ 추가

let currentCard = null;  // ✅ 현재 오버레이에 띄운 카드 기억

// storage key
const STORAGE_KEY = "commissionCards";

// ============================
// 저장 / 불러오기
// ============================
function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function loadCards() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// ============================
// 카드 DOM 생성
// ============================
function createCard(imgSrc, source) {
  const card = document.createElement("div");
  card.className = "commission-card";
  card.dataset.source = source;

  const img = document.createElement("img");
  img.src = imgSrc;

  card.appendChild(img);
  return card;
}

// ============================
// 초기 로드
// ============================
function init() {
  const cards = loadCards();
  cards.forEach(({ img, source }) => {
    grid.appendChild(createCard(img, source));
  });
}

document.addEventListener("DOMContentLoaded", init);

// ============================
// 이미지 추가
// ============================
addBtn.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  const source = prompt("출처를 입력하세요 (@아이디)");
  if (!source) {
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const imgSrc = reader.result;

    // DOM 추가
    grid.appendChild(createCard(imgSrc, source));

    // 저장
    const cards = loadCards();
    cards.push({ img: imgSrc, source });
    saveCards(cards);
  };

  reader.readAsDataURL(file);
  input.value = "";
});

// ============================
// 카드 클릭 → 오버레이
// ============================
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".commission-card");
  if (!card) return;

  const img = card.querySelector("img");

  currentCard = card;  // ✅ 어떤 카드를 보고 있는지 저장

  overlayImg.src = img.src;
  overlaySource.textContent = card.dataset.source;
  overlay.classList.remove("hidden");
});

// ============================
// 오버레이 닫기
// ============================
closeOverlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// (선택) 배경 클릭으로 닫기
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});

// ============================
// 오버레이에서 이미지 삭제
// ============================
deleteOverlay.addEventListener("click", () => {
  if (!currentCard) return;

  const targetImg = currentCard.querySelector("img").src;
  const targetSource = currentCard.dataset.source;

  // DOM에서 카드 제거
  currentCard.remove();
  currentCard = null;

  // localStorage에서 해당 카드 제거
  const cards = loadCards();
  const next = cards.filter(
    (c) => !(c.img === targetImg && c.source === targetSource)
  );
  saveCards(next);

  // 오버레이 닫기
  overlay.classList.add("hidden");
});