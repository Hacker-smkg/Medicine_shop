export default function ProductCard({ name, price, image, description }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">₹{price}</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  