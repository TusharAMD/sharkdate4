import { useAuth0 } from "@auth0/auth0-react";


function AuthenticatedPage(){
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isAuthenticated){
        return (
        <>
            <div className='backgroud'>
            </div>
            <div className='overlay'>
                <a href="/"><div className='logo'><img style={{maxHeight:"100%",maxWidth:"100%"}} src='https://i.ibb.co/mCHQkzQ/logo.png'></img></div></a>
                <div className='tagline'><a href="/profile">Let's create your <u>profile</u><span className='caretblink'>!</span></a></div>
                <div className='login' onClick={() => logout({ returnTo: window.location.origin })}>Logout<span class="material-symbols-outlined">logout</span></div>
                
            </div>
        </>
    )
    }
    else{
        return (
        
        <div className="App">
            <div className='backgroud'>
            </div>
            <div className='overlay'>
            <div className='logo'><img style={{maxHeight:"100%",maxWidth:"100%"}} src='https://i.ibb.co/mCHQkzQ/logo.png'></img></div>
            <div className='tagline'>Find them here not there<span className='caretblink'>!</span></div>
            <div className='login' onClick={() => loginWithRedirect()}>Login<span class="material-symbols-outlined">login</span></div>
            </div>
    
        </div>
        );}
}

export default AuthenticatedPage;
