import LoadingImage from "../../Assets/img/865.gif"
export function Loading(){
    const cardContainer = {
        display:'flex',
        width: "40rem",
        height: "100%",
        justifyContent:'center',
        fontSize: "2rem",
        margin: "1rem",
    }
    const Loadingstyle ={
        display: "flex",
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        // padding:"20rem",
    }
    const loadingHead ={
        color: "#850100",
        alignItems:'center'
    }
    return(

    <div style={cardContainer}> 
        <div style={Loadingstyle}>
            <img src={LoadingImage}/>
        <p > Initializing project...</p>
        </div>
    </div>)
  }