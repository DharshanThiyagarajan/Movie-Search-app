import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('https://movie-search-app-2xtz.onrender.com/api/favorites');
      setFavorites(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
      setError('Failed to load favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (imdbID) => {
    try {
      await axios.delete(`https://movie-search-app-2xtz.onrender.com/api/favorites/${imdbID}`);
      setFavorites(favorites.filter(movie => movie.imdbID !== imdbID));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      setError('Failed to remove favorite. Please try again.');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Your Favorite Movies
      </Typography>
      
      {favorites.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No favorites yet. Search and add some!
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.poster !== 'N/A' ? movie.poster : '/no-poster.jpg'}
                  alt={movie.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {movie.year} • {movie.genre}
                  </Typography>
                  <Button
                    startIcon={<FavoriteIcon />}
                    onClick={() => removeFavorite(movie.imdbID)}
                    sx={{ 
                      mt: 2,
                      backgroundColor: '#ff1744',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d50000'
                      }
                    }}
                    fullWidth
                  >
                    Remove Favorite
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;