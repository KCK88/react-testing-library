import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemon } from '../pages';
import pokemons from '../data';

describe('Testando componente FavoritePokemon', () => {
  test('Verifica se é exibida a mensagem "No favorite pokemon found" caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });

    const noFavorite = screen.getByText(/no favorite pokémon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('Verifica se é exibido apenas os Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemons } />);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
