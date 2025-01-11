document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("#is-table tbody tr");

  rows.forEach(row => {
    const stockCell = row.cells[3]; // Stock column
    const zeroStockCell = row.cells[4]; // Zero Stock column

    if (stockCell && zeroStockCell && parseInt(stockCell.textContent.trim()) === 0) {
      zeroStockCell.classList.add("zero-stock-highlight");
    }
  });
});

function filterByDepartment(department) {
  const rows = document.querySelectorAll('#is-table tbody tr');

  rows.forEach(row => {
    const departmentCell = row.cells[5]; // Department column
    if (department === 'ALL' || (departmentCell && departmentCell.textContent.trim() === department)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterZeroStock() {
  const rows = document.querySelectorAll('#is-table tbody tr');

  rows.forEach(row => {
    const stockCell = row.cells[3]; // Stock column
    if (stockCell && parseInt(stockCell.textContent.trim()) === 0) {
      row.style.display = ''; // Show rows with zero stock
    } else {
      row.style.display = 'none'; // Hide other rows
    }
  });
}


let isZeroStockFiltered = false;

function toggleZeroStockFilter() {
  const rows = document.querySelectorAll('#is-table tbody tr');

  if (isZeroStockFiltered) {
    // Show all rows
    rows.forEach(row => {
      row.style.display = '';
    });
    isZeroStockFiltered = false;
  } else {
    // Filter rows with zero stock
    rows.forEach(row => {
      const stockCell = row.cells[3]; // Stock column
      if (stockCell && parseInt(stockCell.textContent.trim()) === 0) {
        row.style.display = ''; // Show rows with zero stock
      } else {
        row.style.display = 'none'; // Hide other rows
      }
    });
    isZeroStockFiltered = true;
  }
}


function saveTableData() {
  const rows = document.querySelectorAll('#is-table tbody tr');
  const data = [];

  rows.forEach(row => {
    const rowData = Array.from(row.cells).map(cell => {
      const input = cell.querySelector('input');
      if (input) {
        if (input.type === 'checkbox') {
          return input.checked;
        } else {
          return input.value;
        }
      }
      return cell.textContent.trim();
    });
    data.push(rowData);
  });

  localStorage.setItem('tableData', JSON.stringify(data));
  alert('Table data saved successfully!');
}

function loadTableData() {
  const savedData = localStorage.getItem('tableData');
  if (savedData) {
    const data = JSON.parse(savedData);
    const rows = document.querySelectorAll('#is-table tbody tr');

    data.forEach((rowData, rowIndex) => {
      const row = rows[rowIndex];
      if (row) {
        rowData.forEach((cellData, cellIndex) => {
          const cell = row.cells[cellIndex];
          const input = cell.querySelector('input');
          if (input) {
            if (input.type === 'checkbox') {
              input.checked = cellData;
            } else {
              input.value = cellData;
            }
          } else {
            cell.textContent = cellData;
          }
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', loadTableData);
