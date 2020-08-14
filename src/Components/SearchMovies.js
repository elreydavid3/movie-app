import React, {useState} from 'react'
import MovieCard from './MovieCard';

const SearchMovies = () => {

    const[query,setQuery] = useState('');
    const[movies, setMovies] = useState([])

    const handleChange = (event) => {
        const {value} = event.target
        setQuery(value) 
    }

    const searchMovies = async (e) => { 
        e.preventDefault();
        console.log("submitting");
    
        const url = `https://api.themoviedb.org/3/search/movie?api_key=d562070dbd2e1d05b8ed14d423addfe4&language=en-US&query=${query}&page=1&include_adult=false`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results)
        }catch(err){
            console.log(err);
        }
    }


    return(
        <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">
                Movie Name
            </label>
            <input 
                className="input"
                type="text" 
                name="query" 
                placeholder="i.e Jurassic Park" 
                value={query}
                onChange={handleChange} 
            />

            <button className="button" type="submit">Search</button>
        </form>
       
        <div className="card-list">
            {movies.filter(movie => movie.poster_path).map(movie => (
               <MovieCard movie={movie}/>
            ))}
        </div>
        </>
    )
}



export default SearchMovies