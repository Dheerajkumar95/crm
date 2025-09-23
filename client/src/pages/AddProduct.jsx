import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- Standard Product Form ---------------- */
const StandardForm = ({ formData, handleChange }) => (
  <>
    <select
      name="unitOfMeasure"
      value={formData.unitOfMeasure}
      onChange={handleChange}
      className="border p-2 rounded"
    >
      <option value="Piece">Piece</option>
      <option value="Kg">Kg</option>
      <option value="Litre">Litre</option>
      <option value="Pack">Pack</option>
      <option value="Other">Other</option>
    </select>

    <input
      name="stockQuantity"
      type="number"
      placeholder="Stock Quantity"
      value={formData.stockQuantity}
      onChange={handleChange}
      className="border p-2 rounded"
    />
    <input
      name="warehouse"
      placeholder="Warehouse Location"
      value={formData.warehouse}
      onChange={handleChange}
      className="border p-2 rounded"
    />
    <input
      name="supplier"
      placeholder="Supplier / Vendor"
      value={formData.supplier}
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </>
);

/* ---------------- Service Product Form ---------------- */
const ServiceForm = ({ formData, handleChange }) => (
  <>
    <input
      name="serviceDuration"
      placeholder="Service Duration (e.g. 3 Months)"
      value={formData.serviceDuration || ""}
      onChange={handleChange}
      className="border p-2 rounded"
    />
    <input
      name="serviceProvider"
      placeholder="Service Provider"
      value={formData.serviceProvider || ""}
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </>
);

/* ---------------- Subscription Product Form ---------------- */
const SubscriptionForm = ({ formData, handleChange }) => (
  <>
    <input
      name="subscriptionPeriod"
      placeholder="Subscription Period (e.g. Monthly/Yearly)"
      value={formData.subscriptionPeriod || ""}
      onChange={handleChange}
      className="border p-2 rounded"
    />
    <input
      name="renewalPrice"
      type="number"
      placeholder="Renewal Price"
      value={formData.renewalPrice || ""}
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </>
);

/* ---------------- Bundle/Kit Product Form ---------------- */
const BundleForm = ({ formData, handleChange }) => (
  <>
    <input
      name="bundleItems"
      placeholder="Enter bundle items separated by commas"
      value={formData.bundleItems || ""}
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </>
);

/* ---------------- Configurable Product Form ---------------- */
const ConfigurableForm = ({ formData, handleChange }) => (
  <>
    <input
      name="configOptions"
      placeholder="Configuration Options (e.g. Size, Color)"
      value={formData.configOptions || ""}
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </>
);

/* ---------------- Main Add Product ---------------- */
const AddProduct = () => {
  const navigate = useNavigate();

  const initialState = {
    category: "",
    productName: "",
    productDescription: "",
    brand: "",
    productQuality: "",
    hsnCode: "",
    price: "",
    costPrice: "",
    sellingPrice: "",
    currency: "INR",
    unitOfMeasure: "",
    stockQuantity: "",
    warehouse: "",
    supplier: "",
    serviceDuration: "",
    serviceProvider: "",
    subscriptionPeriod: "",
    renewalPrice: "",
    bundleItems: "",
    configOptions: "",
    productImage: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/products/add", formData);
      toast.success("Product added successfully");
      setFormData(initialState);
    } catch (error) {
      console.error(error);
      toast.error("Error adding product");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post("http://localhost:7000/api/categories", { name: newCategory });
      toast.success("Category added");
      setNewCategory("");
      await fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Error adding category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/categories/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-blue-600 flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
        </button>
        <h2 className="text-2xl font-bold text-center flex-1">Add Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="flex items-center border rounded-md p-2">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="flex-1 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-800 text-blue-700 bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            <Plus size={20} />
          </button>
        </div>

        <input
          name="brand"
          placeholder="Brand / Manufacturer"
          value={formData.brand}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="hsnCode"
          placeholder="HSN / GST Code"
          value={formData.hsnCode}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="productQuality"
          value={formData.productQuality}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Product Type</option>
          <option value="Standard">Standard</option>
          <option value="Service">Service</option>
          <option value="Subscription">Subscription</option>
          <option value="Bundle/Kit">Bundle/Kit</option>
          <option value="Configurable">Configurable</option>
        </select>

        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price (MRP)"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="costPrice"
          type="number"
          placeholder="Cost Price"
          value={formData.costPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="sellingPrice"
          type="number"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {formData.productQuality === "Standard" && (
          <StandardForm formData={formData} handleChange={handleChange} />
        )}
        {formData.productQuality === "Service" && (
          <ServiceForm formData={formData} handleChange={handleChange} />
        )}
        {formData.productQuality === "Subscription" && (
          <SubscriptionForm formData={formData} handleChange={handleChange} />
        )}
        {formData.productQuality === "Bundle/Kit" && (
          <BundleForm formData={formData} handleChange={handleChange} />
        )}
        {formData.productQuality === "Configurable" && (
          <ConfigurableForm formData={formData} handleChange={handleChange} />
        )}

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input
          name="productImage"
          placeholder="Product Image URL"
          value={formData.productImage}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

        <textarea
          name="productDescription"
          placeholder="Product Description"
          value={formData.productDescription}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white border border-green-600 p-5 rounded-md w-96">
            <div className="flex items-center border border-green-600 mb-3 rounded-md">
              <input
                type="text"
                placeholder="Enter Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 p-2 outline-none"
              />
              <button
                onClick={handleAddCategory}
                className="px-3 py-2 bg-blue-600 text-white rounded-r cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="border border-green-600 rounded-md p-2 max-h-48 overflow-y-auto">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>{cat.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="text-red-600 text-sm cursor-pointer"
                  >
                    <Trash className="w-4 h-6" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 w-full bg-gray-500 text-white py-2 rounded-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
