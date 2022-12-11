import { AiOutlinePlus } from "react-icons/ai";
import "./style.css";

const CardDash = (props) => {
  console.log(props.cards);
  const headline = props.cards.headline;
  const addLabel = props.cards.addLabel;
  const image = props.cards.image;

  const handleAddLink = (id) => {
    console.log("done add link");
    if (id === 1) {
      window.location.replace("/");
    } else if (id === 2) {
      window.location("www.facebook.com");
      window.location.replace("/routes_cards");
    } else if (id === 3) {
      window.location.replace("/planner");
    } else if (id === 4) {
      window.location("www.google.com");
    } else console.log("fail");
  };

  const handleHeadlineLink = (id) => {
    console.log("done headline link");
    if (id === 1) {
      window.location.replace("/places");
    } else if (id === 2) {
      window.location.replace("/student");
    } else if (id === 3) {
      window.location.replace("/routes_cards");
    } else if (id === 4) {
      window.location.replace("/subjects");
    } else console.log("fail");
  };

  return (
    <div className="CardDash">
      <a
        className="headlineClick"
        onClick={() => handleHeadlineLink(props.cards.id)}
      >
        <div className="headline">{headline}</div>
        <div className="image_background">
          <img className="cardPhoto" src={image} alt="Card Logo"></img>
        </div>
      </a>
      <a className="add" onClick={() => handleAddLink(props.cards.id)}>
        {addLabel}
        <AiOutlinePlus
          style={{
            marginTop: "6px",
            marginLeft: "5px",
            fill: "rgb(116, 172, 255)",
          }}
        />
      </a>
    </div>
  );
};

export default CardDash;
