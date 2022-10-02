import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useFilePicker } from 'use-file-picker';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const notify = () => toast("Profile Updated 👍");
  const warn = () => toast("Wait..✋");
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { max: 10 },
    // minFileSize: 0.1, // in megabytes
    
  });

  const[nickname,setNickName] = useState("");
  const[phone,setPhone] = useState("");
  const[about,setAbout] = useState("")
  const[pref,setPref] = useState("")

  function onSubmitHandler(){
    console.log(nickname,phone,about,pref)
    warn();

    let username = user.name
    let imageFiles = filesContent
    axios.post(`http://127.0.0.1:5000/api/updateprofile`, { username, nickname,phone,about,pref,imageFiles })
      .then(res => {
        console.log(res);
        console.log(res.data);
        notify();
      })
  }

  return isAuthenticated && (
    <>
    <div className="Profile">
    <a href="/"><div className='logo'><img style={{maxHeight:"100%",maxWidth:"100%"}} src='https://i.ibb.co/mCHQkzQ/logo.png'></img></div></a>
        <div className="profileformwrapper">
            <div className="profileform">
                <div className="profileitems">
            
                  <h3 style={{color:"white"}}>Profile</h3><br/>
                  Name:<br/><input placeholder="Your Name" disabled value={user.name}></input><br/>
                  Nickname:<br/><input onChange={(e)=>setNickName(e.target.value)} placeholder="Preffered Nickname (will be displayed)"></input><br/>
                  Mobile:<br/><input onChange={(e)=>setPhone(e.target.value)} placeholder="Mobile number (for notifications so you won't miss any chance)"></input><br/>
                  Add Images (Add atleast two images):<br/><br/><span style={{fontSize:"50px"}} onClick={() => {openFileSelector()}} class="material-symbols-outlined">add_box</span><br/><br/>
                  About me:<br/><textarea onChange={(e)=>setAbout(e.target.value)} placeholder="I am a.... And looking out for...."/><br/>
                  Looking out for: <select onChange={(e)=>setPref(e.target.value)} >
                                    <option value="man">Man</option>
                                    <option value="woman">Woman</option>
                                  </select><br/><br/>
                  <button style={{cursor:"pointer"}} onClick={()=>{onSubmitHandler()}} className="buttonprofile">Submit</button><br/> <p></p>

                  
                  <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </div>
            </div>
        </div>
        <a href="/search"><div style={{position:"absolute",right:"5%",zIndex:2,top:"10%"}}><img  src = "https://i.ibb.co/j8Rg7m9/image.gif"></img><span style={{fontSize:"1.5em", color:"white",cursor:"pointer"}}>Search</span></div></a>
    </div>
    </>
    
  );
  
}

export default Profile;
