import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente NotFound', () => {
  test('Verifica se a página contém um h2 com o texto "Page requested not found."', () => {
    renderWithRouter(<App />, { route: '/NotFound' });
    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Verifica se a página contém um h2 com o texto "Page requested not found."', () => {
    renderWithRouter(<App />, { route: '/NotFound' });
    const notFoundImage = screen.getByRole('img', {
      name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
    }) as HTMLImageElement;

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.alt).toBe('Clefairy pushing buttons randomly with text I have no idea what i\'m doing');
  });
});
