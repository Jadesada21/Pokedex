import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
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
            console.log(res)
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
        <div className="w-[90%] m-auto max-w-[1100px] pb-10">
            <div className="flex justify-center">
                <Link to={"/"}><img src="/logo.png" className="h-[200px] mt-5" alt="logo" /></Link>
            </div>

            <div className="flex justify-center w-[90%] max-w-[600px] m-auto pt-5">
                {pokemon.data && (
                    <div className="rounded-[20px] overflow-hidden shadow p-4 ">
                        <div className="bg-center aspect-square w-full bg-cover rounded-[20px] relative h-[400px]">

                            <img
                                className=" absolute h-auto max-h-[400px] aspect-square translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] opacity-70"
                                src="/pokemon_bg.png"
                                alt=""
                            />
                            <img
                                className="absolute rounded-t-lg p-10 h-[50%] sm:h-[300px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
                                src={pokemon.data.image}
                                alt=""
                            />
                        </div>

                        <div className="p-3 dark:bg-gray-500 mt-5 rounded-2xl opacity-90">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xl font-bold text-white capitalize">
                                    {pokemon.data.name}
                                </h4>
                                <p
                                    className="font-bold text-xl text-white/70 ">
                                    #{pokemon.data.id}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4 ">
                                {pokemon.data.types.map((item) => {
                                    return <p className={`badge-type-${item.type.name} rounded-2xl px-2 capitalize font-bold`}>{item.type.name}</p>
                                })}
                            </div>

                            <div className="grid grid-cols-1 mt-5 sm:grid-cols-2">
                                <div className="flex gap-x-2.5 justify-start sm:justify-center">
                                    <div className="font-bold text-white">Weight</div>
                                    <div className="font-bold">
                                        {pokemon.data.weight} KG.
                                    </div>
                                </div>
                                <div className="flex gap-x-2.5 justify-start sm:justify-center">
                                    <div className="font-bold text-white">Height</div>
                                    <div className="font-bold">
                                        {pokemon.data.height} M.
                                    </div>

                                </div>


                                <div className="pt-5">
                                    <h5 className="pb-2 text-white font-bold">Abilities</h5>
                                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
                                        {pokemon.data.abilities.map((item) => {
                                            return (
                                                < div
                                                    className="bg-[#59a9c8] mr-5 rounded-2xl pl-2 capitalize font-bold"

                                                >
                                                    {item.ability.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className=" pt-5">
                                    <h5 className="pb-2 text-white font-bold">State</h5>
                                    <div className="grid grid-cols-1 gap-1">
                                        {pokemon.data.stats.map((item) => {
                                            return (
                                                <div className="flex justify-between">
                                                    < div className="font-bold capitalize">
                                                        {item.stat.name} :
                                                    </div>
                                                    <div className={
                                                        item.base_stat <= 20 ? "font-bold text-green-800" :
                                                            item.base_stat <= 40 ? "font-bold text-sky-800" :
                                                                item.base_stat <= 60 ? "font-bold text-red-700" :
                                                                    item.base_stat <= 80 ? "font-bold text-blue-800" :
                                                                        item.base_stat <= 100 ? "font-bold text-purple-800 " :
                                                                            "font-bold text-amber-500"
                                                    }
                                                    >
                                                        {item.base_stat}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )}
            </div>
        </div >
    )
}

export default DetailPage;

