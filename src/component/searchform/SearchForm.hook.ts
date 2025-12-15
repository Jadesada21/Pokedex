import { useEffect } from 'react'
import { pokemonDetailServices, pokemonListServices } from '../../service'
import { useForm } from 'react-hook-form';
import { usePokemonListStore } from '../../store/pokemonList'
import { generationList } from '../../utils/optionList';
import type { IPokemonDetailResponse } from '../../interface/pokemonDetail';

const useSearchForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // ใช้สำหรับเก็บค่าที่พิมในช่อง search
    const keyword = watch('keyword')
    const generation = watch('generation')
    const type = watch('type')
    const sort = watch('sort')


    // usePokemonListStore ใช้ hook จาก zustandเพื่อดึงข้อมูลและฟังชั่นจาก store
    // setFetchPokemonList: ใช้ในการอัปเดตสถานะการดึงข้อมูล Pokemon API
    // fetchPokemon: เก็บข้อมูล Pokemon ทั้งหมดที่ได้จาก API
    // setPokemonList: ใช้ในการอัปเดตข้อมูลที่แสดงใน UI ตาม keyword
    const { setFetchPokemonList, fetchPokemon, setPokemonList } = usePokemonListStore()

    const callDataByName = async (filter: {
        name: string;
        limit: number;
        offset: number;
    }) => {
        // ดึงข้อมูลรายการ Pokemon ทั้งหมดจาก API
        const resList = await pokemonListServices.getPokemonList(filter.limit, filter.offset)


        // เริ่มต้นการเก็บข้อมูล Pokemon ที่ได้จากการดึงข้อมูล
        const pokeList = []
        setFetchPokemonList({ data: [], loading: true, error: null })


        // ถ้าการดึงข้อมูลสำเร็จ (status 200) จะเริ่มทำงาน
        if (resList.status === 200) {
            const resResults = resList.data?.results || []


            // ลูปผ่าน Pokemon แต่ละตัวในรายการ แล้วดึงรายละเอียดของแต่ละตัว
            for (const pokemon of resResults) {
                // ดึงข้อมูลรายละเอียดของ Pokemon โดยใช้ชื่อจากแต่ละตัว
                const res = await pokemonDetailServices.getPokemonDetail(pokemon.name)

                const pokeData = res.data
                if (pokeData)
                    pokeList.push({
                        ...pokeData,
                        image:
                            pokeData.sprites.other['official-artwork'].front_default ||
                            pokeData.sprites.other.dream_world.front_default
                    })
                // เก็บข้อมูล Pokemon ที่ได้ใน pokeList

            } // อัปเดตสถานะหลังจากดึงข้อมูลทั้งหมดเสร็จสิ้น
            setFetchPokemonList({ data: pokeList, loading: false, error: null })
            const data = filterPokemon(pokeList, keyword, type, sort)
            setPokemonList({ data: data, loading: false, error: null })

        } else {
            // ถ้าการดึงข้อมูลล้มเหลว อัปเดตสถานะพร้อมข้อผิดพลาด
            setFetchPokemonList({ data: [], loading: false, error: resList.error || null, })
        }
    }

    const filterPokemon = (
        pokeList: IPokemonDetailResponse[],
        keyword: string,
        type: string,
        sort: "id" | "name") => {

        const keywordFilter = pokeList.filter((item) =>
            item.name.toLowerCase().includes(keyword?.toLowerCase())
        )
        const typeFilter = type !== 'all types' ? keywordFilter.filter((item) =>
            item.types.find((f) =>
                f.type.name.toLowerCase().includes(type.toLowerCase())
            )
        )
            : keywordFilter


        return sortBy(typeFilter, sort)
    }

    const sortBy = (data: IPokemonDetailResponse[], type: "id" | "name") => {
        switch (type) {
            case 'id':
                return data.sort((a, b) => a.id - b.id)
            case 'name':
                return data.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
            default:
                return data.sort((a, b) => a.id - b.id)
        }
    }

    // ดึงข้อมูลครั้งแรกเมื่อคอมโพเนนต์โหลด
    useEffect(() => {
        if (generation !== undefined) {
            callDataByName(generationList[generation])
        }
    }, [generation])



    useEffect(() => {
        const data = filterPokemon(fetchPokemon.data, keyword, type, sort)

        setPokemonList({
            data: data,
            loading: false,
            error: null,
        })
    }, [keyword, type, sort])


    return {
        fieldKeyword: register('keyword'),
        fieldGeneration: register('generation'),
        fieldType: register('type'),
        fieldSort: register('sort')
    }
}

export { useSearchForm }