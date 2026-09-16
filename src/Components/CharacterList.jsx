import { useState, useEffect } from "react";
import Character from "./Character";

function NavPage({ page, setPage, search, setSearch }) {
  return (
    <header className="d-flex justify-content-between align-items-center mb-4">
      <nav>
        <ul className="pagination mb-0">
          <li className="page-item">
            <button
              className="page-link"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              &laquo;
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{page}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
      

      <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar personaje..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reinicia a la página 1 al buscar
          }}
        />
      </form>
    </header>
  );
}

export function CharacterList() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
        );
        const data = await response.json();
        
        if (data.results) {
          setCharacters(data.results);
        } else {
          setCharacters([]); // Manejar casos sin resultados
        }
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, search]);

  return (
    <div className="container py-4">
      <NavPage page={page} setPage={setPage} search={search} setSearch={setSearch} />

      {loading ? (
        <div>Cargando...</div>
      ) : characters.length > 0 ? (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4 mb-4" key={character.id}>
              <Character
                name={character.name}
                origin={character.origin}
                image={character.image}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No se encontraron personajes.</div>
      )}
    </div>
  );
}

export default CharacterList;