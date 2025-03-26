// Utility function to generate unique IDs
export const generateUniqueId = (appointmentId, type) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${appointmentId}-${type}-${timestamp}-${random}`;
}; 