import type { Type } from "../../interface/pokemonDetail"
import { Link } from 'react-router-dom'


interface PokemonCardProps {
    image: string
    name: string
    id: number
    types: Type[]
}

const PokemonCard = ({ image, name, id, types }: PokemonCardProps) => {

    return (

        <div className="max-w-sm shadow-sm rounded-[20px] overflow-hidden shadoww dark:bg-[#253641] dark:border-gray-700 p-2">
            <div className="bg-[url('./poke-card-bg.png')] bg-center aspect-square w-full bg-cover rounded-[20px] ">
                <Link to={`/detail/${name}`} className="overflow-hidden h-60">
                    <img
                        className="object-cover "
                        src={image}
                        alt="" />
                </Link>
            </div>

            <div className="p-3 text-center">
                <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-white/90 capitalize">
                        {name}
                    </h4>
                    <p
                        className="font-bold text-xl text-white/70 ">
                        #{id}
                    </p>
                </div>

                <div className="flex gap-2 pt-2 ">
                    {types.map((item) => {
                        return <p className={`badge-type-${item.type.name} rounded-2xl px-2 capitalize `}>{item.type.name}</p>
                    })}
                </div>


            </div>
        </div >
    )
}

export default PokemonCard