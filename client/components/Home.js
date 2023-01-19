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

    /////////////////////////////////////////////////// BEGIN CSS ///////////////////////////////////////////////////

    const simpleStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'right',
        flexWrap: "wrap",
        gap: 20,
        height: "100%",
        marginTop: '12vh'
        // borderRadius: '12px'
    };
    const homeStyle = {
        top: '12vh',
        marginTop: '30px',
    };
    const filterStyle = {
       display: 'flex',
       width: '100vw',
       justifyContent: 'space-evenly',
       alignItems: 'center',
       border: '2px solid lightBlue',
       marginTop: '35px',
       left: '0',
       backgroundColor: 'rgba(0, 0, 0, 0.7)',
       position: 'fixed'
    };
    const searchStyle = {
        position: "relative",
        margin: "20px",
        color: "#ff33cc",
        alignItems: "center",
    };
    const sortStyle = {
        display: "flex",
        flexDirection: "column",
        width: "30%",
        margin: "20px",
        color: "#ff33cc",
        border: "1px solid lightBlue",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "10px",
    };
    const imgStyle = {
        display: "flex",
        height: 150,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "15px",
    };
    const productStyle = {
        display: "flex",
        border: "2px solid purple",
        // flexWrap: "wrap",
        textAlign: "center",
        width: "18%",
        // marginTop: '12vh',
        alignItems: "center",
        // height: "100%",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: '5px',
        overflow: "hidden",
    };
    const productNameStyle = {
        display: "flex",
        border: "1px solid red",
        backgroundColor: "#ffd9b3",
        height: "60px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Press Start 2P, serif",
        fontSize: "17px",
    };
    const productPriceStyle = {
        display: "flex",
        border: "1px solid red",
        backgroundColor: "#99ccff",
        height: "28px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
    };

    /////////////////////////////////////////////////// END CSS ///////////////////////////////////////////////////

    return (
        <div id="homePage" style={homeStyle}>
            <div id='filterBars' style={filterStyle}>
                <div id="searchBar" style={searchStyle}>Search for a specific game!
                <SideNav />

                    <input onChange={handleSearch}></input>
                </div>
                <div id="AllProductSorting" style={sortStyle}>
                    <label>Sort by</label>
                    <select className="sortBy" onChange={handleSort}>
                        <option value="select">-Select-</option>
                        <option value="titleaz">Title A-Z</option>
                        <option value="titleza">Title Z-A</option>
                        <option value="pricehl">Price H-L</option>
                        <option value="pricelh">Price L-H</option>
                    </select>
                </div>
            </div>

            <div id="products" style={simpleStyle}>
                {currentTableData && currentTableData.length
                    ? currentTableData.map((product) => {
                        console.log('THIS IS THE ITEMS FOR THE CURRENT PAGE ', product)
                          return (
                              <div
                                  className="product"
                                  key={product.id}
                                  style={productStyle}
                              >
                                  <Link
                                      to={`/products/${product.id}`}
                                      key={`All Products: ${product.id}`}
                                  >
                                      <img
                                          src={product.imageUrl}
                                          style={imgStyle}
                                      ></img>
                                      <h2
                                          id="productName"
                                          style={productNameStyle}
                                      >
                                          {product.productName}
                                      </h2>
                                      {product.stockQuantity ? (
                                          <h3
                                              id="productPrice"
                                              style={productPriceStyle}
                                          >
                                              $ {product.price}
                                          </h3>
                                      ) : (
                                          <h3>OUT OF STOCK</h3>
                                      )}
                                  </Link>
                                  {user.isAdmin && (
                                      <button
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
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={products.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Home;
