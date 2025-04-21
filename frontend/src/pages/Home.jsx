import MovieCard from "../components/MovieCard.jsx";
import {useEffect, useState} from "react";
import '../css/Home.css';
import {getPopularMovies, searchMovies} from "../services/api.js";

function Home() {

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                setError("Failed to load popular movies");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        if (loading) return;
        setLoading(true);

        try {
            const searchResults = await searchMovies(search);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            setError("Failed to search movies");
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (<div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies" className="search-input" value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>

        {error && <div className="error-message">{error}</div>}

            {loading ? (<div className="loading">Loading...</div>) : (<div className="movies-grid">
                    {movies.map((movie) => movie.title.toLowerCase().startsWith(search.toLowerCase()) &&
                        <MovieCard key={movie.id} movie={movie}/>)}
                </div>)}


        </div>)
}

export default Home;