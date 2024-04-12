import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import {Link} from 'react-router-dom';



const Header = () => {

  return (
    <>
    <header>

        <Link className='tab grow-1' to="/" ><li >Tri Conquest</li></Link>
        <Link className="tab" to="/adventure" ><li >Aventure</li></Link>
        <Link className="tab" to="/cards" ><li>Cartes</li></Link>
              
        {useAuthUser() === null
        ? <Link className="tab grow-1'" to="/login" ><li >Se connecter</li></Link>
        : <Link className="tab grow-1'" to="/logout" ><li >Se déconnecter</li></Link>}
      </header>
      </>

  )
}

export default Header