import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";

function Tiffins() {

  const dispatch = useDispatch();

  const tiffinItems = [
    { id: 101, name: "Idli", description: "Soft and fluffy steamed rice cakes served with chutney and sambar.", price: 40, image: "Idali.jpg" },
    { id: 102, name: "Dosa", description: "Crispy rice crepe served with coconut chutney and sambar.", price: 60, image: "dosa.jpg" },
    { id: 103, name: "Masala Dosa", description: "Crispy dosa filled with spicy potato masala.", price: 80, image: "masala dosa.jpg" },
    { id: 104, name: "Poori", description: "Deep-fried wheat bread served with potato curry.", price: 70, image: "poori.jpg" },
    { id: 105, name: "Onion Dosa", description: "Crispy dosa topped with onions and spices.", price: 50, image: "onion dosa.jpg" },
    { id: 106, name: "Uttapam", description: "Thick pancake topped with vegetables.", price: 60, image: "uttapam.jpg" },
    { id: 107, name: "Upma", description: "Savory semolina porridge cooked with vegetables and spices.", price: 35, image: "upma.jpg" },
    { id: 108, name: "Pongal", description: "Creamy rice and lentil dish tempered with spices.", price: 45, image: "pongal.jpg" },
    { id: 109, name: "Vada", description: "Crispy lentil fritters served with chutney.", price: 30, image: "vada.jpg" },
    { id: 110, name: "Chapati Sabzi", description: "Whole wheat flatbreads served with vegetable curry.", price: 55, image: "Chapati Sabzi.jpg" },
    { id: 111, name: "Paratha", description: "Flaky layered flatbread served with pickle and curd.", price: 50, image: "Paratha.jpg" },
    { id: 112, name: "Bhature Chole", description: "Deep-fried bread served with spicy chickpea curry.", price: 65, image: "Chole Bhature.jpg" },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tiffinItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = tiffinItems.slice(indexOfFirstItem, indexOfLastItem);

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
        Tiffins Menu
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
          ⬅️
        </button>

      </div>

    </div>
  );
}

export default Tiffins;
