import { Atom } from 'react-loading-indicators'
import PokemonCard from '../../component/pokemoncard'
import SearchForm from '../../component/searchform/'
import { usePokemonListStore } from '../../store/pokemonList'




const HomePage = () => {


    const { pokemon, fetchPokemon } = usePokemonListStore()
    console.log(pokemon)

    return (
        <div className="w-[90%] m-auto max-w-[1100px]">
            <div className="flex justify-center">
                <img src="/logo.webp" className="max-h-[80px] mt-[20px]" alt="logo" />
            </div>

            <SearchForm />


            {fetchPokemon.loading && (
                <div className="flex justify-center h-[525px] items-center">
                    <Atom color={["#d800ff", "#ff5800", "#27ff00", "#00a7ff"]}
                        size="medium" text="" textColor="" />
                </div>
            )}

            {!fetchPokemon.loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-8 pb-10">
                    {pokemon.data?.map((item) => {
                        return <PokemonCard
                            image={item.image || ''}
                            name={item.name}
                            id={item.id}
                            types={item.types}
                        />
                    })}
                </div>
            )}

        </div>

    )
}

export default HomePage;