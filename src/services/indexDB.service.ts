import type { FavoritePokemon } from '@/types/pokemon.types';

const DB_NAME = 'pokemonDB';
const DB_VERSION = 1;
const COLLECTION_NAME = 'favorites';
const DB_KEY = 'id';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Runs if the database needs to be upgraded (e.g., on first creation)
    request.onupgradeneeded = ({ target }) => {
      const db = (target as IDBOpenDBRequest).result;
      db.createObjectStore(COLLECTION_NAME, { keyPath: DB_KEY });
    };

    request.onsuccess = ({ target }) => {
      resolve((target as IDBOpenDBRequest).result);
    };

    request.onerror = ({ target }) => {
      reject((target as IDBOpenDBRequest).error);
    };
  });
}

export function getPokemons() {
  return new Promise<FavoritePokemon[]>(async (resolve, reject) => {
    const db = await openDB();

    const transaction = db.transaction(COLLECTION_NAME, 'readonly');
    const store = transaction.objectStore(COLLECTION_NAME);
    const request: IDBRequest<FavoritePokemon[]> = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = ({ target }) => {
      const error = (target as IDBRequest).error;
      console.error('Error fetching Pokemon: ', error);
      reject(error);
    };
  });
}

export function getPokemonById(id: string) {
  return new Promise<FavoritePokemon | undefined>(async (resolve, reject) => {
    const db = await openDB();

    const transaction = db.transaction(COLLECTION_NAME, 'readonly');
    const store = transaction.objectStore(COLLECTION_NAME);
    const request: IDBRequest<FavoritePokemon | undefined> = store.get(id);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = ({ target }) => {
      const error = (target as IDBRequest).error;
      console.error('Error fetching Pokemon: ', error);
      reject(error);
    };
  });
}

export function addFavoritePokemon(pokemon: FavoritePokemon) {
  return new Promise<void>(async (resolve, reject) => {
    const db = await openDB();

    const transaction = db.transaction(COLLECTION_NAME, 'readwrite');
    const store = transaction.objectStore(COLLECTION_NAME);
    store.add(pokemon); // pokemon should be an object with { id, name }

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = ({ target }) => {
      console.error('Error adding Pokemon: ', (target as IDBRequest).error);
      reject();
    };
  });
}

export function removeFavoritePokemon(id: string) {
  return new Promise<void>(async (resolve, reject) => {
    const db = await openDB();

    const transaction = db.transaction(COLLECTION_NAME, 'readwrite');
    const store = transaction.objectStore(COLLECTION_NAME);
    store.delete(id);

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = ({ target }) => {
      console.error('Error removing Pokemon: ', (target as IDBRequest).error);
      reject();
    };
  });
}
