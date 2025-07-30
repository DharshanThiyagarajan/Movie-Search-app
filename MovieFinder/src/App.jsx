import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import MovieSearch from './MovieSearch';
import Favorites from './Favorites';

function App() {
  // Default movies to show before any search
  const defaultMovies = [
    {
      imdbID: "tt2180339",
      Title: "Billa",
      Year: "2009",
      Poster: "https://images-na.ssl-images-amazon.com/images/I/81spQukSc5L._RI_.jpg",
      Genre: "Action, Crime"
    },
    {
      imdbID: "tt0241527",
      Title: "Harry Potter and the Sorcerer's Stone",
      Year: "2001",
      Poster: "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
      Genre: "Adventure, Family, Fantasy"
    },
    {
      imdbID: "tt7286456",
      Title: "Joker",
      Year: "2019",
      Poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
      Genre: "Crime, Drama, Thriller"
    },
    {
      imdbID: "tt2911666",
      Title: "John Wick",
      Year: "2014",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg",
      Genre: "Action, Crime, Thriller"
    },
    {
      imdbID: "tt1464335",
      Title: "Uncharted",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_SX300.jpg",
      Genre: "Action, Adventure"
    },
    {
      imdbID: "tt0848228",
      Title: "The Avengers",
      Year: "2012",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      Genre: "Action, Adventure, Sci-Fi"
    },
    {
      imdbID: "tt0848228",
      Title: "Deadpool",
      Year: "2016",
      Poster: "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      Genre: "Action, Adventure, Sci-Fi"
    },
    {
      imdbID: "tt2180339",
      Title: "Thuppaki",
      Year: "2012",
      Poster: "https://static.moviecrow.com/marquee/first-look-of-vijay-and-ar-murugadoss-thuppakki/3289_thumb_665.jpg",
      Genre: "Action, Thriller"
    }
  ];

  const [movies, setMovies] = useState(defaultMovies);
  const [searched, setSearched] = useState(false);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <h1 style={{ flexGrow: 1 }}>FILM VAULT</h1>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            className="nav-btn"
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              backgroundColor: '#1976d2',
              marginRight: 2,
              transition: 'background 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: '#1565c0',
                color: '#00ffb7ff',
              },
            }}
          >
            Search
          </Button>
          <Button
            className="nav-btn"
            component={Link}
            to="/favorites"
            sx={{
              color: '#fff',
              backgroundColor: '#1976d2',
              transition: 'background 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: '#1565c0',
                color: '#00ffb7ff',
              },
            }}
          >
            Favorites
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Routes>
          <Route
            path="/"
            element={
              <MovieSearch
                movies={movies}
                setMovies={setMovies}
                searched={searched}
                setSearched={setSearched}
                defaultMovies={defaultMovies}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;