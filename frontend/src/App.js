import Adminlogin from './Admin/adminlogin'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './home/homepage';
import Navbar from './home/navbar';
import Footer from './home/footer';
import Rating from './Admin/ratings';
import Spicy from './home/Spices';
import Coco from './home/coco';

function App() {
  return (
    <div>
     <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/" element={<Homepage />} />
          <Route path='/rating' element={<Rating/>}/>
          <Route path='/spices' element={<Spicy/>}/>
          <Route path='/coco' element={<Coco/>}/>

        </Routes>
      </BrowserRouter>

     <Footer/>


    </div>
  );
}

export default App;
