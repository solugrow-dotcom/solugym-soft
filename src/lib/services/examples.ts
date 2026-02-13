/**
 * InsForge Services Usage Examples
 * 
 * This file demonstrates how to use all available InsForge services
 * in your application.
 */

// ============================================
// 1. AUTHENTICATION SERVICE EXAMPLES
// ============================================

import { authService, databaseService, aiService, storageService, realtimeService } from '@/lib/services';

// Sign up a new user
async function exampleSignUp() {
  const { data, error } = await authService.signUp(
    'user@example.com',
    'password123',
    { role: 'gym_owner', gym_name: 'My Gym' }
  );
  
  if (error) {
    console.error('Sign up failed:', error.message);
  } else {
    console.log('User created:', data);
  }
}

// Sign in
async function exampleSignIn() {
  const { data, error } = await authService.signIn(
    'user@example.com',
    'password123'
  );
  
  if (error) {
    console.error('Sign in failed:', error.message);
  } else {
    console.log('Signed in successfully');
  }
}

// Get current user
async function exampleGetUser() {
  const { data, error } = await authService.getUser();
  
  if (error) {
    console.error('Failed to get user:', error.message);
  } else {
    console.log('Current user:', data);
  }
}

// ============================================
// 2. DATABASE SERVICE EXAMPLES
// ============================================

// Select records
async function exampleSelect() {
  const { data, error, count } = await databaseService.select('profiles', {
    select: 'id, full_name, email',
    eq: { role: 'gym_owner' },
    limit: 10,
    order: { column: 'created_at', ascending: false }
  });
  
  if (error) {
    console.error('Select failed:', error.message);
  } else {
    console.log('Records:', data, 'Total count:', count);
  }
}

// Insert records
async function exampleInsert() {
  const { data, error } = await databaseService.insert('profiles', [
    {
      id: 'user-id',
      full_name: 'John Doe',
      email: 'john@example.com',
      role: 'member'
    }
  ]);
  
  if (error) {
    console.error('Insert failed:', error.message);
  } else {
    console.log('Record inserted:', data);
  }
}

// Update records
async function exampleUpdate() {
  const { data, error } = await databaseService.update(
    'profiles',
    'user-id',
    { full_name: 'Jane Doe', avatar_url: 'https://example.com/avatar.jpg' }
  );
  
  if (error) {
    console.error('Update failed:', error.message);
  } else {
    console.log('Record updated:', data);
  }
}

// Delete records
async function exampleDelete() {
  const { data, error } = await databaseService.delete('profiles', 'user-id');
  
  if (error) {
    console.error('Delete failed:', error.message);
  } else {
    console.log('Record deleted');
  }
}

// ============================================
// 3. AI SERVICE EXAMPLES
// ============================================

// Chat completion
async function exampleChatCompletion() {
  const { data, error } = await aiService.chatCompletion([
    { role: 'system', content: 'You are a fitness coach.' },
    { role: 'user', content: 'Give me a 3-day workout plan' }
  ]);
  
  if (error) {
    console.error('AI request failed:', error.message);
  } else {
    console.log('AI response:', data);
  }
}

// Generate workout plan
async function exampleGenerateWorkoutPlan() {
  const { data, error } = await aiService.generateWorkoutPlan(
    'muscle gain',
    'intermediate',
    4,
    60
  );
  
  if (error) {
    console.error('Workout generation failed:', error.message);
  } else {
    console.log('Workout plan:', data);
  }
}

// Generate advice
async function exampleGenerateAdvice() {
  const { data, error } = await aiService.generateAdvice(
    'member retention',
    'I own a gym and want to reduce member churn'
  );
  
  if (error) {
    console.error('Advice generation failed:', error.message);
  } else {
    console.log('Advice:', data);
  }
}

// ============================================
// 4. STORAGE SERVICE EXAMPLES
// ============================================

// Upload file
async function exampleUploadFile() {
  const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
  
  const { data, error } = await storageService.uploadFile(
    'documents',
    'user-123/document.pdf',
    file
  );
  
  if (error) {
    console.error('Upload failed:', error.message);
  } else {
    console.log('File uploaded:', data);
  }
}

// Get file URL
function exampleGetFileUrl() {
  const url = storageService.getFileUrl(
    'documents',
    'user-123/document.pdf'
  );
  
  console.log('File URL:', url);
}

// Delete file
async function exampleDeleteFile() {
  const { data, error } = await storageService.deleteFile(
    'documents',
    'user-123/document.pdf'
  );
  
  if (error) {
    console.error('Delete failed:', error.message);
  } else {
    console.log('File deleted');
  }
}

// ============================================
// 5. REALTIME SERVICE EXAMPLES
// ============================================

// Subscribe to table changes
function exampleSubscribeToTable() {
  const subscription = realtimeService.subscribeToTable(
    'profiles',
    'public',
    (payload) => {
      console.log('Data changed:', payload);
    },
    (error) => {
      console.error('Subscription error:', error);
    }
  );
  
  return subscription;
}

// Subscribe to specific record
function exampleSubscribeToRecord() {
  const subscription = realtimeService.subscribeToRecord(
    'gyms',
    'gym-123',
    (payload) => {
      console.log('Gym data changed:', payload);
    }
  );
  
  return subscription;
}

// Subscribe to user data
function exampleSubscribeToUserData() {
  const subscription = realtimeService.subscribeToUserData(
    'workouts',
    'user-123',
    (payload) => {
      console.log('User workouts changed:', payload);
    }
  );
  
  return subscription;
}

// Publish custom event
async function examplePublishEvent() {
  const { success, error } = await realtimeService.publishEvent(
    'notifications',
    'member_joined',
    { userId: 'user-123', gymId: 'gym-456' }
  );
  
  if (error) {
    console.error('Publish failed:', error);
  } else {
    console.log('Event published');
  }
}

export {
  exampleSignUp,
  exampleSignIn,
  exampleGetUser,
  exampleSelect,
  exampleInsert,
  exampleUpdate,
  exampleDelete,
  exampleChatCompletion,
  exampleGenerateWorkoutPlan,
  exampleGenerateAdvice,
  exampleUploadFile,
  exampleGetFileUrl,
  exampleDeleteFile,
  exampleSubscribeToTable,
  exampleSubscribeToRecord,
  exampleSubscribeToUserData,
  examplePublishEvent
};
