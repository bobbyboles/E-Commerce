import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchProductsAsync,
    selectProducts,
    deleteProductAsync,
    sortAZ,
    sortZA,
    sortByPriceHighLow,
    sortByPriceLowHigh,
    sortBySearch,
} from "../slices/allProductsSlice";
import { getSingleUser, selectSingleUser } from "../slices/singleUserSlice";
import { getMyHomeCart, addProductToDBCart } from "../slices/cartSlice";
import SideNav from "./SideNav";
import Pagination from "./Pagination";
let PageSize = 15;

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const products = useSelector(selectProducts);

    const currentTableData = (() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    })();

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.me.id);
    const user = useSelector(selectSingleUser);

    useEffect(() => {
        dispatch(fetchProductsAsync());
        if (userId) dispatch(getSingleUser(userId));
        if (userId) dispatch(getMyHomeCart(userId));
        if (userId) handleLoginWithItems(userId);
    }, [dispatch, userId]);

    const handleSort = ({ target: { value } }) => {
        if (value == "titleaz") dispatch(sortAZ());
        if (value == "titleza") dispatch(sortZA());
        if (value == "pricehl") dispatch(sortByPriceHighLow());
        if (value == "pricelh") dispatch(sortByPriceLowHigh());
    };

    const handleSearch = async ({ target: { value } }) => {
        await dispatch(fetchProductsAsync());
        await dispatch(sortBySearch(value.toLowerCase()));
    };

    const handleLoginWithItems = (userId) => {
        const previousCart = localStorage.getItem("cart");
        if (previousCart) {
            const previousCartStringed = JSON.parse(previousCart);
            previousCartStringed.map(async (item) => {
                const quantity = item.quantity;
                const productId = item.id;
                await dispatch(
                    addProductToDBCart({ quantity, userId, productId })
                );
            });
            localStorage.setItem("cart", []);
        }
    };

    return (
        <div id="homePage" >
            <div id="filterBars" >
                <div id="searchBar" >
                    Search:
                    <SideNav />
                    <input  onChange={handleSearch}></input>
                </div>
                <div id="AllProductSorting" >
                    <label>Sort by:</label>
                    <select
                        className="sortBy"
                        
                        onChange={handleSort}
                    >
                        <option value="select">-Select-</option>
                        <option value="titleaz">Title A-Z</option>
                        <option value="titleza">Title Z-A</option>
                        <option value="pricehl">Price H-L</option>
                        <option value="pricelh">Price L-H</option>
                    </select>
                </div>
            </div>

            <div> 
                {currentTableData && currentTableData.length
                    ? currentTableData.map((product) => {
                          console.log(
                              "THIS IS THE ITEMS FOR THE CURRENT PAGE ",
                              product
                          );
                          return (
                              <div
                                  key={product.id}
                              >
                                  <Link
                                      to={`/products/${product.id}`}
                                      key={`All Products: ${product.id}`}
                                  >
                                      <img
                                          src={product.imageUrl}
                                      ></img>
                                      <div id="productBottom">
                                          <h2
                                              id="productName"
                                          >
                                              {product.productName}
                                          </h2>
                                          {product.stockQuantity ? (
                                              <h3
                                                  id="productPrice"
                                              >
                                                  $ {product.price}
                                              </h3>
                                          ) : (
                                              <h3>OUT OF STOCK</h3>
                                          )}
                                      </div>
                                  </Link>
                                  {user.isAdmin && (
                                      <button
                                          style={{ marginRight: 150}}
                                          onClick={() => {
                                              dispatch(
                                                  deleteProductAsync(product.id)
                                              );
                                          }}
                                      >
                                          Delete
                                      </button>
                                  )}
                              </div>
                          );
                      })
                    : null}
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={products.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Home;
