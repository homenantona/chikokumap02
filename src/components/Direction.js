import React, { useContext, useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { InputData } from '../App';

const Direction = () => {
    const {travelMode, setTravelMode} = useContext(InputData);
    const handleChange = e => setTravelMode(e.target.value);
    
    return (
        <>
            <article className="bg-yellow-200 py-12">
                <section className="innerSection">
                    <div>
                        <h2 className="text-3xl">通勤方法は？</h2>
                        <div className="mt-7 grid grid-col-1 gap-4">
                            <label><input type="radio" name="travelMode" value="DRIVING" onChange={handleChange} />車通勤</label>
                            <label><input type="radio" name="travelMode" value="BICYCLING" onChange={handleChange} />自転車通勤</label>
                            {/* <label><input type="radio" name="travelMode" value="TRANSIT" onChange={handleChange} />電車通勤</label> */}
                            <label><input type="radio" name="travelMode" value="WALKING" onChange={handleChange} />徒歩通勤</label>
                        </div>
                        <div className="mt-7">
                            <button className="btn bg-red-400 text-white py-2 px-4 bg-emerald-500 font-semibold rounded-lg shadow-md focus:outline-none"><Link to="/map">OK！</Link></button>
                        </div>
                    </div>
                </section>

            </article>
        </>
    )
}
export default Direction;