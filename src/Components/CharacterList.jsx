import { useState, useEffect } from "react";
import Character from "./Character";

function NavPage({ page, setPage }){
  return (
    <header className="d-flex justify-content-between  align-items-center">
   
 
<nav >
  <ul className="pagination">
    <li className="page-item text-red">
      <a className="page-link " href="#" aria-label="Previous" onClick={() => setPage(page - 1)}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">{page}</a></li>
    
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next" onClick={() => setPage(page + 1)}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
<form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </header>
  );
}
/* function NavPage({ page, setPage }) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <p>Page: {page}</p>

      <button
        className="btn btn-primary btn-sm"
        onClick={() => setPage(page + 1)}
      >
        Page {page + 1}
      </button>
    </header>
  );
} */

export function CharacterList() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const { results } = await data.json();
      setCharacters(results);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  return (
   
    <div className="container">
      <NavPage page={page} setPage={setPage} />
      
      {loading ? (
        <div>Loading... </div>
       
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character
                key={character.id}
                name={character.name}
                origin={character.origin}
                image={character.image}
              />
            </div>
          ))}
        </div>
      )}

      <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default CharacterList;
