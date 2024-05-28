var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var invalidMessage = document.getElementById("invalidMessage");

var sitesList = [];

if (localStorage.getItem("urlInfo") !== null) {
  sitesList = JSON.parse(localStorage.getItem("urlInfo"));
  displaySites();
}

function addSite() {
  if (inputValidation(siteName) && inputValidation(siteUrl)) {
    var siteObject = {
      name: siteName.value,
      url: siteUrl.value,
    };
    sitesList.push(siteObject);
    localStorage.setItem("urlInfo", JSON.stringify(sitesList));
    clearInputs();
    displaySites();
  } else {
    invalidMessage.classList.remove("d-none");
  }
}
function clearInputs() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}
function displaySites() {
  var tbodyInner = document.getElementById("tbodyInner");
  var container = ``;
  for (var i = 0; i < sitesList.length; i++) {
    container += `
        <tr>
            <td scope="col">${i + 1}</td>
            <td>${sitesList[i].name}</td>
            <td><a href="${
              sitesList[i].url
            }" target="_blank" class="btn green-color-btn"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
            <td><button onclick="deleteSite(${i})" class="btn red-color-btn"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
        </tr>
        `;
  }
  tbodyInner.innerHTML = container;
}

function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("urlInfo", JSON.stringify(sitesList));
  displaySites();
}

function inputValidation(element) {
  var text = element.value;
  var regex = {
    siteName: /^\w{3,}$/,
    siteUrl:
      /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b|localhost)(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  };
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
function closeMessage() {
  invalidMessage.classList.add("d-none");
}
