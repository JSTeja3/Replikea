import { Search, FunnelX } from "lucide-react";

function PageToolbar() {
    return (
        <div className="product-toolbar">

            <div className="product-search">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search products by name or product number..."
                />
            </div>

            <div className="product-filters">
                <select defaultValue="">
                    <option value="">All Categories</option>
                    <option value="beds">Beds</option>
                </select>

                <select defaultValue="">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button type="button" className="clear-filters">
                    <FunnelX size={18} />
                    Clear filters
                </button>
            </div>

        </div>
    );
}

export default PageToolbar;