import "./style.css";
import Image from "react-bootstrap/Image";
let image = "";
const Images = ({ id, data, flag }) => {
  if (id) {
    console.log("id image: ", id);
    console.log("data image: ", data);
    console.log("flag image: ", flag);

    for (let index = 0; index < data.length; index++) {
      if (data[index].acf.image)
        if (data[index].id === id) {
          image = data[index].acf.image.url;
        }
    }
  }
  return (
    <>
      {flag && id ? (
        <>
          {image !== "" ? (
            <>
              <div className="imgTablet">
                <Image
                  style={{
                    width: "60px",
                    height: "69px",
                  }}
                  src={image}
                  alt="new"
                />
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          {image !== "" ? (
            <>
              <div className="img">
                <Image
                  style={{
                    width: "133px",
                    height: "89px",
                  }}
                  src={image}
                  alt="new"
                />
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
};
export default Images;
//----------------------------------------
