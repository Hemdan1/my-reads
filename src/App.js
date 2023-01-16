import "./App.css";
import MyBooks from "./components/MyBooks";
import SearchPage from "./components/SearchPage";
import { useState} from "react";
import * as BooksAPI from "./BooksAPI"
import {Route, Routes} from "react-router-dom";

function App() {

  

  const [servBooks, setServBooks] = useState([]);

  const upOnly = (arr)=>{
    setServBooks(arr)
  }

  const upd = async(book,shelf)=>{
    await BooksAPI.update(book,shelf)
    }

  const updateSerBooks = async(book, newShelf)=>{
     await upd(book,newShelf)
      const updated = servBooks.map(b=> b.id===book.id ? {...b,shelf:newShelf} : b)
    setServBooks(updated) 
  }
  
  const conc = (obj)=>{
    setServBooks(servBooks.concat(obj))
  } 

  //const updateSer = (el)=> setServBooks(el)

  return (
    <div className="app"> 
      <Routes>
        <Route exact path="/" 
        element={<MyBooks servBooks={servBooks} updateSerBooks={updateSerBooks} upOnly={upOnly} />}
        />
        <Route path="/search" 
        element={<SearchPage servBooks={servBooks} upd={upd} updateSerBooks={updateSerBooks} conc={conc}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
