import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";

function Snacks() {

  const dispatch = useDispatch();

  const snackItems = [
    { id: 201, name: "Samosa", description: "Crispy fried pastry filled with spicy potato stuffing.", price: 20, image: "samosa.jpg" },
    { id: 202, name: "Pav Bhaji", description: "Spicy mashed vegetable curry served with butter pav.", price: 40, image: "pav bhaji.jpg" },
    { id: 203, name: "Mirchi Bajji", description: "Deep-fried green chillies coated in gram flour batter.", price: 25, image: "mirchi bajji.jpg" },
    { id: 204, name: "Veg Puff", description: "Flaky pastry filled with spicy vegetable mixture.", price: 30, image: "veg puff.jpg" },
    { id: 205, name: "French Fries", description: "Crispy golden fried potato sticks.", price: 60, image: "french fries.jpg" },
    { id: 206, name: "Paneer Tikka", description: "Grilled spicy paneer cubes.", price: 70, image: "panner tikka.jpg" },
    { id: 207, name: "Cheese Balls", description: "Crispy balls stuffed with cheesy goodness.", price: 50, image: "chese balls.jpg" },
    { id: 208, name: "Spring Roll", description: "Crispy rolls stuffed with vegetables.", price: 45, image: "spring rolls.jpg" },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(snackItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = snackItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`, {
      autoClose: 2000,
      pauseOnHover: false,
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Snacks Menu
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

export default Snacks;