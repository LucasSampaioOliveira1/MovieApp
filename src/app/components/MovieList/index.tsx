'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie'
import ReactLoading from 'react-loading';

export default function MoviesList() {
    const [movies, setMovies] = useState<Movie[]>([]);

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
      await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'fa72905e47cb63d7eff24d781387d94d',
                language: 'pt-br'
            }
        }).then(response => {
            setMovies(response.data.results)
        });

        setLoading(false);
    }


    if(isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (
        <ul className="movie-list">
            {movies.map((movie) => 
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    )
}