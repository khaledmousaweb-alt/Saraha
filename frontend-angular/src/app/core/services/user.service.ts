import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get current user profile
   */
  getUserProfile(): Observable<ApiResponse<UserResponse>> {
    return this.http.get<ApiResponse<UserResponse>>(`${this.apiUrl}/user/`);
  }

  /**
   * Update user information
   */
  updateUser(userId: string, data: any): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/updateuser/${userId}`, data);
  }

  /**
   * Change user password
   */
  changePassword(data: { email: string; oldPassword: string; newPassword: string }): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/user/changepassword`, data);
  }
}
