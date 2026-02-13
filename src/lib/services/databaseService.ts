import { insforge } from '@/lib/insforge';

type QueryOptions = {
  select?: string;
  eq?: Record<string, any>;
  gt?: Record<string, any>;
  lt?: Record<string, any>;
  gte?: Record<string, any>;
  lte?: Record<string, any>;
  in?: Record<string, any[]>;
  limit?: number;
  offset?: number;
  order?: { column: string; ascending: boolean };
  count?: 'exact' | 'planned' | 'estimated';
};

type DbResponse<T> = {
  data?: T;
  count?: number;
  error?: { message: string };
};

export const databaseService = {
  // SELECT - Fetch records
  async select<T>(table: string, options?: QueryOptions): Promise<DbResponse<T[]>> {
    try {
      let query = insforge.from(table);

      if (options?.select) {
        query = query.select(options.select);
      } else {
        query = query.select('*');
      }

      // Apply filters
      if (options?.eq) {
        for (const [key, value] of Object.entries(options.eq)) {
          query = query.eq(key, value);
        }
      }

      if (options?.gt) {
        for (const [key, value] of Object.entries(options.gt)) {
          query = query.gt(key, value);
        }
      }

      if (options?.lt) {
        for (const [key, value] of Object.entries(options.lt)) {
          query = query.lt(key, value);
        }
      }

      if (options?.gte) {
        for (const [key, value] of Object.entries(options.gte)) {
          query = query.gte(key, value);
        }
      }

      if (options?.lte) {
        for (const [key, value] of Object.entries(options.lte)) {
          query = query.lte(key, value);
        }
      }

      if (options?.in) {
        for (const [key, values] of Object.entries(options.in)) {
          query = query.in(key, values);
        }
      }

      // Apply ordering
      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending });
      }

      // Apply limit and offset
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      if (options?.count) {
        query = query.selectCount(options.count);
      }

      const { data, error, count } = await query;

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: data as T[], count };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // INSERT - Create records
  async insert<T>(table: string, records: T[]): Promise<DbResponse<T>> {
    try {
      const { data, error } = await insforge.from(table).insert(records).select();

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: data as T };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // UPDATE - Update records
  async update<T>(table: string, id: string, updates: Partial<T>): Promise<DbResponse<T>> {
    try {
      const { data, error } = await insforge
        .from(table)
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: data?.[0] as T };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // DELETE - Delete records
  async delete(table: string, id: string): Promise<DbResponse<null>> {
    try {
      const { error } = await insforge.from(table).delete().eq('id', id);

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: null };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // UPSERT - Insert or update
  async upsert<T>(table: string, records: T[], onConflict: string): Promise<DbResponse<T[]>> {
    try {
      const { data, error } = await insforge
        .from(table)
        .upsert(records, { onConflict })
        .select();

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: data as T[] };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // RPC - Call stored procedures
  async rpc<T>(functionName: string, params?: Record<string, any>): Promise<DbResponse<T>> {
    try {
      const { data, error } = await insforge.rpc(functionName, params || {});

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: data as T };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  }
};
