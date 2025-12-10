
import { generationList, typesList, sortList } from '../../utils/optionList'
import { useSearchForm } from './SearchForm.hook'


const SearchForm = () => {
    const { fieldKeyword } = useSearchForm()

    return (
        <div className="grid grid-cols-4 gap-10">

            {/* Generation */}
            <div>
                <label
                    htmlFor="generation"
                    className="block mb-2.5 text-mb font-medium text-heading text-white"
                >
                    Generation
                </label>
                <select
                    id="generation"
                    className=" capitalize text-white bg-[#253641] w-full p-2.5 block rounded border border-gray-300 focus:ring-[#375EAA] focus:border-[#375EAA]"
                >
                    {generationList.map((item, index) => {
                        return <option key={`generation-key-${index}`} value={index}>{item.name}</option>
                    })}
                </select>
            </div>

            {/*  Type */}
            <div>
                <label
                    htmlFor="type"
                    className="block mb-2.5 text-mb font-medium text-heading text-white"
                >
                    Type
                </label>
                <select
                    id="type"
                    className=" capitalize text-white bg-[#253641] w-full p-2.5 block rounded border border-gray-300 focus:ring-[#375EAA] focus:border-[#375EAA]"
                >
                    {typesList.map((item, index) => {
                        return <option className="capitalize" key={`type-key-${index}`} value={item}>{item}</option>
                    })}
                </select>
            </div>

            {/* Sort By */}
            <div>
                <label
                    htmlFor="sort"
                    className="block mb-2.5 text-mb font-medium text-heading text-white"
                >
                    Sort By
                </label>
                <select
                    id="sort"
                    className=" capitalize text-white bg-[#253641] w-full p-2.5 block rounded border border-gray-300 focus:ring-[#375EAA] focus:border-[#375EAA]"
                >
                    {sortList.map((item, index) => {
                        return <option className="capitalize" key={`sort-key-${index}`} value={item}>{item}</option>
                    })}
                </select>
            </div>

            <div>
                <label
                    htmlFor="generation"
                    className="block mb-2.5 text-mb font-medium text-heading text-white"
                >
                    Search
                </label>
                <input
                    {...fieldKeyword}
                    id="generation"
                    className="text-white bg-[#253641] w-full p-2.5 block rounded border border-gray-300 focus:ring-[#375EAA] focus:border-[#375EAA]"
                />
            </div>
        </div>
    )
}

export default SearchForm