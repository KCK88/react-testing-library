import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente App', () => {
  test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const navHome = screen.getByRole('link', {
      name: /home/i,
    });
    const navAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const navFavmon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(navHome).toBeInTheDocument();
    expect(navAbout).toBeInTheDocument();
    expect(navFavmon).toBeInTheDocument();
  });
  test('Redireciona para a página inicial ao clicar no link Home', async () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  test('Redireciona para a página de About ao clicar no link About', async () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    await waitFor(() => expect(window.location.pathname).toBe('/about'));
  });

  test('Redireciona para a página de Pokémon Favoritados ao clicar no link Favorite Pokémon', async () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémon/i));
    await waitFor(() => expect(window.location.pathname).toBe('/favorites'));
  });

  test('Redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    renderWithRouter(<App />, { route: '/unknown' });

    waitFor(() => expect(window.location.pathname).toBe('/not-found'));
  });
});
