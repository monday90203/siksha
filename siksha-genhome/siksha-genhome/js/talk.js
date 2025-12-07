const savePostButton = document.getElementById("savePost");
const postList = document.getElementById("postList");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");

const postsPerPage = 10;
let currentPage = 1;

// 저장된 글 불러오기
function loadPosts(page = 1) {
  const posts = JSON.parse(localStorage.getItem("talkPosts")) || [];
  postList.innerHTML = "";

  // 페이지에 맞는 글만 선택
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = posts.slice(start, end);

  paginatedPosts.forEach((post) => {
    const time = new Date(post.timestamp).toLocaleString();
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="post-title">${post.title}</div>
      <div class="post-time">${time}</div>
      <div class="post-content">${post.content}</div>
      <div class="action-buttons">
        <button class="edit-btn">수정</button>
        <button class="delete-btn" data-title="${post.title}">삭제</button>
      </div>
    `;
    
    // 삭제 버튼 이벤트
    listItem.querySelector(".delete-btn").addEventListener("click", (e) => {
      deletePost(e.target.dataset.title);
    });
    
    // 새로 추가된 글은 상단에 표시
    postList.prepend(listItem);  // prepend()를 사용하여 상단에 추가
  });

  // 페이지 버튼 활성화 여부
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage * postsPerPage >= posts.length;
}

// 글 저장
function savePost() {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  
  if (!title || !content) {
    alert("제목과 내용을 모두 입력하세요!");
    return;
  }

  const post = { title, content, timestamp: new Date() };
  const posts = JSON.parse(localStorage.getItem("talkPosts")) || [];
  
  posts.push(post);
  localStorage.setItem("talkPosts", JSON.stringify(posts));
  
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  
  loadPosts(currentPage);
}

// 글 삭제
function deletePost(title) {
  let posts = JSON.parse(localStorage.getItem("talkPosts")) || [];
  posts = posts.filter(post => post.title !== title);
  
  localStorage.setItem("talkPosts", JSON.stringify(posts));
  
  loadPosts(currentPage);
}

// 페이지 버튼 클릭 시
prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadPosts(currentPage);
  }
});

nextPageButton.addEventListener("click", () => {
  currentPage++;
  loadPosts(currentPage);
});

// 초기 로드
loadPosts(currentPage);

// 저장 버튼 클릭 시
savePostButton.addEventListener("click", savePost);
