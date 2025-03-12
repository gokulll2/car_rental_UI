import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isBrowser()) {
      localStorage.removeItem(USER);
      localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(TOKEN) : null;
  }

  static getUser(): any {
    if (!this.isBrowser()) return null;
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : "";
  }

  static isAdminLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === "ADMIN";
  }

  static isCustomerLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === "CUSTOMER";
  }

  static logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
    }
  }
}