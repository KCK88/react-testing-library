import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente About', () => {
  test(' exibido na tela um h2 com texto About Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const aboutDex = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(aboutDex).toBeInTheDocument();
  });

  test('', () => {
    renderWithRouter(<App />, { route: '/about' });

    const DexImg = screen.getByRole('img', {
      name: /pokédex/i,
    }) as HTMLImageElement;

    expect(DexImg).toBeInTheDocument();
    expect(DexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
