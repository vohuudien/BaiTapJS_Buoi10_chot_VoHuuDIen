var staffs = [];
getStaff();

function getStaff() {
  staffs = JSON.parse(localStorage.getItem("workers")) || [];

  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    staffs[i] = new Staff(
      staff.id,
      staff.name,
      staff.email,
      staff.password,
      staff.dateOfWorking,
      staff.basicSalary,
      staff.position,
      staff.hoursOfWorking
    );
  }

  display(staffs);
}

function display(staffs) {
  var tbodyEl = document.getElementById("tableDanhSach");
  var html = "";

  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    html += `<tr>
  <td>${staff.id}</td>
  <td>${staff.name}</td>
  <td>${staff.email}</td>
  <td>${staff.dateOfWorking}</td>
  <td>${staff.position}</td>
  <td>${staff.calTotalIncome()}</td>
  <td>${staff.getRank()}</td>
    <td>
    <button class='btn btn-success'onclick='deleteStaff("${
      staff.id
    }")'>Delete</button>
    <button class='btn btn-primary'data-toggle="modal" data-target="#myModal" onclick='updateStaff("${
      staff.id
    }")'>Update</button>
    
    </td>

  </tr>`;
  }

  tbodyEl.innerHTML = html;
}

function addNewStaff() {
  resetSpan();
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateOfWorking = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hoursOfWorking = +document.getElementById("gioLam").value;

  var checkEmptyOrNot = checkIDblank();
  var checkDuplicateOne = checkDuplicate();
  if (!checkEmptyOrNot) {
    return;
  }
  if (!checkDuplicateOne) {
    return;
  }
  var staff = new Staff(
    id,
    name,
    email,
    password,
    dateOfWorking,
    basicSalary,
    position,
    hoursOfWorking
  );
  staffs.push(staff);

  localStorage.setItem("workers", JSON.stringify(staffs));
  display(staffs);
  resetForm();
  $("#myModal").modal("hide");

  console.log(staffs);
}

function resetForm() {
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnCapNhat").disabled = false;

  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "Ch???n ch???c v???";
  document.getElementById("gioLam").value = "";
}
function resetSpan() {
  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";
}
function blockCapNhat() {
  resetForm();
  resetSpan();
  document.getElementById("btnCapNhat").disabled = true;
}
function checkDuplicate() {
  var id = document.getElementById("tknv").value;
  var email = document.getElementById("email").value;
  var isValid = true;
  if (findIdStaff(id) !== -1) {
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML =
      "ID ???? s??? d???ng, vui l??ng nh???p ID kh??c";
  }
  if (findEmailStaff(email) !== -1) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Email ???? s??? d???ng, vui l??ng nh???p email kh??c";
  }
  return isValid;
}
function checkIDblank() {
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateOfWorking = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hoursOfWorking = +document.getElementById("gioLam").value;

  var isValid = true;
  if (!isRequired(id)) {
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML = "ID kh??ng ???????c ????? tr???ng";
  } else if (!minLength(id, 4)) {
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML = "ID ph???i c?? ??t nh???t 4 k?? t???";
  } else if (!maxLength(id, 6)) {
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML = "ID t???i ??a 6 k?? t??? th??i";
  }

  var letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML = "T??n kh??ng ???????c ????? tr???ng";
  } else if (!letters.test(name)) {
    isValid = false;
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML =
      "T??n nh??n vi??n c?? k?? t??? kh??ng h???p l???";
  }

  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML = "Email kh??ng ???????c ????? tr???ng";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Email c?? k?? t??? kh??ng h???p l???";
  }

  var pwPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "M???t Kh???u kh??ng ???????c ????? tr???ng";
  } else if (!minLength(password, 6)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "M???t Kh???u t???i thi???u 6 k?? t???";
  } else if (!maxLength(password, 10)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "M???t Kh???u t???i ??a 10 k?? t??? ";
  } else if (!pwPattern.test(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "M???t Kh???u c?? k?? t??? kh??ng ph?? h???p";
  }

  if (!isRequired(dateOfWorking)) {
    isValid = false;
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Ng??y l??m kh??ng ???????c ????? tr???ng";
  }

  if (!isRequired(basicSalary)) {
    isValid = false;
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "L????ng kh??ng ???????c ????? tr???ng";
  } else if (basicSalary < 1000000) {
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "L????ng d?????i 1000000 ai m?? th??m l??m, nh???p l???i l????ng cao h??n ??i";
    return;
  } else if (basicSalary > 20000000) {
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "L????ng ??? ????y ch??? tr??? 20000000 th??i, kh??ng cao h??n, nh???p l???i l????ng th???p h??n ??i";
  }

  if (position === "Ch???n ch???c v???") {
    isValid = false;
    document.getElementById("tbChucVu").style.display = "block";
    document.getElementById("tbChucVu").innerHTML = "Vui Long chon chuc vu";
  }

  if (!isRequired(hoursOfWorking)) {
    isValid = false;
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Gi??? l??m kh??ng ???????c ????? tr???ng";
  } else if (hoursOfWorking < 80) {
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "L??m ??t gi??? qu?? kh??ng tuy???n ????u, b??o nh???t ph???i tr??n 80";
  } else if (hoursOfWorking > 200) {
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "L??m nhi???u gi??? v???y c??ng ty kh??ng c?? ti???n tr???, ??t h??n 200 m???i ???????c";
  }
  return isValid;
}
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}

function deleteStaff(staffId) {
  var newIndex = findIdStaff(staffId);

  if (newIndex !== -1) {
    staffs.splice(newIndex, 1);
  }
  localStorage.setItem("workers", JSON.stringify(staffs));
  display(staffs);
}

function findIdStaff(staffId) {
  var index = -1;

  for (var i = 0; i < staffs.length; i++) {
    if (staffs[i].id === staffId) {
      index = i;
      break;
    }
  }
  return index;
}
function findEmailStaff(email) {
  var index = -1;

  for (var i = 0; i < staffs.length; i++) {
    if (staffs[i].email === email) {
      index = i;
      break;
    }
  }
  return index;
}
function updateStaff(staffId) {
  resetForm();
  document.getElementById("btnThemNV").disabled = true;
  var index = findIdStaff(staffId);
  console.log(index);
  if (index !== -1) {
    var staff = staffs[index];
    document.getElementById("tknv").value = staff.id;
    document.getElementById("name").value = staff.name;
    document.getElementById("email").value = staff.email;
    document.getElementById("password").value = staff.password;
    document.getElementById("datepicker").value = staff.dateOfWorking;
    document.getElementById("luongCB").value = staff.basicSalary;
    document.getElementById("chucvu").value = staff.position;
    document.getElementById("gioLam").value = staff.hoursOfWorking;

    document.getElementById("tknv").disabled = true;
  }
  resetSpan();
  return;
}

function reUpdate() {
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateOfWorking = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hoursOfWorking = +document.getElementById("gioLam").value;
  // if (findEmailStaff(email)!==-1){
  //   document.getElementById("tbEmail").style.display = "block";
  //   document.getElementById("tbEmail").innerHTML = "Email ???? s??? d???ng, vui l??ng nh???p email kh??c";
  //   return
  // }

  if (!checkIDblank()) {
    return;
  }
  var staff = new Staff(
    id,
    name,
    email,
    password,
    dateOfWorking,
    basicSalary,
    position,
    hoursOfWorking
  );

  var index = findIdStaff(staff.id);
  if (index !== -1) {
    staffs[index] = staff;
  }
  localStorage.setItem("workers", JSON.stringify(staffs));

  display(staffs);
  $("#myModal").modal("hide");
}

function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}
function maxLength(value, limit) {
  if (value.length > limit) {
    return false;
  }

  return true;
}
