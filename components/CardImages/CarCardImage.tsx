import CarImage from "./CarImage";

interface CarCardImageProps {
  images: string[];
  variant?: "compact" | "featured";
  className?: string;
}

const CarCardImage = ({
  images,
  variant = "compact",
  className = "",
}: CarCardImageProps) => {
  const imageIndex = variant === "featured" ? 0 : 0;
  const imageSrc = images[imageIndex] || images[0] || "";

  const sizeClasses = {
    compact: "h-full w-full",
    featured: "h-full w-full",
  };

  return (
    <CarImage
      src={imageSrc}
      alt="Car image"
      className={`${sizeClasses[variant]} group-hover:scale-105 transition-transform duration-500 ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default CarCardImage;
