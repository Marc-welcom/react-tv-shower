import s from "./style.module.css";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  // Declarer un tableau d'etoiles (jsx) vide
  const StarList = [];

  // Stocker dans une variable le nombre d'etoiles pleines
  const starFillCount = Math.floor(rating);

  // Stocker dans une variable si oui ou non il y'a une demi etoile
  const hasStarHalf = rating - starFillCount >= 0.5;

  // Stocker dans une variable le nombre d'etoiles vides
  const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);

  // Pusher dans le tableau les etoiles pleines
  for (let i = 1; i <= starFillCount; i++) {
    StarList.push(<StarFill key={"star-fill" + i} />);
  }

  // Pusher dans le tableau les demi etoiles (s'il y en a)
  if (hasStarHalf) {
    StarList.push(<StarHalf key={"star-half"} />);
  }

  // Pusher dans le tableau les etoiles vides
  for (let i = 1; i <= emptyStarCount; i++) {
    StarList.push(<StarEmpty key={"star-empty" + i} />);
  }

  return <div> {StarList} </div>;
}
