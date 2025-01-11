//launchpad table logic

// Navigate to other pages
function navigate(page) {
  window.location.href = page;
}

// Tab switching logic
function openTab(event, tabId) {
  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach((content) => {
    content.classList.remove('active');
  });

  // Deactivate all tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach((button) => {
    button.classList.remove('active');
  });

  // Activate the clicked tab and its content
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

