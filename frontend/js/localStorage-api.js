// ============================================
// LOCALSTORAGE API - Standalone Frontend
// Simulates backend API using localStorage
// ============================================

// Initialize localStorage database
function initializeDB() {
  if (!localStorage.getItem("saraha_users")) {
    localStorage.setItem("saraha_users", JSON.stringify([]));
  }
  if (!localStorage.getItem("saraha_messages")) {
    localStorage.setItem("saraha_messages", JSON.stringify([]));
  }
}

// Generate unique ID
function generateUniqueId() {
  return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

function generateMessageId() {
  return "msg_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

// ============================================
// AUTH API
// ============================================

// Register new user
async function registerUser(userData) {
  initializeDB();

  const users = JSON.parse(localStorage.getItem("saraha_users"));

  // Check if email already exists
  const existingUser = users.find((u) => u.email === userData.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Create new user
  const newUser = {
    id: generateUniqueId(),
    userName: userData.userName,
    email: userData.email,
    password: userData.password, // In real app, this would be hashed
    Phone: userData.Phone,
    gender: userData.gender || "not specified",
    role: "User",
    confirmEmail: true, // Auto-confirm for demo
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("saraha_users", JSON.stringify(users));

  return {
    message: "User registered successfully",
    user: {
      id: newUser.id,
      userName: newUser.userName,
      email: newUser.email,
    },
  };
}

// Login user
async function loginUser(credentials) {
  initializeDB();

  const users = JSON.parse(localStorage.getItem("saraha_users"));
  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Create mock token
  const token = "mock_token_" + user.id;

  // Save auth data
  localStorage.setItem("authToken", token);
  localStorage.setItem(
    "userData",
    JSON.stringify({
      id: user.id,
      userName: user.userName,
      email: user.email,
      Phone: user.Phone,
      role: user.role,
    })
  );

  return {
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      userName: user.userName,
      email: user.email,
    },
  };
}

// ============================================
// USER API
// ============================================

// Get user profile
async function getUserProfile() {
  const userData = localStorage.getItem("userData");
  if (!userData) {
    throw new Error("Not authenticated");
  }

  return {
    message: "Success",
    result: JSON.parse(userData),
  };
}

// ============================================
// MESSAGE API
// ============================================

// Send message
async function sendMessage(messageData) {
  initializeDB();

  const messages = JSON.parse(localStorage.getItem("saraha_messages"));

  const newMessage = {
    _id: generateMessageId(),
    content: messageData.content,
    sender: messageData.sender,
    reciever: messageData.reciever,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  messages.push(newMessage);
  localStorage.setItem("saraha_messages", JSON.stringify(messages));

  return {
    message: "Message sent successfully",
    data: newMessage,
  };
}

// Get all messages (inbox or sent)
async function getAllMessages(params) {
  initializeDB();

  const messages = JSON.parse(localStorage.getItem("saraha_messages"));
  let filteredMessages = [];

  if (params.flag === "inbox") {
    filteredMessages = messages.filter((m) => m.reciever === params.reciever);
  } else if (params.flag === "sent") {
    filteredMessages = messages.filter((m) => m.sender === params.sender);
  }

  // Sort by newest first
  filteredMessages.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return {
    message: "Messages retrieved successfully",
    data: filteredMessages,
  };
}

// Delete message
async function deleteMessage(messageId) {
  initializeDB();

  const messages = JSON.parse(localStorage.getItem("saraha_messages"));
  const filteredMessages = messages.filter((m) => m._id !== messageId);

  localStorage.setItem("saraha_messages", JSON.stringify(filteredMessages));

  return {
    message: "Message deleted successfully",
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Simulate API delay
function simulateDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Wrapper to simulate async API calls
async function mockApiCall(apiFunction, ...args) {
  try {
    await simulateDelay(300); // Simulate network delay
    return await apiFunction(...args);
  } catch (error) {
    throw error;
  }
}

// ============================================
// EXPORTED API FUNCTIONS
// ============================================

const API = {
  // Auth
  register: (userData) => mockApiCall(registerUser, userData),
  login: (credentials) => mockApiCall(loginUser, credentials),

  // User
  getUserProfile: () => mockApiCall(getUserProfile),

  // Messages
  sendMessage: (messageData) => mockApiCall(sendMessage, messageData),
  getAllMessages: (params) => mockApiCall(getAllMessages, params),
  deleteMessage: (messageId) => mockApiCall(deleteMessage, messageId),

  // Utility
  clearAllData: () => {
    localStorage.removeItem("saraha_users");
    localStorage.removeItem("saraha_messages");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    initializeDB();
  },
};

// Initialize on load
initializeDB();
