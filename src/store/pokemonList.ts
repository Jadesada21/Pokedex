import { create } from 'zustand'
import type { IPokemonDetailResponse } from '../interface/pokemonDetail'

//* ค่าเริ่มต้นของ store มี 
//* data: []
//* loading: false ไม่โหลด / true โหลด
//* error: null ข้อผิดพลาดตอนโหลด null = ไม่มีข้อผิดพลาด
const initStore = {
    pokemon: {
        data: [],
        loading: false,
        error: null
    },

    //* เก็บข้อมูลและสถานะของกการดึงข้อมูลจาก API
    //* data: [] array เก็บข้อมูล pokemon ที่ดึงมา
    //* loading: false ไม่โหลด / true โหลด
    //* erroe: null ข้อผิดพลาดตอนโหลด null = ไม่มีข้อผิดพลาด
    fetchPokemon: {
        data: [],
        loading: false,
        error: null
    },
}

//* type ของ data
//* data: ข้อมูล pokemon ที่ดึงมาจาก API
//* loading: สถานะการโหลดข้อมูล ถ้า true โหลด / false ไม่โหลด
//* error: ข้อผิดพลาดตอนโหลดข้อมูล ถ้าไม่มี null
type pokemonType = {
    data: IPokemonDetailResponse[]
    loading: boolean
    error: null | any
}


//* type ของ usePokemon
//* pokemon / fetchpokemon ทั้งคู่ type จะเท่ากับ pokemonType ด้านบน
type UsePokemonListStoreType = {
    pokemon: pokemonType
    fetchPokemon: pokemonType
    setPokemonList: (value: pokemonType) => void
    setFetchPokemonList: (value: pokemonType) => void
    clearPokemon: () => void
}



export const usePokemonListStore = create<UsePokemonListStoreType>((set) => ({
    // ใช้ค่าเริ่มต้นจาก initStore
    ...initStore,

    // อัพเดทข้อมูล Pokemon
    setPokemonList: (value: pokemonType) => set({ pokemon: value }),

    // อัพสถานะการดึงข้อมูล pokemon
    setFetchPokemonList: (value: pokemonType) => set({ fetchPokemon: value }),

    // รีเซ็ตข้อมูลทั้งหมด
    clearPokemon: () => set({ ...initStore }),
}))

