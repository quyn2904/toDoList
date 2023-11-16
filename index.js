document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); //chặn sự kiện submit làm reset trang default
  // lấy giá trị của input#name
  let name = document.querySelector("#name").value;
  // tạo ra 1 đối tượng
  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };
  console.log(item);
  console.log(item);
  // hiển thị item lên giao diện: addItemToUI(item)
  addItemToUI(item);
  // lưu item vào localStorage: addItemToLS(item)
  addItemToLS(item);
});

// getList(): khi gọi hàm sẽ nhận đc danh sách các item  //do lưu từ localStorage
const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

// hàm nhận vào 1 item và hiển thị lên UI
const addItemToUI = (item) => {
  let newCard = document.createElement("div");
  newCard.className =
    "card d-flex flex-row justify-content-between align-items-center p-3 mb-3";
  newCard.innerHTML = `
    <span>${item.name}</span>
    <button data-id="${item.id}" class="btn btn-danger small btn-remove">Remove</button>
    `;
  document.querySelector(".list").appendChild(newCard);
};

// hàm nhận vào item và lưu nó vào trong list trong LS
const addItemToLS = (item) => {
  // lấy list từ ls về
  let list = getList();
  // nhét item vào list
  list.push(item);
  //lưu lại lên localStorage
  localStorage.setItem("list", JSON.stringify(list));
};

// init: render ra các item trong list
const init = () => {
  // lấy danh sách từ ls
  let list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
};

init();

// sự kiện xóa 1 item

document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    let nameItem = event.target.previousElementSibling.innerHTML;
    let isConfirmed = confirm(`Bạn có chắc là muốn xóa item ${nameItem}`);
    if (isConfirmed) {
      //xóa trên UI
      let card = event.target.parentElement;
      card.remove();
      // hàm xóa item trong ls bằng id của item: removeItemFromLS(idRemove)
      let idRemove = event.target.dataset.id;
      removeItemFromLS(idRemove);
    }
  }
});

const removeItemFromLS = (idRemove) => {
  //lấy danh sách
  let list = getList();
  //xóa item có id giống == idRemove
  list = list.filter((item) => item.id != idRemove);
  // cập nhật danh sách mới vào LS
  localStorage.setItem("list", JSON.stringify(list));
};

// remove all
document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
  let isConfirmed = confirm("Bạn có chắc là muốn xóa tất cả không ?");
  if (isConfirmed) {
    // xóa hết ui
    document.querySelector(".list").innerHTML = "";
    // xóa trên ls
    localStorage.removeItem("list");
  }
});

// chức năng filer
// làm thêm chức năng filter gõ tìm kiếm ko dấu cũng ra

document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value;
  let list = getList(); //lấy danh sách các item
  // lọc ra các item nào có name chứa giá trị vừa lấy
  let filterList = list.filter((item) => item.name.includes(inputValue));
  // xóa danh sách cũ trước khi render danh sách mới lọc
  document.querySelector(".list").innerHTML = "";
  //render danh sách mới lọc
  filterList.forEach((item) => {
    addItemToUI(item);
  });
});
