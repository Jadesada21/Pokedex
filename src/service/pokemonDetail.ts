//! สำหรับการ path fetch by name

import axios from "axios"
import { moduleName } from "../utils/constant"
import type { IPokemonDetailResponse } from '../interface/pokemonDetail'

interface IGetPokemonDetailResponse {
    status: number | undefined,
    data: IPokemonDetailResponse

}
export const pokemonDetailServices = {
    getPokemonDetail: async (
        name?: string,
    ): Promise<IGetPokemonDetailResponse> => {
        const res = await axios.get(`${moduleName}pokemon/${name}`)
        return res
    }
}