const thumbnails = document.querySelectorAll(".thumbnail");
const bookTitle = document.getElementById("book-title");
const bookDesc = document.getElementById("book-desc");

const books = [
  { title: "프셉마음 신생아 중환자실편", desc: "NICU 신규 간호사를 위한 필독서" },
  { title: "Book 2 Title", desc: "두 번째 책 설명입니다." },
  { title: "Book 3 Title", desc: "세 번째 책 설명입니다." },
  { title: "Book 4 Title", desc: "네 번째 책 설명입니다." }
];

let current = 0;

function updateCarousel() {
  thumbnails.forEach((thumb, i) => {
    thumb.className = "thumbnail"; // reset

    if (i === current) {
      thumb.classList.add("active");
    } else if (i === (current - 1 + thumbnails.length) % thumbnails.length) {
      thumb.classList.add("prev");
    } else if (i === (current + 1) % thumbnails.length) {
      thumb.classList.add("next");
    } else {
      thumb.classList.add("behind");
    }
  });

  // 도서 정보 업데이트
  bookTitle.textContent = books[current].title;
  bookDesc.textContent = books[current].desc;
}

document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % thumbnails.length;
  updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + thumbnails.length) % thumbnails.length;
  updateCarousel();
});

updateCarousel();
