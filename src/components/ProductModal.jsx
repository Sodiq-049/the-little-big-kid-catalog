// import React, { useContext } from "react";
// import { BranchContext } from "../context/BranchContext";
// import { WHATSAPP_NUMBERS } from "../context/BranchContext";
// import "./ProductModal.css";

// function ProductModal({ product, onClose }) {
//   const { selectedBranch } = useContext(BranchContext);

//   if (!product) return null;

//   const whatsappNumber = WHATSAPP_NUMBERS[selectedBranch];

//   const whatsappMessage = `Hello, I'm interested in this item:\n\n${product.name}\nPrice: ₦${product.price}\n\nImage: ${product.image}`;

//   const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//     whatsappMessage
//   )}`;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <img src={product.image} alt={product.name} className="modal-img" />

//         <h3>{product.name}</h3>
//         <p className="price">₦{product.price}</p>

//         <div className="modal-buttons">
//           <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
//             Continue Order on WhatsApp
//           </a>

//           <a
//             href={product.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="checkout-btn"
//           >
//             Checkout
//           </a>
//         </div>

//         <button className="close-btn" onClick={onClose}>×</button>
//       </div>
//     </div>
//   );
// }

// export default ProductModal;
