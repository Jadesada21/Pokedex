//! สำหรับการ path fetch db list & key of db

import axios from "axios"
import { moduleName } from "../utils/constant"
import type { IPokemonListResponse } from '../interface/pokemonList'
import { handleResponse, type IResponse } from "../utils/handleResponse"

interface IGetPokemonListResponse extends IResponse {
    status: number | undefined,
    data?: IPokemonListResponse

}
export const pokemonListServices = {
    getPokemonList: async (
        limit?: number,
        offset?: number
    ): Promise<IGetPokemonListResponse> => {
        try {
            const res = await axios.get(
                (`${moduleName}/pokemon?limit=${limit || 151}&offset=${offset || 0}`)
            )
            return handleResponse.success(res)
        } catch (err: any) {
            return handleResponse.error(err)
        }


    }
}

