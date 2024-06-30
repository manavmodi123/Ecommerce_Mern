import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 301; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [userProfile, setUserProfile] = useState({});
  const [cartDetails, setCartDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  
  
  // Function to get cart items details
  const getCartItems = () => {
    let cartDetailsArray = [];
    all_product.forEach((item) => {
      if (cartItems[item.id] > 0) {
        let cartItemDetail = {
          image: item.image,
          name: item.name,
          category: item.category,
          oldPrice: item.old_price,
          newPrice: item.new_price,
          quantity: cartItems[item.id],
        };
        cartDetailsArray.push(cartItemDetail);
      }
    });
    return cartDetailsArray;
  };

  // Update cartDetails state when component mounts or cartItems changes
  useEffect(() => {
    const cartDetailsArray = getCartItems();
    setCartDetails(cartDetailsArray);
  }, [cartItems, all_product]);

  useEffect(() => {
    fetch("http://localhost:4000/getallproducts")
      .then((res) => res.json())
      .then((data) => setAll_product(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);


  //Profile Details
  useEffect(() => {
    fetch("http://localhost:4000/getProfileDetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);


  //
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/getCartDetails", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data === "object" && Object.keys(data).length > 0) {
            setCartItems(data);
          } else {
            setCartItems(getDefaultCart());
          }
        })
        .catch((error) => {
          console.error("Error fetching cart details: ", error);
          setCartItems(getDefaultCart());
        });
    } else {
      console.error("Token not found in localStorage");
      setCartItems(getDefaultCart());
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/addtoCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("Token not found in localStorage");
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/deletefromCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("Token not found in localStorage");
    }
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getNumberOfItem = () => {
    let count = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        count++;
      }
    }

    const token = localStorage.getItem("auth-token");
    if (token) {
      return count;
    } else {
      return 0;
    }
  };

  
  
  const contextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    userProfile,
    cartDetails,
    orderDetails,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getNumberOfItem,
    
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
