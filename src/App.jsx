import './styles/App.scss';

import 'bootstrap/dist/css/bootstrap.css';

import Banner from "./components/banner.jsx";
import BooksList from "./components/booksList.jsx";

function App() {

  return (
    <>
        <Banner>
            <div>
                Welcome to your local Library!
            </div>
        </Banner>
        <BooksList />
    </>

  )
}

export default App
