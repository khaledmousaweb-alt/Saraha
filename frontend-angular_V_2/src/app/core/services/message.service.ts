import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message, SendMessageData } from '../models/message.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Send anonymous message
   */
  sendMessage(content: string, receiverEmail: string, senderId: string): Observable<ApiResponse<Message>> {
    const data: SendMessageData = {
      content,
      sender: senderId,
      recieverEmail: receiverEmail
    };
    return this.http.post<ApiResponse<Message>>(`${this.apiUrl}/message/sendMessage`, data);
  }

  /**
   * Get inbox messages (received messages)
   */
  getInboxMessages(receiverId: string): Observable<ApiResponse<Message[]>> {
    const params = new HttpParams()
      .set('flag', 'inbox')
      .set('reciever', receiverId);
    
    return this.http.get<ApiResponse<Message[]>>(`${this.apiUrl}/message/getAllMessages`, { params });
  }

  /**
   * Get sent messages
   */
  getSentMessages(senderId: string): Observable<ApiResponse<Message[]>> {
    const params = new HttpParams()
      .set('flag', 'sent')
      .set('sender', senderId);
    
    return this.http.get<ApiResponse<Message[]>>(`${this.apiUrl}/message/getAllMessages`, { params });
  }

  /**
   * Get single message by ID
   */
  getMessage(messageId: string): Observable<ApiResponse<Message>> {
    return this.http.get<ApiResponse<Message>>(`${this.apiUrl}/message/${messageId}`);
  }

  /**
   * Delete a message
   */
  deleteMessage(messageId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/message/delete/${messageId}`);
  }
}
