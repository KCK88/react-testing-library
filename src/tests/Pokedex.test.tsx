import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente <Pokedex', () => {
  test('Verifica se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);

    const encountered = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(encountered).toBeInTheDocument();
  });

  test('Verifica se a página contém um botão com o texto "Próximo Pokémon".', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verifica se os botões de filtragem por tipo têm o nome correto', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByText(/all/i);
    const electricButton = screen.getByRole('button', {
      name: /electric/i,
    });
    within(electricButton).getByText(/electric/i);

    const fireButton = screen.getByText(/fire/i);
    const bugButton = screen.getByText(/bug/i);
    const poisonButton = screen.getByText(/poison/i);
    const psychicButton = screen.getByText(/psychic/i);
    const dragonButton = screen.getByText(/dragon/i);
    const normalButton = screen.getByRole('button', {
      name: /normal/i,
    });

    within(normalButton).getByText(/normal/i);
    const allButons = allButton
      && electricButton
      && fireButton
      && bugButton
      && psychicButton
      && normalButton
      && dragonButton
      && poisonButton;

    expect(allButons).toBeInTheDocument();
    expect(allButons).toHaveAttribute('data-testid', 'pokemon-type-button');
  });

  test('Verifica se os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    await userEvent.click(nextPokemon);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    await userEvent.click(nextPokemon);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });

  test('Verifica se o primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista.', async () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const fireType = screen.getByRole('button', {
      name: /fire/i,
    });
    await userEvent.click(fireType);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    await userEvent.click(nextPokemon);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    await userEvent.click(nextPokemon);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
});
