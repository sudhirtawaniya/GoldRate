import { useEffect, useState } from 'react'
import goldImg from '../assets/images/treasure.png'
import { get } from '../services/apiHandler'
export default function GoldRate() {
    const [isUpi, setIsUpi] = useState(false)
    const [method, setMethod] = useState("price")
    const [data, setData] = useState({})
    const [calculatedPrice, setcalculatedPrice] = useState(0)
    const [currentValue, SetCurrentValue] = useState(0)
    function handleChangeUpi() {
        setIsUpi(!isUpi)

    }
    const handleChangeValue = (e) => {
        let value = e.target.value;
        SetCurrentValue(value)
        let price = 0
        if (method == "price") {
            price = (value / data.current_price).toFixed(2) + " /gm";

        }
        else {

            price = "Rs. " + (value * data.current_price).toFixed(2);
        }

        setcalculatedPrice(price)


    }
    const getGoldPrice = async () => {

        const res = await get("/buy-price")
        setData(res.data)

    }

    useEffect(() => {
        getGoldPrice()
    }, [])

    useEffect(() => {
        if (data.rate_validity) {
            const targetTime = new Date(data.rate_validity).getTime();
            const currentTime = new Date().getTime();
            const timeRemaining = targetTime - currentTime;

            const onTimeExpired = () => {
                getGoldPrice()
            };

            if (timeRemaining > 0) {
                const timeoutId = setTimeout(onTimeExpired, timeRemaining);
                return () => clearTimeout(timeoutId);
            } else {
                onTimeExpired();
            }
        }
    }, [data]);

    return <>
        <div className="max-w-full  flex justify-center h-[100vh] items-center">
            <div className="box shadow-coverShadow bg-white rounded-2xl md:max-w-[650px] w-[90%] md:min-w-[700px] px-2 py-5 md:p-10">
                <div className="flex justify-between items-center">


                    <div className="tab text-[#00bbb4] flex items-start gap-x-2 text-[20px] font-[600] "> <img src={goldImg} className='w-6' alt="Gold icon" /> Buy</div>
                    <div className="tab hover:text-[#00bbb4] cursor-pointer duration-150 flex items-start gap-x-2 text-[20px] font-[600] text-[#333] "> <img src={goldImg} className='w-6' alt="Gold icon" /> Sell</div>
                    <div className="tab hover:text-[#00bbb4] cursor-pointer duration-150 flex items-start gap-x-2 text-[20px] font-[600] text-[#333] "> <img src={goldImg} className='w-6' alt="Gold icon" /> Jewellry</div>

                </div>
                <div className="box flex w-ful mt-5 bg-gradient_one rounded-md gap-x-10 justify-start md:justify-end px-3 py-5">
                    <p className="text-[#00bbb4] font-[600]">Saving 1% with UPI</p>
                    <button
                        class={`md:w-20 h-5 rounded-full  ${!isUpi ? "bg-[green]" : "bg-[red]"}  flex items-center transition duration-300 focus:outline-none shadow`}
                        onClick={handleChangeUpi}>
                        <div
                            id="switch-toggle"

                            class={`rounded-md relative  transition duration-500 transform bg-white shadow-lg ${isUpi ? "-translate-x-[20px]" : "translate-x-[40%] "} py-0 px-3 text-white`}>

                            <svg xmlns="http://www.w3.org/2000/svg" className='w-[40px] h-full' viewBox="0 0 333334 199007" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
                                <path d="M44732 130924h1856l-1738 7215c-265 1061-206 1885 147 2415 354 530 1001 795 1973 795 942 0 1737-265 2356-795 618-531 1031-1355 1296-2415l1737-7215h1885l-1767 7392c-383 1590-1060 2798-2061 3593-972 795-2268 1208-3858 1208s-2680-383-3269-1179c-589-795-707-2002-324-3592l1767-7421zm223507 11868l2826-11868h6449l-383 1649h-4564l-706 2974h4564l-413 1679h-4564l-913 3827h4565l-412 1738h-6449zm-177-8982c-413-470-913-824-1443-1031-531-235-1119-353-1797-353-1266 0-2385 412-3386 1237s-1649 1915-1973 3239c-295 1267-177 2327 413 3181 559 824 1442 1237 2620 1237 677 0 1355-118 2031-383 678-235 1356-619 2062-1119l-530 2179c-589 382-1207 648-1856 825-648 176-1296 265-2002 265-883 0-1679-148-2356-443-678-294-1236-736-1679-1324-441-560-706-1237-824-2002-117-766-88-1590 148-2474 206-883 559-1680 1031-2445 471-766 1089-1443 1796-2002 706-589 1472-1030 2297-1325 824-294 1648-441 2503-441 677 0 1295 88 1885 294 559 207 1089 500 1560 913l-500 1972zm-18317 4300h3209l-530-2710c-29-176-59-383-59-589-30-235-30-471-30-736-118 265-235 500-383 736-118 235-235 442-353 619l-1855 2680zm4093 4682l-589-3062h-4594l-2062 3062h-1972l8539-12338 2650 12338h-1972zm-15548 0l2827-11868h6449l-383 1649h-4565l-706 2945h4563l-412 1679h-4564l-1325 5565h-1885v30zm-5566-6832h353c1001 0 1679-118 2062-354 382-236 648-648 795-1267 146-648 88-1119-207-1384-293-265-913-413-1855-413h-354l-795 3417zm-471 1502l-1267 5300h-1767l2828-11867h2621c766 0 1354 59 1737 148 411 89 736 265 971 500 295 295 471 648 559 1119 89 443 59 943-59 1502-235 943-619 1709-1207 2238-589 530-1326 854-2209 972l2680 5387h-2121l-2562-5300h-206zm-11632 5330l2828-11868h6478l-382 1649h-4565l-706 2974h4564l-411 1679h-4565l-912 3827h4564l-413 1738h-6479zm-2031-10248l-2444 10218h-1884l2444-10218h-3063l383-1649h8010l-382 1649h-3063zm-19170 10248l2945-12338 5595 7244c148 206 294 413 441 648s295 501 471 794l1974-8216h1737l-2945 12310-5713-7392c-147-206-295-412-441-619-147-235-265-442-354-707l-1972 8245h-1737v30zm-4594 0l2827-11868h1884l-2827 11868h-1884zm-13870-2385l1678-707c29 530 176 942 501 1207 324 265 765 413 1354 413 559 0 1031-148 1443-471 412-324 678-736 795-1266 177-707-235-1326-1236-1855-147-89-235-148-325-177-1119-648-1825-1207-2120-1737-294-530-354-1149-176-1884 235-972 736-1738 1530-2356 796-589 1679-913 2740-913 854 0 1530 177 2031 500 501 325 766 825 854 1444l-1648 766c-148-383-325-648-560-825-235-176-530-265-884-265-501 0-942 147-1295 412-354 265-589 619-707 1090-176 707 325 1383 1472 2002 89 59 147 89 207 117 1001 530 1678 1061 1972 1591 295 529 354 1148 178 1943-266 1119-825 2002-1680 2680-853 647-1855 1002-3033 1002-971 0-1737-237-2267-708-589-471-854-1149-824-2002zm-1973-7863l-2444 10218h-1884l2444-10218h-3062l381-1649h8010l-383 1649h-3062zm-19170 10248l2944-12338 5596 7244c147 206 295 413 442 648 146 235 294 501 471 794l1973-8216h1737l-2944 12310-5713-7392c-148-206-294-412-442-619-147-235-265-442-353-707l-1973 8245h-1737v30zm-8599 0l2827-11868h6449l-383 1649h-4564l-707 2974h4564l-412 1679h-4564l-913 3827h4565l-413 1738h-6449zm-3121-5860c0-88 29-354 88-766 30-353 59-618 89-854-118 266-236 530-383 824-147 266-324 560-530 825l-4535 6331-1472-6448c-59-265-118-530-148-766-29-235-59-500-59-736-59 236-147 500-235 794-89 266-206 560-354 855l-2650 5831h-1737l5683-12368 1620 7479c29 118 59 324 89 589 29 266 88 619 147 1031 206-353 471-765 825-1296 88-146 176-235 206-324l5124-7479-177 12368h-1737l148-5890zm-17933 5860l1296-5418-2356-6420h1972l1472 4035c30 117 59 235 118 411 59 178 89 354 147 530 118-176 236-353 354-530 118-176 236-324 353-471l3446-3975h1884l-5506 6390-1296 5417h-1885v30zm-8746-4682h3209l-530-2710c-30-176-59-383-59-589-30-235-30-471-30-736-118 265-236 500-383 736-118 235-235 442-354 619l-1855 2680zm4063 4682l-589-3062h-4594l-2061 3062h-1973l8540-12338 2650 12338h-1973zm-11808-6920h471c1031 0 1767-118 2179-354 412-235 677-647 825-1237 146-618 58-1089-236-1324-324-265-972-383-1943-383h-471l-825 3299zm-501 1590l-1266 5330h-1767l2827-11868h2856c854 0 1443 59 1826 147s678 236 913 471c294 265 500 648 589 1119 88 472 59 972-59 1531-147 560-353 1090-677 1561s-707 854-1119 1119c-353 206-736 382-1148 471-412 88-1060 148-1885 148h-1089v-30zm-17580 3563h1590c854 0 1531-59 2003-176 471-117 883-324 1266-589 530-383 972-854 1325-1443 354-560 619-1237 795-2002 176-766 235-1414 147-1972-88-561-294-1061-648-1444-265-294-589-471-1030-589-442-118-1119-176-2091-176h-1354l-2003 8392zm-2297 1767l2828-11868h2532c1649 0 2798 88 3415 265 619 177 1148 442 1561 854 530 530 884 1208 1031 2002 147 825 88 1767-147 2798-266 1060-648 1972-1178 2796-530 825-1207 1473-2002 2003-589 413-1237 678-1944 854-677 177-1708 265-3063 265h-3033v30zm-8628 0l2827-11868h6449l-383 1649h-4565l-707 2974h4565l-412 1679h-4565l-913 3827h4565l-412 1738h-6449zm-4565 0l2827-11868h1884l-2827 11868h-1885zm-8540 0l2827-11868h6449l-383 1649h-4564l-707 2945h4564l-412 1679h-4565l-1325 5565h-1885v30zm-4565 0l2827-11868h1884l-2827 11868h-1885zm-13015 0l2944-12338 5595 7244c147 206 294 413 442 648 147 235 294 501 471 794l1973-8216h1737l-2944 12310-5713-7392c-147-206-294-412-442-619-147-235-265-442-353-707l-1973 8245h-1737v30z" fill="#3a3734" />
                                <path d="M233961 120588h-12927l17963-64873h12927l-17963 64873zm-107424-4064c-707 2562-3063 4358-5713 4358H54185c-1826 0-3180-619-4064-1855-883-1238-1089-2769-559-4594l16255-58541h12928l-14518 52298h51710l14517-52298h12928l-16844 60632zm100710-58777c-883-1237-2268-1855-4152-1855h-71027l-3504 12721h64608l-3769 13576h-51680v-30h-12927l-10719 38724h12927l7185-25973h58100c1826 0 3534-619 5124-1855 1590-1237 2651-2768 3151-4594l7185-25972c559-1943 383-3504-501-4741z" fill="#716d6a" />
                                <path fill="#0e8635" d="M274245 55833l16344 32510-34365 32510 4087-14747 18794-17763-8941-17785z" />
                                <path fill="#e97208" d="M262762 55833l16343 32510-34395 32510z" />
                                {/* <path d="M31367 0h270601c8631 0 16474 3528 22156 9210 5683 5683 9211 13526 9211 22156v136275c0 8629-3529 16472-9211 22155-5683 5682-13526 9211-22155 9211H31368c-8629 0-16473-3528-22156-9211C3530 184114 2 176272 2 167641V31366c0-8631 3528-16474 9210-22156S22738 0 31369 0zm270601 10811H31367c-5647 0-10785 2315-14513 6043s-6043 8866-6043 14513v136275c0 5646 2315 10784 6043 14512 3729 3729 8867 6044 14513 6044h270601c5645 0 10783-2315 14512-6044 3728-3729 6044-8867 6044-14511V31368c0-5645-2315-10784-6043-14513-3728-3728-8867-6043-14513-6043z" fill="gray" fill-rule="nonzero"/>
                            */}
                            </svg>
                        </div>
                    </button>
                </div>
                <div className="box overflow-hidden  w-full mt-1 bg-gradient_one rounded-md gap-x-5  ">
                    <div className="box px-3 py-5 flex justify-between">
                        <div>
                            <p className='text-[#999] font-[500] text-[14px]'>Buy Price with UPI discount</p>
                            <p className='text-[#333] font-[600] text-[15px]'>₹ {((data.current_price * 0.99)).toFixed(2)} /gm</p>
                        </div>
                        <div>
                            <p className='text-[#999] font-[500] text-[14px]'>Purity</p>
                            <p className='text-[#333] font-[600] bg-clip-text text-transparent bg-gradient_three text-[18px]'>24K 99.99%</p>
                        </div>
                    </div>
                    <div className="box px-3 py-1 bg-gradient_two">
                        <p className='text-[14px] font-[400] text-[#154995]'>Saving <span className='font-[600]'>₹ {(data.current_price - (data.current_price * 0.99)).toFixed(1)} /gm</span></p>
                    </div>
                </div>

                <div className="box mt-5 rounded-md p-5 md:p-10 bg-[#32bfba]">
                    <div className="flex items-center justify-between">
                        <div class="flex items-center ">
                            <div class="bg-[white] p-1 rounded-full min-w-4 min-h-4 flex flex-shrink-0 justify-center items-center relative">
                                <input type="radio" name="radio" checked={method == "price"} onClick={() => setMethod("price")} className="appearance-none bg-white relative z-50 cursor-pointer rounded-full checked:border-[#0a9d99] border-4 w-4 h-4 " />

                            </div>
                            <label id="label2" class="ml-2 text-[13px] font-[600] leading-4   text-white dark:text-gray-100">Buy in rupees</label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div class="flex items-center ">
                                <div class="bg-[white] p-1 rounded-full min-w-4 min-h-4 flex flex-shrink-0 justify-center items-center relative">
                                    <input type="radio" name="radio" checked={method == "grams"} onClick={() => setMethod("grams")} className="appearance-none bg-white relative z-50  cursor-pointer rounded-full checked:border-[#0a9d99] border-4 w-4 h-4 " />

                                </div>
                                <label id="label2" class="ml-2 text-[13px] font-[600] leading-4   text-white dark:text-gray-100">Buy in grams</label>
                            </div>
                        </div>

                    </div>
                    <div className="input relative mt-10">
                        <input type="number" value={currentValue} onChange={handleChangeValue} className='outline-none appearance-none remove-arrow text-white py-2 text-[30px] border-b w-full bg-transparent border-white' />
                        <p className="absolute bottom-0 text-[#ccc] right-0">={calculatedPrice}</p>
                    </div>
                    <div className='flex justify-center'>
                        <button className="button px-5 py-3 font-[600] mx-auto cursor-pointer mt-5 w-fit rounded-lg text-[18px] text-[#c4a646] bg-white shadow-lg duration-150 hover hover:-translate-y-[10px]">Buy Gold <br /> (rate_id:{data.rate_id}) </button>
                    </div>
                </div>


            </div>
        </div>
    </>
}