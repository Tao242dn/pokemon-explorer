# Pokemon Explorer

Pokemon Explorer is a React and Vite app for browsing Pokemon from
[PokeAPI](https://pokeapi.co/), filtering the visible results, and adding
Pokemon to a local shopping cart experience.

The app is client-side only. Pokemon data comes from PokeAPI at runtime, while
theme, demo users, and the active login session are stored in the browser with
`localStorage`.

## Video Demo
https://youtu.be/3vgI-g8_J1A

## Features

- Browse Pokemon in paginated batches of 100 records.
- Search the current page by Pokemon name, numeric id, formatted id, or type.
- Filter the current page by Pokemon type.
- Persist `page`, `search`, and `type` state in the URL query string.
- Show loading skeletons, partial detail-load warnings, and retryable error
  states.
- Display Pokemon cards with image, id, types, HP, attack, speed, and stock.
- Add Pokemon to a shopping cart with quantity controls and item limits.
- Require demo login before viewing cart contents.
- Persist the selected light or dark theme.
- Use responsive Tailwind CSS layouts and Font Awesome icons.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

Run linting:

```bash
pnpm lint
```

## Demo Login

The app seeds two local demo users in `localStorage`:

| Email | Password |
| --- | --- |
| `ash@poke.test` | `pikachu123` |
| `misty@poke.test` | `starmie123` |

Logging in stores a lightweight session under `poke-explore-session`. Logging
out removes that session.

## URL State

The app keeps the main browser controls shareable with query parameters:

| Parameter | Example | Purpose |
| --- | --- | --- |
| `page` | `?page=3` | Selected Pokemon page. |
| `search` | `?search=25` | Current search input. |
| `type` | `?type=electric` | Current type filter. |

Default values are removed from the URL automatically.

## Project Structure

```text
src/
  api/
    pokemon.js          PokeAPI list and detail fetchers
  components/
    Header.jsx          Top-level controls and account/cart actions
    PokemonResults.jsx  Loading, error, empty, and result states
    PokemonCard.jsx     Individual Pokemon display card
    ShoppingCart.jsx    Cart modal composition
    LoginModal.jsx      Demo login form
  constants/
    cart.js             Cart stock and quantity limits
    classNames.js       Shared Tailwind button styles
    pagination.js       Page size and page count constants
    pokemonTypes.js     Type labels mapped to Tailwind badge styles
  hooks/
    useAuth.js          Demo auth/session state
    useCart.js          Cart state and notifications
    usePokemon.js       Page-based Pokemon loading lifecycle
    useTheme.js         Light/dark theme persistence
    useUrlState.js      Query-string backed React state
  utils/
    auth.js             localStorage user/session helpers
    pokemon.js          Pokemon normalization, formatting, and filtering
    string.js           Shared string helpers
```

## Data Flow

1. `App.jsx` reads URL-backed page, search, and type state.
2. `usePokemon(page)` requests one page of Pokemon summaries from PokeAPI.
3. `fetchPokemonList` loads each Pokemon detail record in parallel with
   `Promise.allSettled`.
4. `normalizePokemonDetail` reduces PokeAPI responses to the fields used by the
   UI: id, name, image, types, HP, attack, and speed.
5. `filterPokemon` applies the search and type filters to the current page.
6. `PokemonResults` renders loading, error, empty, or card-grid states.
7. Cart actions are handled in `useCart` and passed down to card and modal
   components.

## PokeAPI Pagination

Pagination constants live in `src/constants/pagination.js`:

- `POKEMON_PAGE_SIZE`: `100`
- `POKEMON_TOTAL_ITEMS`: `1000`
- `POKEMON_TOTAL_PAGES`: `10`

## Browser Storage

The app writes these keys to `localStorage`:

| Key | Owner | Contents |
| --- | --- | --- |
| `poke-explore-theme` | `useTheme` | Current `light` or `dark` theme. |
| `poke-explore-users` | `utils/auth.js` | Seeded demo users. |
| `poke-explore-session` | `utils/auth.js` | Current logged-in user session. |
| `poke-explore-cart` | `useCart` | Current items added to the shopping cart. |
