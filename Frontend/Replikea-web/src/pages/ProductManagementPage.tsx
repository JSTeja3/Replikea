import { useState } from "react";
import ProductToolbar from "../components/product-workspace/ProductToolbar";
import RecordList from "../components/product-workspace/RecordList";
import type { Product } from "../types/Product";

const sampleProducts: Product[] = [
  {
    id: 1,
    productNumber: "BED-001",
    name: "King Size Bed",
    category: "Beds",
    status: "Active",
    updatedAt: "Today",
  },
  {
    id: 2,
    productNumber: "BED-002",
    name: "Queen Size Bed",
    category: "Beds",
    status: "Inactive",
    updatedAt: "Yesterday",
  },
  {
    id: 3,
    productNumber: "BED-003",
    name: "Single Wooden Bed",
    category: "Beds",
    status: "Draft",
    updatedAt: "18 Nov 2026",
  },
  {
    id: 4,
    productNumber: "BED-003",
    name: "Single Wooden Bed",
    category: "Beds",
    status: "Draft",
    updatedAt: "18 Nov 2026",
  },
  {
    id: 5,
    productNumber: "BED-003",
    name: "Single Wooden Bed",
    category: "Beds",
    status: "Draft",
    updatedAt: "18 Nov 2026",
  },
  {
    id: 6,
    productNumber: "BED-003",
    name: "Single Wooden Bed",
    category: "Beds",
    status: "Draft",
    updatedAt: "18 Nov 2026",
  },
  {
    id: 7,
    productNumber: "BED-003",
    name: "Single Wooden Bed",
    category: "Beds",
    status: "Draft",
    updatedAt: "18 Nov 2026",
  },
];

function ProductManagementPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    sampleProducts[0],
  );

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  function handleToggleProductSelection(productId: number) {
    setSelectedProductIds(previous =>
        previous.includes(productId)
            ? previous.filter(id => id !== productId)
            : [...previous, productId]
    );
  }

  return (
    <div className="product-management-page">
      <div className="page-heading">
        <h1>Product Management</h1>
        <p>Manage and maintain your product information.</p>
      </div>
      <ProductToolbar />
      <div className="product-workspace">
        <section className="product-list-panel">
          <div className="panel-heading">
            <h2>Products</h2>
            <span>{sampleProducts.length} products</span>
          </div>
          <RecordList
            products={sampleProducts}
            selectedProductId={selectedProduct?.id ?? null}
            selectedProductIds={selectedProductIds}
            onSelectProduct={setSelectedProduct}
            onToggleProductSelection={handleToggleProductSelection}
          />
        </section>

        <section className="product-editor-panel">
          {/* Create or edit panel will go here */}
        </section>
      </div>
    </div>
  );
}

export default ProductManagementPage;
