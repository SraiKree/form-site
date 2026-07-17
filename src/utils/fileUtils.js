/**
 * Utility functions for converting File blobs to clean Base64 data objects
 * formatted specifically for Google Apps Script Utilities.base64Decode()
 */

export async function fileToBase64(file) {
  if (!file || !(file instanceof File)) return null;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      // Extract clean base64 payload by stripping the prefix: "data:<mimeType>;base64,"
      const base64String = dataUrl.split(',')[1] || '';
      resolve({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        base64: base64String,
      });
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
