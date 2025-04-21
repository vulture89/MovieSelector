import '../css/Favorites.css';
import {useMovieContext} from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";

function Favourites() {

    const {favourites} = useMovieContext();

    if (favourites) {
        return (
            <div className="favorites">
                <div className="movies-grid">
                    {favourites.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
                </div>
            </div>
        )
    }

    return (<div className="favorites-empty">
        <h2>No Favourite Movies yet</h2>
        <p>Start adding movies to your favourites and they will appear here</p>
    </div>)
}

export default Favourites;