// hash-map.js
export class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.indexArray = new Array(initialCapacity);
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  hash = (key) => {
    let hashcode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashcode = (hashcode * primeNumber + key.charCodeAt(i)) % this.capacity;
    }
    return hashcode;
  };

  set = (key, value) => {
    const index = this.hash(key);

    if (!this.indexArray[index]) {
      this.indexArray[index] = [];
    }

    let found = false;
    for (let entry of this.indexArray[index]) {
      if (entry.key === key) {
        entry.value = value;
        found = true;
        break;
      }
    }

    if (!found) {
      this.indexArray[index].push({ key, value });
      this.size++;
    }

    if (this.size >= this.capacity * this.loadFactor) {
      this.resize();
    }
  };

  get = (key) => {
    const index = this.hash(key);
    const bucket = this.indexArray[index];

    if (bucket) {
      for (let entry of bucket) {
        if (entry.key === key) {
          return entry.value;
        }
      }
    }
    return null;
  };

  has = (key) => this.get(key) !== null;

  remove = (key) => {
    const index = this.hash(key);
    const bucket = this.indexArray[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket.splice(i, 1);
          this.size--;
          return true;
        }
      }
    }
    return false;
  };

  length = () => this.size;

  clear = () => {
    this.indexArray = new Array(this.capacity);
    this.size = 0;
  };

  keys = () => {
    const keysArray = [];
    for (let bucket of this.indexArray) {
      if (bucket) {
        for (let entry of bucket) {
          keysArray.push(entry.key);
        }
      }
    }
    return keysArray;
  };

  values = () => {
    const valuesArray = [];
    for (let bucket of this.indexArray) {
      if (bucket) {
        for (let entry of bucket) {
          valuesArray.push(entry.value);
        }
      }
    }
    return valuesArray;
  };

  entries = () => {
    const entriesArray = [];
    for (let bucket of this.indexArray) {
      if (bucket) {
        for (let entry of bucket) {
          entriesArray.push([entry.key, entry.value]);
        }
      }
    }
    return entriesArray;
  };

  resize = () => {
    const newCapacity = this.capacity * 2;
    const oldArray = this.indexArray;
    this.indexArray = new Array(newCapacity);
    this.capacity = newCapacity;
    this.size = 0; // Reset size and re-insert all elements

    for (let bucket of oldArray) {
      if (bucket) {
        for (let entry of bucket) {
          this.set(entry.key, entry.value);
        }
      }
    }
  };
}
