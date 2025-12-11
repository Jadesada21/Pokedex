import type { IPokemonDetailResponse } from "../../interface/pokemonDetail"


interface PokemonCardProps {
    data: IPokemonDetailResponse
}

const PokemonCard = ({ data }: PokemonCardProps) => {

    return (

        <div className="max-w-sm shadow-sm rounded-[20px] overflow-hidden shadoww dark:bg-[#253641] dark:border-gray-700 p-2">
            <div className="bg-[url('./poke-card-bg.png')] bg-center aspect-square w-full bg-cover rounded-[20px] ">
                <a href="" className="overflow-hidden h-60">
                    <img
                        className="object-cover "
                        src={data.image}
                        alt="" />
                </a>
            </div>

            <div className="p-3 text-center">
                <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-white/90 capitalize">
                        {data.name}
                    </h4>
                    <p
                        className="font-bold text-xl text-white/70 ">
                        #{data.id}
                    </p>
                </div>

                <div className="flex gap-2 pt-2 ">
                    {data.types.map((item) => {
                        return <p className={`badge-type-${item.type.name} rounded-2xl px-2 capitalize `}>{item.type.name}</p>
                    })}
                </div>


            </div>
        </div >
    )
}

export default PokemonCard