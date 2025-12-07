const STORAGE_KEY = "fairImageStore";

/* =========================
   D-DAY 계산
========================= */
function calcDDay(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);

  today.setHours(0,0,0,0);
  target.setHours(0,0,0,0);

  const diff = Math.ceil(
    (target - today) / (1000 * 60 * 60 * 24)
  );

  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return "D-DAY";
  return `D+${Math.abs(diff)}`;
}

/* =========================
   Storage
========================= */
function loadStore() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function saveStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* =========================
   Init
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const store = loadStore();

  document.querySelectorAll(".fair-card").forEach(card => {
    const id = card.dataset.id;

    const input = card.querySelector("input[type=file]");
    const img = card.querySelector("img");
    const placeholder = card.querySelector(".thumb-placeholder");

    const dateEl = card.querySelector(".fair-date");
    const ddayEl = card.querySelector(".fair-dday");

    /* ✅ 이미지 복원 */
    if (store[id]?.image) {
      img.src = store[id].image;
      img.style.display = "block";
      placeholder.style.display = "none";
    }

    /* ✅ D-DAY */
    const date = dateEl.dataset.date;
    ddayEl.textContent = calcDDay(date);

    /* ✅ 이미지 업로드 + 저장 */
    input.addEventListener("change", e => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        img.style.display = "block";
        placeholder.style.display = "none";

        store[id] = { image: reader.result };
        saveStore(store);
      };
      reader.readAsDataURL(file);
    });
  });
});
