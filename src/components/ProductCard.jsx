

export default function Card({name,price,image,onCommand}){
    return(
        <div className="card">
            <img src={image} alt={name} className="card-image" />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <div className="card-footer">
                    <span className="card-price">{price} dh </span>
                    <button className="card-btn" onClick={onCommand}>Commonder</button>
                </div>
            </div>

        </div>
    );

}