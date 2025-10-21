import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function getServerSideProps(context: any) {
  const queryParam = context.query.query || ""; 
  await dbConnect();
  const products = await Product.find({
    title: { $regex: queryParam, $options: "i" },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      searchQuery: queryParam,
    },
  };
}

export default function SearchPage({ products, searchQuery }: any) {
  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center text-black w-full max-w-[85%] mt-8">
        Search Results for: "{searchQuery}"
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-sm sm:text-base text-center w-full max-w-[85%]">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[85%]">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="border text-black p-4 shadow hover:shadow-lg transition cursor-pointer flex flex-col"
              onClick={() => (window.location.href = `/product/${product._id}`)}
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-60 object-cover "
              />
              <h2 className="font-medium text-base md:text-lg mt-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
