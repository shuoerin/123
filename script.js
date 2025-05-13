// scripts.js
let chart;  // 用來儲存圖表實例

function handleFileUpload() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("請選擇一個CSV文件！");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const contents = e.target.result;
    const data = parseCSV(contents);
    renderChart(data);
  };

  reader.readAsText(file);
}

function parseCSV(csvText) {
  const rows = csvText.split('\n');
  const headers = rows[0].split(',');  // 假設第一行是標題
  const data = {
    labels: [],
    datasets: [{
      label: '資料集',
      data: []
    }]
  };

  rows.slice(1).forEach(row => {
    const cells = row.split(',');
    data.labels.push(cells[0]);  // 假設第一列是X軸
    data.datasets[0].data.push(Number(cells[1]));  // 假設第二列是Y軸數據
  });

  return data;
}

function renderChart(data) {
  const ctx = document.getElementById('dataChart').getContext('2d');

  if (chart) {
    chart.destroy();  // 如果已有圖表，先銷毀再重新渲染
  }

  chart = new Chart(ctx, {
    type: document.getElementById('chartType').value,  // 使用選擇的圖表類型
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 監聽圖表類型選擇變更
document.getElementById('chartType').addEventListener('change', function() {
  const data = chart.data;
  renderChart(data);  // 重新渲染圖表
});
