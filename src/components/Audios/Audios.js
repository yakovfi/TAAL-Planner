import './style.css';
let audio = ""
const Audios = ({ id, data }) => {
    // console.log("idAudios:", id)
    // console.log("dataAudios:", data)

    for (let index = 0; index < data.length; index++) {
        if (data[index].acf.audio)
            if (data[index].id === id) {
                audio = data[index].acf.audio.url;
            }
    }
    return (
        <>
            <div className="audio">
                <audio src={audio} controls autoPlay />
            </div>
        </>
    );
}
export default Audios;
//----------------------------------------
