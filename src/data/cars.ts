import { siHyundai, siMahindra, siSuzuki } from "simple-icons";

export const hyderabadAreas = ["Banjara Hills", "Gachibowli", "Madhapur"];

export const cars = [
  { id: "hyundai-creta", brand: "Hyundai", model: "Creta", logo: siHyundai, image: "/images/cars/hyundai-creta.jpg", area: "Gachibowli", type: "SUV · Automatic", seats: "5 seats", fuel: "Petrol", price: "₹2,499", tag: "Popular choice", color: "sand", initials: "CRETA" },
  { id: "maruti-baleno", brand: "Maruti Suzuki", model: "Baleno", logo: siSuzuki, image: "/images/cars/maruti-baleno.jpg", area: "Madhapur", type: "Hatchback · Manual", seats: "5 seats", fuel: "Petrol", price: "₹1,599", tag: "Great for the city", color: "blue", initials: "BALENO" },
  { id: "mahindra-thar", brand: "Mahindra", model: "Thar", logo: siMahindra, image: "/images/cars/mahindra-thar.jpg", area: "Banjara Hills", type: "SUV · Automatic", seats: "4 seats", fuel: "Diesel", price: "₹3,499", tag: "Weekend ready", color: "olive", initials: "THAR" },
];

export const brands = [
  { name: "Hyundai", logo: siHyundai },
  { name: "Maruti Suzuki", logo: siSuzuki },
  { name: "Mahindra", logo: siMahindra },
];
