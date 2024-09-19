export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(price);
}

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("es-PE",{
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(new Date(date));
}

export const getImageUrl = (image: string) => {
  if(image.includes('http')){
    return image;
  } else{
    return `/products/${image}.jpg`;
  }
}