import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchMyCartItems } from "../../store/cartSlice";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {token} = useAppSelector((state) => state.user);
    const {cart:carts} = useAppSelector((state) => state.cart);
    const localStorageToken = localStorage.getItem("token")
     const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
            setIsLoggedIn(!!token || !!localStorageToken);
            dispatch(fetchMyCartItems())
    },[])

    const handleClick = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

  return (
    <>
    <header className="sticky top-0 bg-white shadow">
        <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
            <div className="flex items-center text-2xl">
                <div className="w-12 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#BEE3F8" d="M44,7L4,23l40,16l-7-16L44,7z M36,23H17l18-7l1,6V23z"></path>
                        <path fill="#3182CE"
                            d="M40.212,10.669l-5.044,11.529L34.817,23l0.351,0.802l5.044,11.529L9.385,23L40.212,10.669 M44,7L4,23 l40,16l-7-16L44,7L44,7z">
                        </path>
                        <path fill="#3182CE"
                            d="M36,22l-1-6l-18,7l17,7l-2-5l-8-2h12V22z M27.661,21l5.771-2.244L33.806,21H27.661z">
                        </path>
                    </svg>
                </div><Link to="/">Shop-Sphere</Link>
            </div>
            <div className="flex mt-4 sm:mt-0">
                <a className="px-4" href="#products">Products</a>
                <a className="px-4" href="#services">Services</a>
                <a className="px-4" href="#stats">Stats</a>
                <a className="px-4" href="#testimonials">Testimonials</a>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/my-cart">
                    <button className="relative flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-2 14H5L3 3z"/>
                        </svg>
                        <span>Cart</span>
                        <span className="absolute top-0 right-0 block w-5 h-4 text-xs text-white bg-red-500 rounded-full text-center">
                            {carts.length > 0 ? carts.length : 0}  
                        </span>
                    </button>
                </Link>
                <div className="hidden md:block">
                    {isLoggedIn ? (
                        <button type="button"
                            className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white" onClick={handleClick}>
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link to="/register"><button type="button"
                                className="mr-8 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white">Register
                            </button></Link>
                            <Link to="/login"><button type="button"
                                className="py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white">Login
                            </button></Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
</>

  )
}

export default Navbar