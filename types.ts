export interface Users {
  id: string;
  name: string;
  hashed_password: string;
}

export interface Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}
