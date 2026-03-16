import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";

function NonVeg() {

  const dispatch = useDispatch();

  const nonVegItems = [
    { id: 1, name: "Chicken Biryani", description: "Aromatic basmati rice cooked with spicy chicken masala.", price: 150, image: "/chicken briyani.jpg" },
    { id: 2, name: "Mutton Biryani", description: "Rich and flavorful biryani with tender mutton pieces.", price: 180, image: "/mutton briyani.jpg" },
    { id: 3, name: "Chicken 65", description: "Crispy deep-fried chicken tossed in spicy masala.", price: 120, image: "/chicken 65.jpg" },
    { id: 4, name: "Chicken Pakodi", description: "Crispy deep-fried chicken pakodas.", price: 130, image: "/chicken pakodi.jpg" },
    { id: 5, name: "Chicken Fry Biryani", description: "Crispy fried chicken with South Indian spices.", price: 140, image: "/chicken fry piece briyani.jpg" },
    { id: 6, name: "Mutton Curry", description: "Slow-cooked mutton curry with rich masala.", price: 170, image: "/mutton curry.jpg" },
    { id: 7, name: "Fish Fry", description: "Spicy marinated fish shallow fried to perfection.", price: 160, image: "/fish fry.jpg" },
    { id: 8, name: "Prawns Biryani", description: "Flavorful biryani made with tender prawns.", price: 190, image: "/prawns briyani.jpg" },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = nonVegItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart successfully!`);
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f8f9fa" }}>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        🍗 Non-Veg Menu
      </h2>

      {/* Menu Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
        }}
      >
        {currentItems.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "15px",
              textAlign: "center",
            }}
          >

            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h3>{item.name}</h3>

            <p style={{ fontSize: "14px", color: "#666" }}>
              {item.description}
            </p>

            <p style={{ fontWeight: "bold" }}>₹{item.price}</p>

            <button
              onClick={() => handleAddToCart(item)}
              style={{
                padding: "8px 14px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
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
            fontSize: "12px",
            borderRadius: "4px",
            
             background: "#fff",
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
              fontSize: "12px",
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
            fontSize: "12px",
            borderRadius: "4px",
            
             background: "#fff",
            cursor: "pointer"
          }}
        >
         ➡️
        </button>

      </div>

    </div>
  );
}

export default NonVeg;
