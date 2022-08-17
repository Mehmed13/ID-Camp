// web storage

const CACHE_KEY = "calculation_history";

function cek_storage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) {
    if (cek_storage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) == null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY)); //mengubah string menjadi object
        }

        historyData.unshift(data); //menambahkan elemen array di indeks terdepan

        if (historyData.length > 5) {
            historyData.pop(); //menghapus elemen array indeks terakhir
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData)); //mengubah object menjadi string

    }
}

function showHistory() {
    if (cek_storage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    //Selalu hapus konten HTML agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
        historyList.appendChild(row);
    }
}

renderHistory();