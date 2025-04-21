import {createContext, useContext, useEffect, useState} from "react";


const movieContext = createContext();

export const useMovieContext = () => {
    useContext(movieContext)
};

export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites");

        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites])

    const addToFavourites = (movie) => {
        setFavourites([...favourites, movie]);
    }

    const removeFromFavourites = (movie) => {
        setFavourites(favourites.filter(fav => fav.id !== movie.id));
    }

    const isFavourite = (movie) => {
        return favourites.some(fav => fav.id === movie.id);
    }

    const value = {
        favourites, addToFavourites, removeFromFavourites, isFavourite
    }

    return <MovieContext.provider value={value}>
        {children}
    </MovieContext.provider>
}