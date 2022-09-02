import "./Modal.css";
import ReactLoading from 'react-loading';

const Modal_Loading = (props) => {

    return (
        <>
            {props.props === false ? <>
                <div className="modalContainerLittleLoading">
                    <h2 style={{ color: 'white' }}>Loading</h2>
                    < ReactLoading />
                </div>

            </> : <>
                <div className="modalContainerLoading">

                    <div >
                        <h1 style={{ color: '' }}>Loading</h1>
                        < ReactLoading type={"bars"} className='loading' color={"rgb(180, 175, 199)"} height={'12%'} width={'12%'} />
                    </div>
                </div></>}
        </>
    );
}
export default Modal_Loading;