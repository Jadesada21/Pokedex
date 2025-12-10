import { create } from 'zustand'
import type { IPokemonDetailResponse } from '../interface/pokemonDetail'


const initStore = {
    pokemon: {
        data: [],
        loading: false,
        error: null
    }
}


const usePokemonListStore = create((set) => ({
    ...initStore
}))

