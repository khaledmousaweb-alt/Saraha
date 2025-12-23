// Message Model
export interface Message {
  _id: string;
  content: string;
  sender: string; // User ID
  reciever: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

// Send Message Data
export interface SendMessageData {
  content: string;
  sender: string;
  reciever: string;
}
