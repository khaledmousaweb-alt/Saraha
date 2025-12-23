// ============================================
// DASHBOARD FUNCTIONALITY
// Handles dashboard interactions and messaging
// ============================================

// Check authentication on page load
if (!requireAuth()) {
  // User will be redirected by requireAuth()
}

// Global state
let currentUser = null;
let currentTab = "inbox";

// Initialize dashboard
document.addEventListener("DOMContentLoaded", async () => {
  await loadUserProfile();
  await loadMessages("inbox");
  setupEventListeners();
});

// Load user profile
async function loadUserProfile() {
  try {
    // First try to get from API
    const userData = await api.getUserProfile();
    if (userData) {
      currentUser = userData;

      // Save to localStorage
      saveUserData(userData);

      // Update welcome message
      const welcomeMsg = document.getElementById("welcomeMessage");
      if (welcomeMsg) {
        welcomeMsg.textContent = `Welcome back, ${
          userData.userName || userData.email
        }!`;
      }

      // Update user avatar
      const avatar = document.getElementById("userAvatar");
      if (avatar && userData.userName) {
        avatar.textContent = getUserInitials(userData.userName);
      }

      // Set share link (using user ID as identifier)
      const shareLink = document.getElementById("shareLink");
      if (shareLink) {
        shareLink.value = `${window.location.origin}/index.html?to=${userData.id}`;
      }
    }
  } catch (error) {
    console.error("Failed to load user profile:", error);
    // Fallback to localStorage
    const userData = getUserData();
    if (userData) {
      currentUser = userData;
      const welcomeMsg = document.getElementById("welcomeMessage");
      if (welcomeMsg) {
        welcomeMsg.textContent = `Welcome back, ${
          userData.userName || userData.email
        }!`;
      }
    }
  }
}

// Load messages
async function loadMessages(type = "inbox") {
  const containerId = type === "inbox" ? "inboxMessages" : "sentMessages";
  const container = document.getElementById(containerId);

  if (!container) return;

  // Show loading
  container.innerHTML =
    '<div style="text-align: center; padding: 3rem;"><div class="spinner"></div></div>';

  try {
    const userData = getUserData();
    if (!userData || !userData.id) {
      throw new Error("User data not found");
    }

    // Fetch messages from API
    const response = await api.getAllMessages(
      type,
      type === "sent" ? userData.id : "",
      type === "inbox" ? userData.id : ""
    );

    const messages = response.data || [];

    if (messages.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${type === "inbox" ? "📭" : "📪"}</div>
          <h3 class="empty-title">No messages yet</h3>
          <p class="empty-text">
            ${
              type === "inbox"
                ? "Share your link to start receiving anonymous messages"
                : "Send a message to see it here"
            }
          </p>
        </div>
      `;
    } else {
      renderMessages(messages, containerId);
    }

    // Update stats
    if (type === "inbox") {
      updateStats(messages.length, 0);
    } else {
      updateStats(0, messages.length);
    }
  } catch (error) {
    console.error("Failed to load messages:", error);
    container.innerHTML = `
      <div class="alert alert-error">
        Failed to load messages. Please try again.
      </div>
    `;
  }
}

// Update statistics
function updateStats(inboxCount, sentCount) {
  const totalMessages = inboxCount + sentCount;

  const totalEl = document.getElementById("totalMessages");
  const inboxEl = document.getElementById("inboxCount");
  const sentEl = document.getElementById("sentCount");

  if (totalEl) totalEl.textContent = totalMessages;
  if (inboxEl) inboxEl.textContent = inboxCount;
  if (sentEl) sentEl.textContent = sentCount;
}

// Render messages
function renderMessages(messages, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!messages || messages.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3 class="empty-title">No messages</h3>
        <p class="empty-text">No messages to display</p>
      </div>
    `;
    return;
  }

  container.innerHTML = messages
    .map(
      (msg) => `
    <div class="message-card">
      <div class="message-header">
        <span class="message-sender">${sanitizeHTML(
          msg.sender || "Anonymous"
        )}</span>
        <span class="message-date">${formatDate(msg.createdAt)}</span>
      </div>
      <div class="message-content">
        ${sanitizeHTML(msg.content)}
      </div>
      <div class="message-actions">
        <button class="message-btn message-btn-delete" onclick="deleteMessage('${
          msg._id
        }')">
          🗑️ Delete
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Delete message
async function deleteMessage(messageId) {
  if (!confirm("Are you sure you want to delete this message?")) {
    return;
  }

  showLoading();

  try {
    await api.deleteMessage({ messageId });
    showToast("Message deleted successfully", "success");
    await loadMessages(currentTab);
  } catch (error) {
    showToast(error.message || "Failed to delete message", "error");
  } finally {
    hideLoading();
  }
}

// Switch tabs
function switchTab(tabName) {
  currentTab = tabName;

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.tab === tabName) {
      btn.classList.add("active");
    }
  });

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.style.display = "none";
  });

  const activeTab = document.getElementById(`${tabName}Tab`);
  if (activeTab) {
    activeTab.style.display = "block";
  }

  // Load messages for inbox/sent tabs
  if (tabName === "inbox" || tabName === "sent") {
    loadMessages(tabName);
  }
}

// Copy share link
async function copyShareLink() {
  const shareLink = document.getElementById("shareLink");
  const copyBtn = document.querySelector(".copy-btn");
  const copyBtnText = document.getElementById("copyBtnText");

  if (!shareLink) return;

  const success = await copyToClipboard(shareLink.value);

  if (success && copyBtn && copyBtnText) {
    copyBtn.classList.add("copied");
    copyBtnText.textContent = "✓ Copied!";

    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtnText.textContent = "Copy Link";
    }, 2000);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Send message form
  const sendMessageForm = document.getElementById("sendMessageForm");
  if (sendMessageForm) {
    sendMessageForm.addEventListener("submit", handleSendMessage);
  }
}

// Handle send message
async function handleSendMessage(e) {
  e.preventDefault();

  const receiverId = document.getElementById("receiverId").value.trim();
  const content = document.getElementById("messageContent").value.trim();
  const sender =
    document.getElementById("senderName").value.trim() || "Anonymous";

  if (!receiverId || !content) {
    showToast("Please fill in all required fields", "warning");
    return;
  }

  showLoading();

  try {
    await api.sendMessage({
      reciever: receiverId,
      content: content,
      sender: sender,
    });

    showToast("Message sent successfully!", "success");

    // Clear form
    document.getElementById("sendMessageForm").reset();

    // Switch to sent tab
    switchTab("sent");
  } catch (error) {
    showToast(error.message || "Failed to send message", "error");
  } finally {
    hideLoading();
  }
}

// Handle logout
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    clearUserData();
    api.logout();
    window.location.href = "login.html";
  }
}
