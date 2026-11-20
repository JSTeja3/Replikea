import type {Product} from "../../types/Product";

interface RecordListProps{
    products: Product[],
    selectedProductId: number | null;
    onSelectProduct: (product: Product) => void;
}

function RecordList({products, selectedProductId, onSelectProduct}: RecordListProps){
    return (
        <div className="record-list">
            {products.map(product => {
                const isSelected = selectedProductId === product.id;

                return(
                <button key={product.id} type="button" className={`record-item ${isSelected? "selected":""}`} onClick={() => onSelectProduct(product)} aria-pressed={isSelected}>
                    <div className="record-item-header">
                        <h3 title={product.name}>{product.name}</h3>
                        <span className={`product-status ${product.status.toLowerCase()}`}>
                            {product.status}
                        </span>
                    </div>
                    <p>{product.productNumber}</p>
                    <div className="record-item-footer">
                        <span>{product.category}</span>
                        <span>Updated {product.updatedAt}</span>
                    </div>
                </button>  
                ); 
            })}
        </div>
    );
}

export default RecordList