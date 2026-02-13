import { insforge } from '@/lib/insforge';
import type { User, AuthChangeEvent } from '@insforge/sdk';

type AuthResponse<T> = {
  data?: T;
  error?: { message: string };
};

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, metadata?: Record<string, any>): Promise<AuthResponse<User>> {
    try {
      const { data, error } = await insforge.auth.signUp({
        email,
        password,
        options: {
          data: metadata || { role: 'member' }
        }
      });
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { data };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthResponse<{ user: User }>> {
    try {
      const { data, error } = await insforge.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { data };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Get current session
  async getSession(): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await insforge.auth.getSession();
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { data };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Get current user
  async getUser(): Promise<AuthResponse<User>> {
    try {
      const { data, error } = await insforge.auth.getUser();
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { data };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Sign out
  async signOut(): Promise<AuthResponse<null>> {
    try {
      const { error } = await insforge.auth.signOut();
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { data: null };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: AuthChangeEvent, session: any) => void) {
    return insforge.auth.onAuthStateChange(callback);
  },

  // Reset password
  async resetPassword(email: string): Promise<AuthResponse<null>> {
    try {
      const { error } = await insforge.auth.resetPasswordForEmail(email);
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { data: null };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  }
};
