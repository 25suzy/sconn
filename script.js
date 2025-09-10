const thumbsContainer = document.getElementById("thumbnails");
const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
const titleEl = document.getElementById("book-title");
const descEl = document.getElementById("book-desc");

const books = [
  { title: "프셉마음 신생아 중환자실편", desc: "NICU 신규 간호사를 위한 필독서" },
  { title: "신생아 간호 실무 A", desc: "현장에서 바로 쓰는 체크리스트와 팁" },
  { title: "중환자 케어 가이드", desc: "케이스별 처치 우선순위 정리" },
  { title: "호흡기 관리 실무", desc: "인공호흡기 설정과 모니터링" },
  { title: "영양 및 성장관리", desc: "신생아 영양 이슈와 해결법" }
];

let current = 0;

/**
 * 계산 전략
 * - offset: i - current (원형 인덱스)
 * - translateX = offset * gap
 * - translateZ = -abs(offset) * depthStep (뒤로 갈수록 -Z)
 * - rotateY = offset * -8deg (좌/우 회전)
 * - scale = 1 - abs(offset)*0.06
 * - opacity = clamp(1 - abs(offset)*0.25, 0.12, 1)
 * - brightness: center 1, others 0.7 (dim 30%)
 */
function normalizeIndex(i, len) {
  // i may be negative or >len-1
  return ((i % len) + len) % len;
}

function shortestOffset(i, current, len) {
  // 원형 배열에서 current와 i 사이의 최소 거리(부호 포함)
  const diff = i - current;
  const alt = diff > 0 ? diff - len : diff + len;
  return Math.abs(diff) <= Math.abs(alt) ? diff : alt;
}

function updateCarousel() {
  const len = thumbnails.length;

  thumbnails.forEach((el, idx) => {
    // 실제 index (0..len-1)
    const offset = shortestOffset(idx, current, len); // 정수 (음수: 왼쪽, 양수: 오른쪽)
    const absOffset = Math.abs(offset);

    // 값 계산
    const gap = 40; // px translateX per step
    const depthStep = 60; // px translateZ per step
    const translateX = offset * gap;
    const translateZ = -absOffset * depthStep;
    const rotateY = offset * -8; // degrees
    const scale = Math.max(1 - absOffset * 0.06, 0.6);
    const opacity = Math.max(1 - absOffset * 0.25, 0.12);
    const brightness = offset === 0 ? 1 : 0.7; // 중앙만 원래 밝기, 나머지는 70% (dim 30%)

    // z-index: 중앙이 가장 위
    const zIndex = 100 - absOffset;

    // apply styles
    el.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
    el.style.opacity = opacity;
    el.style.filter = `brightness(${brightness})`;
    el.style.zIndex = zIndex;
    el.setAttribute("aria-hidden", absOffset > 3 ? "true" : "false"); // 너무 멀면 비활성화
    el.classList.toggle("is-center", offset === 0);
  });

  // 정보 업데이트
  const book = books[current];
  titleEl.textContent = book.title;
  descEl.textContent = book.desc;
}

document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % thumbnails.length;
  updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + thumbnails.length) % thumbnails.length;
  updateCarousel();
});

// 클릭으로 중앙 전환 (선택적)
thumbnails.forEach((t, i) => {
  t.addEventListener("click", () => {
    // 클릭한 카드가 중앙이 아니면 중앙으로 이동
    if (i !== current) {
      current = i;
      updateCarousel();
    }
  });
});

updateCarousel();
