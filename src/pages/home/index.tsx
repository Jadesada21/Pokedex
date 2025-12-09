import React from 'react'
import { useEffect } from 'react'
import { pokemonListServices } from '../../service/pokemonList'

const HomePage = () => {

    const callData = async () => {
        const data = await pokemonListServices.getPokemonList()
        console.log(`data`, data.data.results) // data. อะไรก็ตามที่มันมีใน db 
    }

    useEffect(() => {
        callData()
    }, [])

    return (
        <div>
            HomePage
        </div>
    )
}

export default HomePage;