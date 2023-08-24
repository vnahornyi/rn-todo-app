import { z } from "zod";

import { CatType, CatSchema } from "../../types/cats";
import errorAlert from "../errorAlert";

let cache: CatType[] = [];

class Cats {
  async loadAll() {
    try {
      if (!cache.length) {
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const unparsedCats = await response.json();
        const cats = CatSchema.array().parse(unparsedCats);

        cache = cats;
      }

      return cache;
    } catch (error) {
      if (error instanceof z.ZodError) {
        errorAlert(error.message);
      }

      return [];
    }
  }
}

export default new Cats();
