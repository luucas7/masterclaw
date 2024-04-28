import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Home from '../pages/main/Home'
import Login from '../pages/auth/Login'
import Logout from '../pages/auth/Logout'
import Register from '../pages/auth/Register'
import Cards from '../pages/cards/Cards';
import AddCard from '../pages/cards/AddCard';
import Header from '../components/Header'
import GlobalSnackbar from '../components/GlobalSnackbar'
import Decks from '../pages/cards/Decks'

const AppRouter = () => {


    return (
        <BrowserRouter>
            <Header />
            <GlobalSnackbar />

            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/cards' element={<Cards />} />

                <Route path='decks' element={<Decks />} />

                <Route path='/cards/add' element={<RequireAuth fallbackPath={'/login'} ><AddCard /></RequireAuth>} />

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/logout' element={<Logout />} />

            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter