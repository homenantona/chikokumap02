import { useState, memo, useMemo, useCallback, useContext } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { InputData } from '../App';

const Late = () => {
    const { selectedLate, setLate } = useContext(InputData);
    const [selectLate, setSelectLate] = useState('');


    const handleChange = e => setSelectLate(e.target.value);
    const handleChange02 = e => setLate(e.target.value);
    const handleChange03 = e => {
        if (selectLate === 'late') {
            const lateNumber = document.querySelector("#lateNumber");
            setLate(lateNumber.value);
        }else{
        }
    };


    const LateNum = memo(() => {
        if (selectLate === 'late') {
            return (
                <>
                    <label>
                        {/* <input type="number" min="1" value={selectedLate} className="border-2" onChange={handleChange02} />分後に出発する */}
                        <input id="lateNumber" type="number" min="1" className="border-2" />分後に出発する
                    </label>
                </>
            )
        } else {
            return (
                <>
                </>
            );
        }
    });

    return (
        <>
            <article className="bg-purple-200 py-12">
                <section className="innerSection">
                    <div>
                        <h2 className="text-3xl">すぐ出発する？</h2>
                        <div className="mt-7 grid grid-col-1 gap-4">
                            <label><input type="radio" name="selectLate" value="0" onChange={handleChange02} />すぐに出発</label>
                            <label><input type="radio" name="selectLate" value="late" onChange={handleChange} />準備が必要</label>

                            <LateNum />
                        </div>
                        <div className="mt-7">
                            <button onClick={handleChange03} className="btn bg-red-400 text-white py-2 px-4 bg-emerald-500 font-semibold rounded-lg shadow-md focus:outline-none"><Link to="/direction">OK！</Link></button>
                        </div>
                    </div>
                </section>

            </article>
        </>
    )
}
export default Late;