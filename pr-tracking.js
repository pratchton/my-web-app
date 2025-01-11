document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('pr-table').querySelector('tbody');
  const addRowButton = document.getElementById('add-row');
  const saveDataButton = document.getElementById('save-data');

  // Load saved data or initialize default rows
  function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('prTrackingData')) || [];
    if (savedData.length === 0) {
      // Initialize with 5 default rows
      for (let i = 0; i < 5; i++) {
        addRow('', '', i + 1);
      }
    } else {
      savedData.forEach((data, index) => {
        addRow(data.prNumber, data.note, index + 1);
      });
    }
  }

  // Save table data to localStorage
  function saveData() {
    const rows = tableBody.querySelectorAll('tr');
    const data = Array.from(rows).map(row => ({
      prNumber: row.querySelector('.pr-input').value,
      note: row.querySelector('.note-input').value,
    }));
    localStorage.setItem('prTrackingData', JSON.stringify(data));
    alert('Data saved successfully!');
  }

  // Add a new row to the table
  function addRow(prNumber = '', note = '', lineNumber = tableBody.rows.length + 1) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${lineNumber}</td>
      <td><input type="text" class="pr-input" value="${prNumber}" placeholder="Enter PR Number"></td>
      <td>
        <div class="status-indicator">
          <div class="circle" title="PR Release"></div>
          <div class="circle" title="RFQ in Process"></div>
          <div class="circle" title="PO Release"></div>
        </div>
      </td>
      <td><label class="pct-label">0</label></td>
      <td><button class="detail-button">Detail</button></td>
      <td><input type="text" class="note-input" value="${note}" placeholder="Enter Note"></td>
      <td><button class="email-button" onclick="sendEmail()">Email</button></td>
      <td><button class="delete-row-button">Delete Row</button></td>
    `;
    tableBody.appendChild(newRow);

    // Attach delete event to the delete button
    newRow.querySelector('.delete-row-button').addEventListener('click', function () {
      deleteRow(newRow);
    });

    // Attach click event to the detail button
    newRow.querySelector('.detail-button').addEventListener('click', function () {
      alert(`Detail button clicked for row ${lineNumber}`);
    });

    // Update line numbers for all rows
    updateLineNumbers();
  }

  // Delete a specific row
  function deleteRow(row) {
    row.remove();
    updateLineNumbers();
  }

  // Update line numbers after a row is deleted
  function updateLineNumbers() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
      row.querySelector('td:first-child').textContent = index + 1;
    });
  }

  // Function to send an email
  window.sendEmail = function () {
    const recipient = "buyer@borouge.comx";
    const subject = "PR follow-up";
    const body = "Dear Buyer,%0A%0APlease expedite this PR due to urgency.%0A%0AThank you.%0A%0A[Your Name]";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  // Add row button functionality
  addRowButton.addEventListener('click', function () {
    addRow();
  });

  // Save data button functionality
  saveDataButton.addEventListener('click', saveData);

  // Load saved data when the page loads
  loadSavedData();
});


fetch('http://localhost:5000/get_data')
  .then(response => response.json())
  .then(data => {
    console.log('Data fetched from backend:', data);
    // Use this data to populate your table dynamically
  })
  .catch(error => console.error('Error fetching data:', error));


  function saveToDatabase() {
    const data = [
      {
        "Line Number": 1,
        "PR Number": "PR-100005",
        "Note": "Follow-up required",
        "PR Release": 1,
        "RFQ in Process": 0,
        "PO Release": 0,
        "PCT": 4
      }
    ];
  
    fetch('http://localhost:5000/save_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error saving data:', error));
  }
  