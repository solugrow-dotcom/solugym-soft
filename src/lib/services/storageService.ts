import { insforge } from '@/lib/insforge';

type StorageResponse<T> = {
  data?: T;
  error?: { message: string };
};

export const storageService = {
  // Upload file to bucket
  async uploadFile(
    bucketName: string,
    filePath: string,
    file: File | Blob
  ): Promise<StorageResponse<{ path: string; fullPath: string }>> {
    try {
      const { data, error } = await insforge.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        return { error: { message: error.message } };
      }

      return { data };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Download file
  async downloadFile(bucketName: string, filePath: string): Promise<StorageResponse<Blob>> {
    try {
      const { data, error } = await insforge.storage
        .from(bucketName)
        .download(filePath);

      if (error) {
        return { error: { message: error.message } };
      }

      return { data };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Get file URL
  getFileUrl(bucketName: string, filePath: string): string {
    try {
      const { data } = insforge.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      return '';
    }
  },

  // Get signed URL (for private files)
  async getSignedUrl(
    bucketName: string,
    filePath: string,
    expiresIn: number = 3600
  ): Promise<StorageResponse<string>> {
    try {
      const { data, error } = await insforge.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresIn);

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: data.signedUrl };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // List files in bucket
  async listFiles(bucketName: string, folderPath?: string): Promise<StorageResponse<any[]>> {
    try {
      const { data, error } = await insforge.storage
        .from(bucketName)
        .list(folderPath || '', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) {
        return { error: { message: error.message } };
      }

      return { data };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Delete file
  async deleteFile(bucketName: string, filePath: string): Promise<StorageResponse<null>> {
    try {
      const { error } = await insforge.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: null };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Delete multiple files
  async deleteFiles(bucketName: string, filePaths: string[]): Promise<StorageResponse<null>> {
    try {
      const { error } = await insforge.storage
        .from(bucketName)
        .remove(filePaths);

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: null };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Move file
  async moveFile(
    bucketName: string,
    fromPath: string,
    toPath: string
  ): Promise<StorageResponse<null>> {
    try {
      const { error } = await insforge.storage
        .from(bucketName)
        .move(fromPath, toPath);

      if (error) {
        return { error: { message: error.message } };
      }

      return { data: null };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  }
};
