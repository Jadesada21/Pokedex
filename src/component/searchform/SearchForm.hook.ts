import { useEffect } from 'react'
import { pokemonDetailServices, pokemonListServices } from '../../service'
import { useForm } from 'react-hook-form';
import { usePokemonListStore } from '../../store/pokemonList'

const useSearchForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // ใช้สำหรับเก็บค่าที่พิมในช่อง search
    const keyword = watch('keyword')

    // usePokemonListStore ใช้ hook จาก zustandเพื่อดึงข้อมูลและฟังชั่นจาก store
    // setFetchPokemonList: ใช้ในการอัปเดตสถานะการดึงข้อมูล Pokemon API
    // fetchPokemon: เก็บข้อมูล Pokemon ทั้งหมดที่ได้จาก API
    // setPokemonList: ใช้ในการอัปเดตข้อมูลที่แสดงใน UI ตาม keyword
    const { setFetchPokemonList, fetchPokemon, setPokemonList } = usePokemonListStore()

    const callDataByName = async () => {
        // ดึงข้อมูลรายการ Pokemon ทั้งหมดจาก API
        const resList = await pokemonListServices.getPokemonList()


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
                pokeList.push({
                    ...pokeData,
                    image: pokeData.sprites.other['official-artwork'].front_default
                        ||
                        pokeData.sprites.other.dream_world.front_default
                })
                // เก็บข้อมูล Pokemon ที่ได้ใน pokeList

            } // อัปเดตสถานะหลังจากดึงข้อมูลทั้งหมดเสร็จสิ้น
            setFetchPokemonList({ data: pokeList, loading: false, error: null })

        } else {
            // ถ้าการดึงข้อมูลล้มเหลว อัปเดตสถานะพร้อมข้อผิดพลาด
            setFetchPokemonList({ data: [], loading: false, error: resList.error || null, })
        }
    }

    // ดึงข้อมูลครั้งแรกเมื่อคอมโพเนนต์โหลด
    useEffect(() => {
        callDataByName()
    }, [])


    // ค้นหาข้อมูล Pokemon ตามคำค้นในช่อง search เมื่อ 'keyword' มีการเปลี่ยนแปลง
    useEffect(() => {
        // กรองข้อมูล Pokemon ที่ชื่อมีคำค้นจากช่อง search
        const data = fetchPokemon.data.filter((item) => item.name.toLowerCase().includes(keyword?.toLowerCase()))

        // อัปเดตสถานะการแสดงข้อมูลที่กรองแล้ว

        setPokemonList({ data: data, loading: false, error: null, })
    }, [keyword])


    return {
        fieldKeyword: register('keyword')
    }
}

export { useSearchForm }