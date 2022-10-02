import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";

function Result(props){
    if(props.resultsclicked==true){
        return(
            <div style={{position:"absolute", bottom:"20%",left:"0",right:"0",border:"rgb(0,0,0) solid"}}>
            
            {/*JSON.stringify(props.resultsclicked)*/}
            </div>
        )
    }
    else{
        return(<></>)
    }
}

function Search() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [namecheck,setNamecheck]=useState("");
  const [resultsclicked,setResultsclicked]=useState(false)

  function makeSearch(){
    axios.post(`http://127.0.0.1:5000/api/search`, { namecheck })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  return (
    
    <div className="Profile">
      <div className="searchwrapper">
        <div className="search">
            <div className="taglineSearch">Search your crush here 🤭
            <input onChange={()=>{setNamecheck()}} /><span style={{fontSize:"1.3em",cursor:"pointer"}} class="material-symbols-outlined" onClick={()=>makeSearch()}>search</span></div>
        </div>
        <Result resultsclicked={resultsclicked}>
        </Result>
      </div>
    </div>
    
  );
  
}

export default Search;
