import './style.css';

const Dot = (props) => {
    return (
        <>
            <div className="dot" style={{ backgroundColor: props.color }}></div>
        </>
    );
}
export default Dot;

