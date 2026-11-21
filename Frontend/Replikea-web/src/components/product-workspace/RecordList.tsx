import type {Product} from "../../types/Product";

interface RecordListProps{
    products: Product[],
    selectedProductId: number | null;
    selectedProductIds: number[];
    onSelectProduct: (product: Product) => void;
    onToggleProductSelection : (productId:number) => void;
}

function RecordList({products, selectedProductId, selectedProductIds, onSelectProduct, onToggleProductSelection}: RecordListProps){
    return (
        <div className="record-list">
            {products.map(product => {
                const isSelected = selectedProductId === product.id;
                const isChecked = selectedProductIds.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className={`record-item ${isSelected ? "selected" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="record-checkbox"
                      checked={isChecked}
                      onChange={() => onToggleProductSelection(product.id)}
                      aria-label={`Select ${product.name} for bulk editing`}
                    />
                    <button 
                        type="button"
                        className="record-content"
                        onClick={() => onSelectProduct(product)}
                        aria-current={isSelected ? "true": undefined}
                    >
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
                  </div>
                ); 
            })}
        </div>
    );
}

export default RecordList