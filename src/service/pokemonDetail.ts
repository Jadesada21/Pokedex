import axios from "axios"
import { moduleName } from "../utils/constant"
import type { IPokemonDetailResponse } from '../interface/pokemonDetail'

interface IGetPokemonDetailResponse {
    status: number | undefined,
    data: IPokemonDetailResponse

}
export const pokemonDetailServices = {
    getPokemonDetail: async (
        limit?: number,
        offset?: number
    ): Promise<IGetPokemonDetailResponse> => {
        const res = await axios.get(
            (`${moduleName}/pokemon?limit=${limit || 151}&offset=${offset || 0}`)
        )
        return res
    }
}