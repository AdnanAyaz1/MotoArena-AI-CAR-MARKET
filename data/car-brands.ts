export const carBrands = [
  "toyota", "honda", "nissan", "mazda", "suzuki",
  "mitsubishi", "bmw", "mercedes", "audi", "volkswagen",
  "porsche", "ford", "chevrolet", "cadillac", "jeep",
  "tesla", "hyundai", "kia", "genesis", "volvo",
  "polestar", "jaguar", "landrover", "mini", "bentley",
  "rollsroyce", "ferrari", "lamborghini", "maserati", "alfaromeo",
  "fiat", "peugeot", "renault", "citroen", "byd",
  "geely", "lexus", "subaru", "skoda", "seat"
].map((slug) => ({
  name: slug
    .replace("landrover", "Land Rover")
    .replace("rollsroyce", "Rolls-Royce")
    .replace("alfaromeo", "Alfa Romeo")
    .replace(/^./, (c) => c.toUpperCase()),
  logo: `https://cdn.simpleicons.org/${slug}`,
}));
