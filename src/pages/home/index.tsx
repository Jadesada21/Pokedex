import React from 'react'
import { useEffect } from 'react'
import { pokemonListServices, } from '../../service/pokemonList'
import { pokemonDetailServices } from '../../service/pokemonDetail'

const HomePage = () => {

    // const callData = async () => {
    //     const data = await pokemonListServices.getPokemonList()
    //     console.log('data', data.data.results) // data. อะไรก็ตามที่มันมีใน db 
    // }

    // useEffect(() => {
    //     callData()
    // }, [])

    const callDataByName = async () => {
        const data = await pokemonDetailServices.getPokemonDetail("ditto")
        console.log('data', data.data)
    }

    useEffect(() => {
        callDataByName()
    }, [])


    return (
        <div>
            HomePage
        </div>
    )
}

export default HomePage;