import { Link } from "react-router-dom";
import BookSHelf from "./BookSHelf";
import { useEffect } from "react";
import * as BooksAPI from "../BooksAPI"

const MyBooks = ({servBooks, updateSerBooks, upOnly}) => {

    useEffect(() => {
        const getServBooks = async () => {
          const res = await BooksAPI.getAll();
          upOnly (res);
        }
        getServBooks();
      },[]);   

    const currReading = servBooks.filter((b=>b.shelf==="currentlyReading"));
    const wToRead = servBooks.filter((b=>b.shelf==="wantToRead"));
    const read = servBooks.filter((b=>b.shelf==="read"));

    const de = (obj) => obj.shelf

    return ( 
        
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <BookSHelf bookList={currReading} onCh= {updateSerBooks} de={de}/>
                    </div>
                    <h2 className="bookshelf-title">Want To Read</h2>
                    <div className="bookshelf-books">
                        <BookSHelf bookList={wToRead} onCh= {updateSerBooks} de={de}/>
                    </div>
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <BookSHelf bookList={read} onCh= {updateSerBooks} de={de}/>
                    </div>
                    <div className="open-search">
                        <Link to="/search" >Add a book</Link>
                    </div>
                </div>
            </div>
        </div>
    )};

    export default MyBooks ;