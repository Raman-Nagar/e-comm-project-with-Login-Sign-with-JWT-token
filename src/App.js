import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import AddProduct from "./component/privateComponent/AddProduct";
import ProductList from "./component/privateComponent/ProductList";
import Update from "./component/privateComponent/Update";
import PrivatComp from "./component/privateComponent/PrivatComp";
import Registration from "./component/sign&Login/Registration";
import Login from "./component/sign&Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route element={<PrivatComp />} >

            <Route path="/" element={ <ProductList />} />
            <Route path="/add" element={ <AddProduct />} />
            <Route path="/update/:id" element={ <Update />} />
            <Route path="/contact" element={ <h1>contact</h1>} />
          </Route>

          <Route path="/sign" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

