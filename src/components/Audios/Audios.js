import "./style.css";
let audio = "";
const Audios = ({ id, data }) => {
  console.log("id   Audios:", id);
  console.log("data   Audios :", data);
  console.log("data   Audios length:", data.length);

  for (let index = 0; index < data.length; index++) {
    if (data[index].acf.audio)
      if (data[index].id === id) {
        audio = data[index].acf.audio.url;
      }
  }
  console.log("audio:::::::::::", audio);
  return (
    <>
      <div className="audio">
        <audio src={audio} controls autoPlay />
      </div>
    </>
  );
};
export default Audios;
//----------------------------------------
