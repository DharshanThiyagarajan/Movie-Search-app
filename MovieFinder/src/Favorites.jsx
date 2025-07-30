import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('/api/favorites');
      setFavorites(response.data);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      
      {favorites.length === 0 ? (
        <Typography>No favorites yet. Search and add some !!!</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '10px 15px 15px rgba(0,0,0,0.35)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.poster !== 'N/A' ? movie.poster : '/no-poster.jpg'}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {movie.title} ({movie.year})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.genre}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorites;