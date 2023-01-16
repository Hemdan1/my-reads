function BookSHelf({bookList, onCh, de}) {

    const checker = (v, b) => {
       return v===b?"active":""
    }

    return ( 
        
        <ol className="books-grid">
            {  bookList &&
                bookList.map((book)=>(
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">{book.imageLinks && 
                                <div className="book-cover" style={{width:128, height:193,
                                backgroundImage:`url(${book.imageLinks.thumbnail})`}}
                                ></div>
                                        }

                                <div className="book-shelf-changer">
                                    <select id={book.id} onChange={(e)=>{onCh(book, e.target.value)}}>
                                        <option value="nothing" disabled>Move to...</option>
                                        
                                        <option value="hidden" className="hidden">hidden</option>
                                        <option value="currentlyReading" className={`${checker("currentlyReading" , book.shelf)}`}>Currently Reading</option>
                                        <option value="wantToRead" className={`${checker("wantToRead" , book.shelf)}`}>Want to Read</option>
                                        <option value="read" className={`${checker("read" , book.shelf)}`}>Read</option>
                                        <option value="none"className={`${checker("none" , book.shelf)}`}>None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors && book.authors.join(" , ")}</div>
                        </div>
                    </li> ))
            }
        </ol>
    
     );
}

export default BookSHelf;