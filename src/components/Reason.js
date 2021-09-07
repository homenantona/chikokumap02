import React, { useState, useContext, useCallback } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { conditionList, troubleList, excuseList } from "../reasonList";
import { reportText } from "../reportText";
import { InputData } from '../App';
const Reason = () => {
    const { answer, setAnswer, currentDirection, reason, setReason, selectedLate } = useContext(InputData);
    const [answerSelect, setAnswerSelect] = useState('');

    const ReasonSelect = (props) => {
        const handleChange = e => {
            setReason(e.target.value);
        }
        const handleChange2 = e => {
            props.stateProps07(e.target.value);
            if (currentDirection && !answer) {
                console.log("currentDirection && !answer");
                setAnswer(reportText(e.target.value, currentDirection.routes[0].legs[0].distance.text, currentDirection.routes[0].legs[0].duration.value, selectedLate));
            } else if (answer) {
                console.log("answer");
                setAnswer(reportText(e.target.value, currentDirection.routes[0].legs[0].distance.text, currentDirection.routes[0].legs[0].duration.value, selectedLate));
            } else {
                console.log("NoAnswer");
            }
        }


        const ReasonDetail = () => {
            if (reason === "condition") {
                return (
                    <select value={props.stateProps06} name="reasonItemSelect2" id="reasonItemSelect2" className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleChange2}>
                        <option value='-'>-</option>
                        {conditionList.map((value) => (
                            <option value={value.txt} key={value.id}>{value.txt}</option>
                        ))}
                    </select>
                )
            } else if (reason === "trouble") {
                return (
                    <select value={props.stateProps06} name="reasonItemSelect2" id="reasonItemSelect2" className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleChange2}>
                        <option value='-'>-</option>
                        {troubleList.map((value) => (
                            <option value={value.txt} key={value.id}>{value.txt}</option>
                        ))}
                    </select>
                )
            } else if (reason === "excuse") {
                return (
                    <select value={props.stateProps06} name="reasonItemSelect3" id="reasonItemSelect3" className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleChange2}>
                        <option value='-'>-</option>
                        {excuseList.map((value) => (
                            <option value={value.txt} key={value.id}>{value.txt}</option>
                        ))}
                    </select>
                )
            } else {
                return (
                    <p>未選択</p>
                )
            }
        }

        return (
            <>
                <section className="pt-7">
                    <select value={reason} name="reasonSelect" id="reasonSelect" onChange={handleChange} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">-</option>
                        <option value="condition">体調不良系</option>
                        <option value="trouble">トラブル系</option>
                        <option value="excuse">言い訳系</option>
                    </select>
                    <ReasonDetail />
                </section>
            </>
        )
    }


    return (
        <>
            <article className="bg-green-200 py-12">
                <section className="innerSection">
                    <div>
                        <h2 className="text-3xl">遅刻理由は？</h2>
                        <ReasonSelect stateProps06={answerSelect} stateProps07={setAnswerSelect} />
                        <div className="mt-7">
                            <button className="btn bg-pink-400 text-white py-2 px-4 bg-emerald-500 font-semibold rounded-lg shadow-md focus:outline-none"><Link to="/share">OK！</Link></button>
                        </div>
                    </div>
                </section>
            </article>
        </>
    )
}

export default Reason;