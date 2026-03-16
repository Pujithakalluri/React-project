import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";

function IceCream() {

  const dispatch = useDispatch();

  const iceCreamItems = [
    { id: 301, name: "Vanilla Ice Cream", description: "Classic creamy vanilla flavored ice cream.", price: 50, image: "vanila ice cream.jpg" },
    { id: 302, name: "Chocolate Ice Cream", description: "Rich chocolate delight ice cream.", price: 60, image: "chocolate ice cream.jpg" },
    { id: 303, name: "Strawberry Ice Cream", description: "Fresh strawberry flavored ice cream.", price: 55, image: "strawberry icecream.jpg" },
    { id: 304, name: "Mango Ice Cream", description: "Sweet and tangy mango flavored ice cream.", price: 60, image: "mango ice cream.jpg" },
    { id: 305, name: "Butterscotch Ice Cream", description: "Creamy butterscotch flavor with nuts.", price: 65, image: "butterscoth ice cream.jpg" },
    { id: 306, name: "Pista Ice Cream", description: "Rich pista flavor with chopped nuts.", price: 70, image: "pista ice cream.jpg" },
    { id: 307, name: "Blueberry Ice Cream", description: "Fresh blueberry ice cream with real fruits.", price: 65, image: "Blueberry Ice Cream.jpg" },
    { id: 308, name: "Oreo Ice Cream", description: "Creamy ice cream loaded with Oreo cookies.", price: 70, image: "oreo ice cream.jpg" },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(iceCreamItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = iceCreamItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart successfully!`, {
      autoClose: 2000,
      pauseOnHover: false,
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Ice Cream Menu
      </h2>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {currentItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><b>₹{item.price}</b></p>

            <button
              onClick={() => handleAddToCart(item)}
              style={{
                padding: "8px 12px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "center",
          gap: "6px"
        }}
      >

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          style={{
            width: "32px",
            height: "28px",
            borderRadius: "4px",
            background: "#fff",
            color: "white",
            cursor: "pointer"
          }}
        >
          ⬅️
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              width: "32px",
              height: "28px",
              borderRadius: "4px",
              background: currentPage === index + 1 ? "orange" : "#fff",
              color: currentPage === index + 1 ? "#fff" : "#000",
              cursor: "pointer"
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{
            width: "32px",
            height: "28px",
            borderRadius: "4px",
            background: "#fff",
            color: "white",
            cursor: "pointer"
          }}
        >
          ➡️
        </button>

      </div>

    </div>
  );
}

export default IceCream;