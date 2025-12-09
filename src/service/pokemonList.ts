import axios from "axios"
import { moduleName } from "../utils/constant"
import type { IPokemonListResponse } from '../interface/pokemonList'

interface IGetPokemonListResponse {
    status: number | undefined,
    data: IPokemonListResponse

}
export const pokemonListServices = {
    getPokemonList: async (
        limit?: number,
        offset?: number
    ): Promise<IGetPokemonListResponse> => {
        const res = await axios.get(
            (`${moduleName}/pokemon?limit=${limit || 151}&offset=${offset || 0}`)
        )
        return res
    }
}