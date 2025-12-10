import { useEffect } from 'react'
import { pokemonListServices, pokemonDetailServices } from '../../service'
import SearchForm from '../../component/searchform/'
import { usePokemonListStore } from '../../store/pokemonList'


const HomePage = () => {

    //! สำหรับดึงข้อมูลที่ได้จาก getPokemonList มาแสดงในหน้า homepage
    // const callData = async () => {
    //     const data = await pokemonListServices.getPokemonList()
    //     console.log('data', data.data.results) // data. อะไรก็ตามที่มันมีใน db 
    // }

    // useEffect(() => {
    //     callData()
    // }, [])


    //! สำหรับดึงข้อมูลที่ได้จาก getPokemonDetail มาแสดงในหน้า homepage
    // const callDataByName = async () => {
    //     const data = await pokemonDetailServices.getPokemonDetail("ditto")
    //     console.log('data', data.data)
    // }

    // useEffect(() => {
    //     callDataByName()
    // }, [])

    const { pokemon } = usePokemonListStore()


    return (
        <div className="w-[90%] m-auto max-w-[1100px]">
            <div className="flex justify-center">
                <img src="/logo.webp" className="max-h-[80px] mt-[20px]" alt="logo" />
            </div>

            <SearchForm />

            <div>
                {pokemon.data?.map((item) => {
                    return <div className="text-gray-300"
                        key={`pokemon-${item.id}`}
                    >
                        {item.name}</div>
                })}
            </div>
        </div>

    )
}

export default HomePage;