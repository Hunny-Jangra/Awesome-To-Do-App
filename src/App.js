import Calender from "./components/Calender"
import Popup from "./components/Popup"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      {/* <Calender /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calender />}/>
          <Route path="/add-item" element={<Popup />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App