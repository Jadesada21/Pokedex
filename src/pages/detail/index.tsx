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
                <Link to={"/"}><img src="/logo.webp" className="max-h-[80px] mt-[20px]" alt="logo" /></Link>
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

                        <div className="p-3 dark:bg-gray-500 mt-5">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xl font-bold text-white/90 capitalize">
                                    {pokemon.data.name}
                                </h4>
                                <p
                                    className="font-bold text-xl text-white/70 ">
                                    #{pokemon.data.id}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4 ">
                                {pokemon.data.types.map((item) => {
                                    return <p className={`badge-type-${item.type.name} rounded-2xl px-2 capitalize `}>{item.type.name}</p>
                                })}
                            </div>

                            <div className="grid grid-cols-1 mt-5 sm:grid-cols-2">
                                <div className="flex gap-x-2.5 justify-start sm:justify-center">
                                    <div className="">Weight</div>
                                    {pokemon.data.weight} KG.
                                </div>
                                <div className="flex gap-x-2.5 justify-start sm:justify-center">
                                    <div>Height</div>
                                    {pokemon.data.height} M.
                                </div>


                                <div className="pt-5">
                                    <h5 className="pb-2">Abilities</h5>
                                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
                                        {pokemon.data.abilities.map((item) => {
                                            return (
                                                < div
                                                    className={`badge-type-`
                                                    }
                                                >
                                                    {item.ability.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className=" pt-5">
                                    <h5 className="pb-2">State</h5>
                                    <div className="grid grid-cols-1 gap-1">
                                        {pokemon.data.stats.map((item) => {
                                            return (
                                                <div className="flex justify-between">
                                                    < div className="">
                                                        {item.stat.name} :
                                                    </div>
                                                    <div className="">
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

