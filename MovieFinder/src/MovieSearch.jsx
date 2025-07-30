import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MovieSearch = ({ movies, setMovies, searched, setSearched, defaultMovies }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_BASE_URL = 'https://movie-search-app-2xtz.onrender.com';


  const searchMovies = async () => {
    if (!query.trim()) {
      setMovies(defaultMovies);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      
      if (response.data.Response === 'True') {
        const detailedMovies = await Promise.all(
          response.data.Search.map(async (movie) => {
            const details = await axios.get(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
            );
            return details.data;
          })
        );
        setMovies(detailedMovies);
        setSearched(true);
      } else {
        setError(response.data.Error || 'No movies found');
        setMovies([]);
        setSearched(true);
      }
    } catch (err) {
      setError('Failed to fetch movies');
      setMovies([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (movie) => {
    try {
      await axios.post(`${API_BASE_URL}/api/favorites`, {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        genre: movie.Genre
      });
      alert('Added to favorites!');
    } catch (err) {
      console.error('Failed to add favorite:', err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies();
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <TextField
        fullWidth
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }} 
      />
          
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}
      {error && <Typography color="error">{error}</Typography>}
      
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <Card
              className='movie-card'
              sx={{
                height: '100%',
                transition: 'box-shadow 0.3s',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: '-10px 15px 10px rgba(0,0,0,0.2)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
                alt={movie.Title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {movie.Title} ({movie.Year})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.Genre}
                </Typography>
                <Button
                  startIcon={<FavoriteIcon />}
                  onClick={() => addFavorite(movie)}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Add to Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieSearch;