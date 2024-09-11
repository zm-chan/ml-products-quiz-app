import { Link } from "react-router-dom";
import products from "./data";
import { buttonGeneralClassName, buttonVariants } from "./ui";
import { useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const filteredProducts = products.filter((product) => {
    return product.item.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="text-center">
          <button
            className={`${buttonGeneralClassName} ${buttonVariants.default} mt-6`}
          >
            <Link to={"/"}>To Quiz</Link>
          </button>
        </div>
        <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:gap-6">
          <label htmlFor="search" className="font-medium text-fuchsia-700">
            Search Products:
          </label>
          <input
            id="search"
            type="text"
            onChange={handleSearchTerm}
            value={searchTerm}
            className="h-10 w-full max-w-xs rounded-md bg-fuchsia-300 px-3 py-2 text-fuchsia-800 focus-visible:outline-fuchsia-500"
          />
        </div>
        <table className="mt-9 w-full rounded-md bg-white">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-yellow-600/50 [&_th]:p-4">
              <th>No.</th>
              <th>Item</th>
              <th>Volume</th>
              <th>VIP Price (RM)</th>
              <th>Retail Price (RM)</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {filteredProducts.map((product, i) => {
              let { item, volume, vipRM, retailRM } = product;

              return (
                <tr
                  key={i}
                  className="border-b transition-colors hover:bg-yellow-600/50 [&_td]:p-4 [&_td]:text-center"
                >
                  <td>{i + 1}</td>
                  <td>{item}</td>
                  <td>{volume}</td>
                  <td>{vipRM}</td>
                  <td>{retailRM}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ScrollToTopButton />
    </>
  );
}

export default Products;
