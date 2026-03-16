import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";

function Veg() {

  const dispatch = useDispatch();

  const vegItems = [
    { id: 1, name: "Paneer Butter Masala", description: "Soft paneer cubes cooked in rich creamy tomato gravy.", price: 220, image: "Panner butter masala.jpg" },
    { id: 2, name: "Veg Biryani", description: "Aromatic basmati rice cooked with fresh vegetables and spices.", price: 180, image: "veg briyani.jpg" },
    { id: 3, name: "Chole Bhature", description: "Spicy chickpeas served with fluffy deep-fried bread.", price: 150, image: "Chole Bhature.jpg" },
    { id: 4, name: "Veg Manchurian", description: "Crispy vegetable balls tossed in a tangy Manchurian sauce.", price: 200, image: "Veg Manchurian.jpg" },
    { id: 5, name: "Paneer Biryani", description: "Fragrant basmati rice layered with marinated paneer and spices.", price: 240, image: "panner briyani.jpg" },
    { id: 6, name: "Aloo Gobi", description: "Potatoes and cauliflower cooked with mild Indian spices.", price: 160, image: "Aloo Gobi.jpg" },
    { id: 7, name: "Dal Tadka", description: "Yellow lentils tempered with garlic, cumin, and chili.", price: 140, image: "Dal Tadka.jpg" },
    { id: 8, name: "Mix Veg Curry", description: "Seasonal vegetables cooked in a flavorful curry gravy.", price: 180, image: "Mix Veg Curry.jpg" },
    { id: 9, name: "Bendakaya Fry", description: "Crispy okra slices seasoned with spices.", price: 120, image: "Bendakaya fry.jpg" },
    { id: 10, name: "Gobi Manchurian", description: "Crispy cauliflower tossed in sweet and spicy Manchurian sauce.", price: 190, image: "Veg Manchurian.jpg" },
    { id: 11, name: "Paneer Tikka", description: "Grilled paneer cubes marinated in spices and yogurt.", price: 230, image: "panner tikka.jpg" },
    { id: 12, name: "Potato Fry", description: "Crispy potato slices seasoned with spices.", price: 120, image: "potato.fry.jpg" },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = vegItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart successfully!`, {
      autoClose: 2000,
      pauseOnHover: false,
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Veg Menu</h2>

      {/* Menu Cards */}
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
              background: "#fff"
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

export default Veg;