import useAppState from "@todoapp/shared/src/hooks/useAppState";
import { useEffect } from "react";

const List = () => {
  const { loadCats, cats } = useAppState();

  useEffect(() => {
    loadCats();
  }, []);

  return (
    <div>
      {!!cats.length &&
        cats.map((cat) => (
          <div key={cat.id}>
            <img
              src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
              width={200}
              height={200}
              loading="lazy"
              alt={cat.name}
            />
            <strong>{cat.name}</strong>
          </div>
        ))}
    </div>
  );
};

export default List;
