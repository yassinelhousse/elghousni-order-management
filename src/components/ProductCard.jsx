import useStore from "../store/useStore";

export default function Card({ name, price, image, id }) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="card-footer">
          <span className="card-price">{price} Dh</span>
          <button
            className="card-btn"
            onClick={() => addToCart({ id, name, price, image })}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
