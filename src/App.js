import "./App.css";
import Nav from "./component/Nav";
import RemoveBg from "./component/RemoveBg";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Home from "./component/Home";
// import Rq from "./component/Rq";
// import Trational from "./component/Trational";
// import PosyIndPage from "./component/PosyIndPage";
// import Fruits from "./component/Fruits";

import ScreenAnimation from "./component/ScreenAnimation";
import StickyCards from "./component/StickyCards";

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/posts">Traditional Posts</Link>
//             </li>
//             <li>
//               <Link to="/rq-posts">RQ Posts</Link>
//             </li>
//             <li>
//               <Link to="/fruits">RQ Posts</Link>
//             </li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/posts" element={<Trational />} />
//           <Route exact path="/rq-posts" element={<Rq />} />
//           <Route path="/rq-posts/:id" element={<PosyIndPage />} />
//           <Route exact path="/fruits" element={<Fruits />} />
//           {/* <Route path="/rq-posts/:id" element={<PosyIndPage />} /> */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

const App = () => {
  return (
    <div>
      <Nav />
      {/* <section class="intro">
        <img src="./image.jpg" alt="Intro s" />
      </section> */}
      {/* <StickyCards /> */}
      {/* <ScreenAnimation/> */}
      {/* <section class="outro">
        <h1>Outro Line</h1>
      </section> */}

      <div className="hero h-screen flex items-center justify-center">
        <RemoveBg />
      </div>
    </div>
  );
};

export default App;
