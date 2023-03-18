import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../Components/ErrorElement";
import LoadingElement from "../Components/LoadingElement";
import NoAccess from "../Components/NoAccess";
import Main from "../Layout/Main";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AddToCart from "../Pages/AddToCart/AddToCart";
import AllProductAdmin from "../Pages/AllProductAdmin/AllProductAdmin";
import AllUsers from "../Pages/AllUsers/AllUsers";
import Contact from "../Pages/Contact/Contact";
import FailedOrder from "../Pages/failedOrder/FailedOrder";
import Home from "../Pages/Home/Home";
import SearchProduct from "../Pages/Home/SearchProduct/SearchProduct";
import OrderHistory from "../Pages/OrderHistory/OrderHistory";
import OrderNow from "../Pages/OrderNow/OrderNow";
import ProductDetails from "../Pages/Product Details/ProductDetails";
import ProductsByCatClick from "../Pages/ProductsByCatClick/ProductsByCatClick";
import Login from "../Pages/RegisterLogin/Login/Login";
import Register from "../Pages/RegisterLogin/Register/Register";
import Shop from "../Pages/Shop/Shop";
import SuccessfullOrder from "../Pages/SuccessfullOrder/SuccessfullOrder";
import Wishlist from "../Pages/Wishlist/Wishlist";
import YourOrder from "../Pages/YourOrder/YourOrder";
import PrivateAdmin from "./PrivateAdmin";
import PrivateRoutes from "./PrivateRoutes";

export const routes = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorElement></ErrorElement>,
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/yourOrder',
                element: <PrivateRoutes><YourOrder></YourOrder></PrivateRoutes>
            },
            {
                path: '/loader',
                element: <LoadingElement></LoadingElement>
            },
            {
                path: '/cart',
                element: <PrivateRoutes><AddToCart></AddToCart></PrivateRoutes>
            },
            {
                path: '/wishlist',
                element: <PrivateRoutes><Wishlist></Wishlist></PrivateRoutes>
            },
            {
                path: '/orderNow',
                element: <PrivateRoutes><OrderNow></OrderNow></PrivateRoutes>
            },
            {
                path: '/payment/success',
                element: <PrivateRoutes><SuccessfullOrder></SuccessfullOrder></PrivateRoutes>
            },
            {
                path: '/payment/fail',
                element: <PrivateRoutes><FailedOrder></FailedOrder></PrivateRoutes>
            },
            {
                path: '/productsByCatClick',
                element: <ProductsByCatClick></ProductsByCatClick>
            },
            {
                path: '/productDetails',
                element: <ProductDetails></ProductDetails>
            },
            {
                path: '/noAccess',
                element: <NoAccess></NoAccess>
            },
            {
                path: '/allProduct',
                element: <PrivateRoutes><PrivateAdmin><AllProductAdmin></AllProductAdmin></PrivateAdmin></PrivateRoutes>
            },
            {
                path: '/orderHistory',
                element: <PrivateRoutes><PrivateAdmin><OrderHistory></OrderHistory></PrivateAdmin></PrivateRoutes>
            },
            {
                path: '/allUsers',
                element: <PrivateRoutes><PrivateAdmin><AllUsers></AllUsers></PrivateAdmin></PrivateRoutes>
            },
            {
                path: '/searchProduct',
                element: <SearchProduct></SearchProduct>
            }
        ]
    }
])