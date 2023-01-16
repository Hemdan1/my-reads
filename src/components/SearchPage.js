import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookSHelf from "./BookSHelf";


const SearchPage = ({upd,servBooks,updateSerBooks,conc}) => { 
    const [query, setQuery] = useState("");

    const [searchedBks, setSearchedBks] = useState([]);

    const updateQuery = (q) => {
        setQuery(q.trim());
    };

      const updateSearchedBks = async(book, newShelf)=>{
        await upd(book,newShelf)
            const updated = searchedBks.map(b=> b.id===book.id ? {...b,shelf:newShelf} : b)
            setSearchedBks(updated)
            updateSerBooks(book, newShelf)
            updated.map((u)=>{
                const found = servBooks.find(s=>s.id===u.id)
                if (!found){conc(u)}
            })
        }

        const de = (obj) => {
           return obj.shelf
        }
        //searchedBks.map(b=> compare(b))
      
    useEffect (()=> {
        if(query&&query!==""){
            BooksAPI.search(query, 20).then((res)=>{
            if (res&&!res.error){
                const compare = res.map((b)=>{
                    const found = servBooks.find((sb=>sb.id === b.id))
                    if (found){
                        upd(b, found.shelf)
                        return {...b, shelf:found.shelf}
                    } else {
                        upd (b, "none")
                        return {...b, shelf: "none"}
                    }
                })
                setSearchedBks(compare)
            } else {
             setSearchedBks([]);
            
            }
        })} else{
            setSearchedBks([])
        }
    },[query]) 

    return (

    <div className="search-books">
        <div className="search-books-bar">
        <Link to="/" className="close-search">
            Close
        </Link>
        <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event)=>updateQuery(event.target.value)}
            />
        </div>
        </div>
        <div className="search-books-results">
            <BookSHelf bookList={searchedBks} onCh={updateSearchedBks} de={de}/>
        </div>
    </div>
    )
};

export default SearchPage;