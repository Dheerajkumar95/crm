import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
const categoryColors = [
  "bg-green-400",
  "bg-purple-600",
  "bg-green-600",
  "bg-teal-300",
  "bg-pink-600",
  "bg-blue-500",
  "bg-orange-500",
];

const ProductList = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/categories");
      const fetched = res.data.map((cat, index) => ({
        name: cat.name,
        color: categoryColors[index % categoryColors.length],
      }));
      setCategories(fetched);
      if (fetched.length > 0) setActiveCategory(fetched[0].name);
      setActiveCategory("All");
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchProducts = async (category) => {
  try {
    let url = "http://localhost:7000/api/products";
    if (category && category !== "All") {
      url = `http://localhost:7000/api/products/category?category=${category}`;
    }
    const res = await axios.get(url);
    setProducts(res.data);
  } catch (error) {
    console.error("Error fetching products", error);
  }
};


  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) fetchProducts(activeCategory);
  }, [activeCategory]);
  

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:7000/api/products/${productId}/status`,
        {
          status: currentStatus === "Active" ? false : true,
        }
      );
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, status: res.data.status } : p
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

const handleSave = async () => {
  try {
    const payload = {
      opportunityId: id,
      productId: selectedProduct._id,
      productName: selectedProduct.productName,
      category: selectedProduct.category,
      price: selectedProduct.price,
      costPrice:selectedProduct.costPrice,
      sellingPrice:selectedProduct.sellingPrice,
      currency: selectedProduct.currency,
    };
    if (selectedProduct.productQuality === "Standard" || selectedProduct.productQuality === "Bundle/Kit") {
      payload.quantity = quantity;
      payload.startDate = startDate;
      payload.deliveryDate = deliveryDate;
    }
    if (["Service", "Subscription", "Configurable"].includes(selectedProduct.productQuality)) {
      payload.startDate = startDate;
      payload.deliveryDate = deliveryDate;
    }

    const res = await axios.post("http://localhost:7000/api/opportunityProducts", payload);
    setIsModalOpen(false);
    toast.success(res.data.message || "Product added successfully!");
  } catch (error) {
    const errMsg = error.response?.data?.error || "Failed to save product";
    toast.error(errMsg);
  }
};


  return (
    <div className="px-1">
  <div className="relative flex justify-between items-center mb-2 flex-wrap">
  <h1 className="absolute left-1/2 mb-15  transform -translate-x-1/2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 drop-shadow-lg tracking-wide">
    Products
  </h1>
  <div className="flex gap-4 flex-wrap mt-10 md:mt-10">
    <button
      onClick={() => setActiveCategory("All")}
      className={`px-2 py-1 rounded-md font-medium shadow-md transition cursor-pointer
        ${activeCategory === "All"
          ? "bg-blue-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
      All
    </button>
    {categories.map((cat) => (
      <button
        key={cat.name}
        onClick={() => setActiveCategory(cat.name)}
        className={`px-2 py-1 rounded-md font-medium shadow-md transition cursor-pointer
          ${activeCategory === cat.name
            ? `${cat.color} text-white`
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
      >
        {cat.name}
      </button>
    ))}
  </div>
  <div className="mt-4 md:mt-10">
    <button
      onClick={() => navigate("/addproduct")}
      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
    >
      <Plus className="w-4 h-4 mr-2" />
      Add New Product
    </button>
  </div>
</div>

      <div className="rounded shadow overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-3 py-1 text-left">Product ID</th>
              <th className="px-3 py-1 text-left">Product Name</th>
              <th className="px-3 py-1 text-left">Product Quality</th>
              <th className="px-3 py-1 text-left">Price</th>
              <th className="px-3 py-1 text-left">Status</th>
              <th className="px-3 py-1 text-left">Add</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b-gray-600 border-t hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-1 font-semibold">{product.productId}</td>
                  <td className="px-3 py-1">{product.productName}</td>
                  <td className="px-3 py-1">{product.productQuality}</td>
                  <td className="px-3 py-1">{product.price}</td>
                  <td className="px-3 py-1">
                    <button
                      onClick={() =>
                        handleToggleStatus(product._id, product.status)
                      }
                      className={`relative inline-flex h-5 w-14 items-center rounded-full transition cursor-pointer ${
                        product.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          product.status === "Active"
                            ? "translate-x-9"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                <td className="px-3 py-1">
            <button
              onClick={() => {
                if (!id) {
                  toast.error("Please select an account first.");
                  return;
                }
                setSelectedProduct(product);
                setQuantity(1);
                setIsModalOpen(true);
              }}
              disabled={!id} 
              className={`flex items-center justify-center w-8 h-8 rounded-full border text-gray-700 transition cursor-pointer
                ${id ? "border-gray-800 bg-white hover:bg-gray-100" : "border-gray-300 bg-gray-100 cursor-not-allowed"}`}
            >
              <Plus size={16} />
            </button>
          </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Product not available in {activeCategory} category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
{isModalOpen && selectedProduct && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="absolute inset-0 bg-black opacity-50"
      onClick={() => setIsModalOpen(false)}
    ></div>
    <div className="bg-white rounded-lg shadow-xl z-10 p-6 w-[600px] max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {selectedProduct.productName}
      </h2>
      <div className="flex gap-4 mb-4">
        <img
          src={selectedProduct.productImage}
          alt={selectedProduct.productName}
          className="w-32 h-32 object-cover rounded border"
        />
        <div className="flex-1">
          <p className="text-gray-700 text-sm mb-1">
            {selectedProduct.productDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
              Category: {selectedProduct.category}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
              Brand: {selectedProduct.brand || "-"}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                selectedProduct.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {selectedProduct.status}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p>
          <span className="font-semibold">Product ID:</span> {selectedProduct.productId}
        </p>
        <p>
          <span className="font-semibold">Quality:</span> {selectedProduct.productQuality}
        </p>
        {selectedProduct.productQuality === "Standard" && (
          <>
            <p><span className="font-semibold">Unit:</span> {selectedProduct.unitOfMeasure}</p>
            <p><span className="font-semibold">Stock Qty:</span> {selectedProduct.stockQuantity}</p>
            <p><span className="font-semibold">Warehouse:</span> {selectedProduct.warehouse}</p>
            <p><span className="font-semibold">Supplier:</span> {selectedProduct.supplier}</p>
          </>
        )}
        {selectedProduct.productQuality === "Service" && (
          <>
            <p><span className="font-semibold">Service Duration:</span> {selectedProduct.serviceDuration}</p>
            <p><span className="font-semibold">Service Provider:</span> {selectedProduct.serviceProvider}</p>
          </>
        )}
        {selectedProduct.productQuality === "Subscription" && (
          <>
            <p><span className="font-semibold">Period:</span> {selectedProduct.subscriptionPeriod}</p>
            <p><span className="font-semibold">Renewal Price:</span> {selectedProduct.renewalPrice} {selectedProduct.currency}</p>
          </>
        )}
        {selectedProduct.productQuality === "Bundle/Kit" && (
          <p><span className="font-semibold">Bundle Items:</span> {selectedProduct.bundleItems}</p>
        )}
        {selectedProduct.productQuality === "Configurable" && (
          <p><span className="font-semibold">Config Options:</span> {selectedProduct.configOptions}</p>
        )}
        <p><span className="font-semibold">Price:</span> {selectedProduct.price} {selectedProduct.currency}</p>
        <p><span className="font-semibold">Cost Price:</span> {selectedProduct.costPrice || "-"} {selectedProduct.currency}</p>
        <p><span className="font-semibold">Selling Price:</span> {selectedProduct.sellingPrice || "-"} {selectedProduct.currency}</p>
        <p><span className="font-semibold">HSN Code:</span> {selectedProduct.hsnCode || "-"}</p>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {(selectedProduct.productQuality !== "Service" && selectedProduct.productQuality !== "Subscription") && (
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded outline-none"
            />
          </div>
        )}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded outline-none"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium mb-1">Delivery Date</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full p-2 border rounded outline-none"
          />
        </div>
      </div>

      {/* Modal Actions */}
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-1 border rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}



    </div>
    
  );
};

export default ProductList;
