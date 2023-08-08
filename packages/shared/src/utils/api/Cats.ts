import { CatType } from "../../providers/AppProvider";

let cache: CatType[] = [];

class Cats {
  async loadAll() {
    if (!cache.length) {
      const response = await fetch("https://api.thecatapi.com/v1/breeds");
      const cats = await response.json();

      cache = cats;
    }

    return cache;
  }
}

export default new Cats();
