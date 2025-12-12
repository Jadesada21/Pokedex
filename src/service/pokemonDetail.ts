//! สำหรับการ path fetch by name

import axios from "axios"
import { moduleName } from "../utils/constant"
import type { IPokemonDetailResponse } from '../interface/pokemonDetail'
import { handleResponse, type IResponse } from "../utils/handleResponse"



interface IGetPokemonDetailResponse extends IResponse {
    status: number | undefined,
    data?: IPokemonDetailResponse

}
export const pokemonDetailServices = {
    getPokemonDetail: async (
        name?: string,
    ): Promise<IGetPokemonDetailResponse> => {
        try {
            const res = await axios.get(`${moduleName}pokemon/${name}`)
            return handleResponse.success(res)
        } catch (err: any) {
            return handleResponse.error(err)
        }
    }
}