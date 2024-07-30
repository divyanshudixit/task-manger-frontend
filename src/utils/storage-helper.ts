export const storage = sessionStorage;

export const KEY_ACCESS_TOKEN = 'accessToken';
export const KEY_USER = 'userKey';

export function verifyStorageAvailable(): boolean {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    storage.setItem(key, key);
    storage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export function getItemFromStorage(key: string, defaultValue: string = ''): string {
  const storageAvailable = verifyStorageAvailable();
  let value: string = defaultValue;

  if (storageAvailable) {
    value = storage.getItem(key) || defaultValue;
  }

  return value;
}

export function setItemInStorage(key: string, value: string): void {
  const storageAvailable = verifyStorageAvailable();
  if (storageAvailable) {
    storage.setItem(key, value);
  } else {
    throw new Error('Unable to access storage to set data');
  }
}

export function removeItemFromStorage(key: string): string | null {
  const storageAvailable = verifyStorageAvailable();
  let value: string | null = null;

  if (storageAvailable) {
    value = storage.getItem(key);
    storage.removeItem(key);
  }

  return value;
}

export const getUserData = (): Record<string, unknown> => {
  const KEY_USER_DATA = 'user_data_key'; 
  return JSON.parse(getItemFromStorage(KEY_USER_DATA, '{}'));
};
