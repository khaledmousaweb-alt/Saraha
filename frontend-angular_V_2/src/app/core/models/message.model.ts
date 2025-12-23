// Message Model
export interface Message {
  _id: string;
  content: string;
  sender: any; // Populated User
  reciever: any; // Populated User
  createdAt: Date;
  updatedAt: Date;
}

// Send Message Data
export interface SendMessageData {
  content: string;
  sender: string;
  recieverEmail: string;
}
