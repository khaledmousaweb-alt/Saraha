// ============================================
// API SERVICE MODULE - STANDALONE VERSION
// Uses localStorage instead of backend server
// ============================================

// Import the localStorage API
// Note: Make sure localStorage-api.js is loaded before this file

const api = {
  // ============================================
  // AUTHENTICATION ENDPOINTS
  // ============================================

  // Register new user
  async register(userData) {
    try {
      const response = await API.register(userData);
      return response;
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await API.login(credentials);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }
      return response;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  },

  // ============================================
  // USER ENDPOINTS
  // ============================================

  // Get user profile
  async getUserProfile() {
    try {
      const response = await API.getUserProfile();
      return response.result;
    } catch (error) {
      throw new Error(error.message || "Failed to get user profile");
    }
  },

  // ============================================
  // MESSAGE ENDPOINTS
  // ============================================

  // Send message
  async sendMessage(messageData) {
    try {
      const response = await API.sendMessage(messageData);
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to send message");
    }
  },

  // Get all messages (inbox or sent)
  async getAllMessages(flag, sender, reciever) {
    try {
      const params = { flag, sender, reciever };
      const response = await API.getAllMessages(params);
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to get messages");
    }
  },

  // Delete message
  async deleteMessage(messageData) {
    try {
      const response = await API.deleteMessage(messageData.messageId);
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to delete message");
    }
  },
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}
