import ProductToolbar from "../components/product-workspace/ProductToolbar";

function ProductManagementPage(){
    return (
        <div className="product-management-page">
            <div className="page-heading">
                <h1>Product Management</h1>
                <p>Manage and maintain your product information.</p>
            </div>
            <div className="product-toolbar">
                <ProductToolbar />
            </div>
            <div className="product-workspace">
                <section className="product-list-panel">
                    {/* Product list component */}
                </section>

                <section className="product-editor-panel">
                    {/* Create or edit panel will go here */}
                </section>
            </div>
        </div>
    );
}

export default ProductManagementPage;