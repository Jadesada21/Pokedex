import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { pokemonDetailServices } from '../../service';
import type { IPokemonDetailResponse } from '../../interface/pokemonDetail';
import PokemonCard from '../../component/pokemoncard';

type pokemonType = {
    data: IPokemonDetailResponse | undefined
    loading: boolean
    error: null | any
}

const DetailPage = () => {

    const { name } = useParams()

    const [pokemon, setPokemon] = useState<pokemonType>({ data: undefined, loading: true, error: null })


    const callDataByName = async (name: string) => {
        const res = await pokemonDetailServices.getPokemonDetail(name)
        if (res.status === 200) {
            if (res.data)

                setPokemon({
                    data: {
                        ...res.data, image:
                            res.data.sprites.other['official-artwork'].front_default ||
                            res.data.sprites.other.dream_world.front_default
                    },
                    loading: false,
                    error: null
                })
        } else {
            setPokemon({
                data: undefined,
                loading: false,
                error: res.error
            })
        }
    }

    useEffect(() => {
        if (name) callDataByName(name)
    }, [name])




    return (
        <div className="w-[90%] m-auto max-w-[1100px]">
            <div className="flex justify-center">
                <img src="/logo.webp" className="max-h-[80px] mt-[20px]" alt="logo" />
            </div>

            <div className="flex justify-center w-[90%] max-w-[600px] m-auto pt-10">
                {pokemon.data && (
                    <div className="rounded-[20px] overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700 p-4 ">
                        <div className="bg-center aspect-square w-full bg-cover rounded-[20px] relative h-[400px]">

                            <img
                                className=" absolute h-auto max-h-[400px] aspect-square translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
                                src="/pokemon_bg.png"
                                alt=""
                            />
                            <img
                                className="absolute rounded-t-lg p-10 h-[50%] sm:h-[250px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
                                src={pokemon.data.image}
                                alt=""
                            />
                        </div>

                        <div className="p-3 text-center">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xl font-bold text-white/90 capitalize">
                                    {pokemon.data.name}
                                </h4>
                                <p
                                    className="font-bold text-xl text-white/70 ">
                                    #{pokemon.data.id}
                                </p>
                            </div>

                            <div className="flex gap-2 pt-2 ">
                                {pokemon.data.types.map((item) => {
                                    return <p className={`badge-type-${item.type.name} rounded-2xl px-2 capitalize `}>{item.type.name}</p>
                                })}
                            </div>
                        </div>
                    </div >
                )}
            </div>
        </div>
    )
}

export default DetailPage;

