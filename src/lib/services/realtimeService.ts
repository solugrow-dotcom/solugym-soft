import { insforge } from '@/lib/insforge';

type RealtimeFilter = {
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  table?: string;
  filter?: string;
};

type RealtimePayload = {
  new?: Record<string, any>;
  old?: Record<string, any>;
  eventType?: string;
};

export const realtimeService = {
  // Subscribe to table changes
  subscribeToTable(
    tableName: string,
    schema: string = 'public',
    onData?: (payload: RealtimePayload) => void,
    onError?: (error: any) => void,
    filter?: string
  ) {
    try {
      const subscription = insforge
        .channel(`public:${tableName}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema,
            table: tableName,
            filter
          },
          (payload: any) => {
            if (onData) {
              onData(payload.new || payload.old || {});
            }
          }
        )
        .subscribe((status: string) => {
          if (status === 'SUBSCRIBED') {
            console.log(`✅ Subscribed to ${tableName} changes`);
          } else if (status === 'CLOSED') {
            console.log(`❌ Unsubscribed from ${tableName} changes`);
          }
        });

      return subscription;
    } catch (error) {
      console.error('Error subscribing to table:', error);
      if (onError) onError(error);
      return null;
    }
  },

  // Subscribe to specific record changes
  subscribeToRecord(
    tableName: string,
    recordId: string,
    onData?: (payload: RealtimePayload) => void,
    onError?: (error: any) => void
  ) {
    const filter = `id=eq.${recordId}`;
    return this.subscribeToTable(tableName, 'public', onData, onError, filter);
  },

  // Subscribe to specific user's data
  subscribeToUserData(
    tableName: string,
    userId: string,
    onData?: (payload: RealtimePayload) => void,
    onError?: (error: any) => void
  ) {
    const filter = `user_id=eq.${userId}`;
    return this.subscribeToTable(tableName, 'public', onData, onError, filter);
  },

  // Publish custom event
  async publishEvent(channel: string, event: string, payload: any) {
    try {
      const subscription = insforge.channel(channel).subscribe();

      // Send custom message
      await insforge.channel(channel).send({
        type: 'broadcast',
        event,
        payload
      });

      return { success: true };
    } catch (error) {
      console.error('Error publishing event:', error);
      return { error: String(error) };
    }
  },

  // Unsubscribe from channel
  async unsubscribe(channelName: string) {
    try {
      await insforge.removeChannel(insforge.channel(channelName));
      return { success: true };
    } catch (error) {
      console.error('Error unsubscribing:', error);
      return { error: String(error) };
    }
  },

  // Get all active subscriptions
  getActiveSubscriptions() {
    try {
      return insforge.getChannels();
    } catch (error) {
      console.error('Error getting subscriptions:', error);
      return [];
    }
  }
};
