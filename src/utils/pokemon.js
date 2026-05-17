export const FALLBACK_STAT = 'N/A'

export const formatPokemonId = (id) => `#${String(id).padStart(4, '0')}`

export const normalizeSearchValue = (value) => value.trim().toLowerCase()

export const normalizeIdSearchValue = (value) => normalizeSearchValue(value).replace(/^#/, '').replace(/^0+/, '')

export const filterPokemon = (pokemon, searchTerm, selectedType) => {
  let filtered = pokemon;

  if (selectedType && selectedType !== 'all') {
    filtered = filtered.filter((item) =>
      item.types.some((type) => type.toLowerCase() === selectedType.toLowerCase())
    );
  }

  const query = normalizeSearchValue(searchTerm)
  const idQuery = normalizeIdSearchValue(searchTerm)

  if (!query) {
    return filtered
  }

  return filtered.filter((item) => {
    const id = String(item.id)
    const formattedId = formatPokemonId(item.id).toLowerCase()
    const matchesId =
      idQuery.length > 0 &&
      (id.includes(idQuery) || formattedId.includes(query))

    return (
      item.name.toLowerCase().includes(query) ||
      matchesId ||
      item.types.some((type) => type.toLowerCase().includes(query))
    )
  })
}

export const getPokemonStat = (stats = [], statName) =>
  stats.find(({ stat }) => stat?.name === statName)?.base_stat ?? FALLBACK_STAT

export const getPokemonImage = (sprites = {}) =>
  sprites.front_default ??
  sprites.other?.['official-artwork']?.front_default ??
  null

export const normalizePokemonDetail = (detail) => ({
  id: detail.id,
  name: detail.name,
  image: getPokemonImage(detail.sprites),
  types: detail.types?.map(({ type }) => type.name).filter(Boolean) ?? [],
  hp: getPokemonStat(detail.stats, 'hp'),
  attack: getPokemonStat(detail.stats, 'attack'),
  speed: getPokemonStat(detail.stats, 'speed'),
})
