import { AiOutlinePlus } from "react-icons/ai";
import "./style.css";

const CardDash = (props) => {
  console.log(props.cards);
  const headline = props.cards.headline;
  const addLabel = props.cards.addLabel;
  const image = props.cards.image;

  const handleAddLink = (id) => {
    console.log("done");
    if (id === 1) {
      window.location.replace("/");
    } else if (id === 2) {
      window.location("www.facebook.com");
    } else if (id === 3) {
      window.location.replace("/planner");
    } else if (id === 4) {
      window.location("www.google.com");
    } else console.log("fail");
  };

  return (
    <div className="CardDash">
      <div className="headline">{headline}</div>
      <a className="add" onClick={() => handleAddLink(props.cards.id)}>
        <h4>{addLabel}</h4>
        <AiOutlinePlus
          style={{
            marginTop: "6px",
            marginLeft: "5px",
            fill: "rgb(116, 172, 255)",
          }}
        />
      </a>
      <div className="image_background">
        <img className="cardPhoto" src={image} alt="Card Logo"></img>
      </div>
    </div>
  );
};

export default CardDash;
