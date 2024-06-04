import React, { useState, useEffect } from 'react';


const BooksList = () => {

    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [id, setId] = useState("");
    const [updateBookName, setNewBookName] = useState("");
    const [updateAuthor, setNewAuthor] = useState("");


    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");

    const isButtonDisabled = !bookName || !author;

    const isButtonDisabled_02 = !updateBookName || !updateAuthor;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);

        if (event.target.value.trim() === '') {
            window.location.reload();
        }
    };

    const handleCreateBook = () => {
        createBook(bookName, author);
        window.location.reload();
    };

    const handleUpdate = () => {
        updateBook(id, updateBookName, updateAuthor);
        window.location.reload();
    };


    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const filteredBooks = books.filter(book => book.bookName.toLowerCase().includes(searchTerm.toLowerCase()));
        setBooks(filteredBooks);
    }, [searchTerm]);

    function createBook(bookName, author) {
        fetch("http://localhost:8080/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookName: bookName,
                author: author,
            }),
        })
            .then(result => result.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    const updateBook = (id, updateBookName, updateAuthor) => {
        fetch(`http://localhost:8080/books/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookName: updateBookName,
                author: updateAuthor,
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    const deleteBook = (bookId) => {
        fetch(`http://localhost:8080/books/${bookId}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    setBooks(books.filter(book => book.id !== bookId));
                } else {
                    console.error('Error:', res.statusText);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className={"container"}>
            <div className={`box`}>
                <h3 style={{fontSize: '16px'}}>Search for book here</h3>
                <div className={"search-bar"}>
                    <input
                        type="text"
                        className="search-input"
                        id="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <table className={"table table-striped"} id="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>
                                <input
                                    type="text"
                                    name="bookName"
                                    value={book.bookName}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="author"
                                    value={book.author}
                                />
                            </td>
                            <td>
                                <button onClick={() => deleteBook(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className={"table table-striped"}>
                    <h3 style={{fontSize: '16px'}}>Add your desired book here</h3>
                    <div>
                        <input
                            type="text"
                            value={bookName}
                            onChange={e => setBookName(e.target.value)}
                            placeholder="Enter book name"
                        />
                        <input
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            placeholder="Enter author name"
                        />
                        <button onClick={handleCreateBook} disabled={isButtonDisabled}>Add Book</button>
                    </div>
                </table>
                <table className={"table table-striped"}>
                    <h3 style={{fontSize: '16px'}}>Edit your book here</h3>
                    <div>
                        <input
                            type="text"
                            value={id}
                            onChange={e => setId(e.target.value)}
                            placeholder="Enter ID"
                        />
                        <input
                            type="text"
                            value={updateBookName}
                            onChange={e => setNewBookName(e.target.value)}
                            placeholder="Enter book name"
                        />
                        <input
                            type="text"
                            value={updateAuthor}
                            onChange={e => setNewAuthor(e.target.value)}
                            placeholder="Enter author name"
                        />
                        <button onClick={() => handleUpdate(id, updateBookName, updateAuthor)} disabled={isButtonDisabled_02} >Update</button>
                    </div>
                </table>
            </div>
        </div>
    );
};

export default BooksList;