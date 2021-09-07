import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { TwitterIcon, LineShareButton, TwitterShareButton, LineIcon, EmailShareButton, EmailIcon } from "react-share"
import { InputData } from '../App';

const Share = () => {
    const { travelMode, answer, currentDirection } = useContext(InputData);

    useEffect(() => {
        const textarea = document.querySelector('textarea');
        const button = document.querySelector('.copyBtn');
        button.addEventListener('click', (e) => {
            console.log(textarea.innerHTML);
            if (!navigator.clipboard) {
                // use old commandExec() way
            } else {
                navigator.clipboard.writeText(textarea.innerHTML).then(
                    function () {
                        alert("yeah!"); // success 
                    })
                    .catch(
                        function () {
                            alert("err"); // error
                        });
            }
        })
    });
    return (
        <>
            <article className="bg-pink-200 py-12">
                <section className="innerSection">
                    <div>
                        <h2 className="text-3xl">遅刻を報告</h2>
                        <div className="mt-7 text-left">
                            <textarea name="excuseArea" value={answer} id="" cols="30" rows="10"></textarea>
                            <button className="copyBtn shadow-md focus:outline-none"><span>コピー</span></button>
                        </div>
                        <div className="mt-7">
                            <div className="flex justify-center space-x-3">
                                <LineShareButton title={answer} url={`https://www.google.com/maps/dir/?api=1&origin=${currentDirection.routes[0].legs[0].start_location.lat()},${currentDirection.routes[0].legs[0].start_location.lng()}&destination=${currentDirection.routes[0].legs[0].end_location.lat()},${currentDirection.routes[0].legs[0].end_location.lng()}&travelmode=${travelMode}`}>
                                    <LineIcon round size={32} />
                                </LineShareButton>
                                <TwitterShareButton title={answer} url={`https://www.google.com/maps/dir/?api=1&origin=${currentDirection.routes[0].legs[0].start_location.lat()},${currentDirection.routes[0].legs[0].start_location.lng()}&destination=${currentDirection.routes[0].legs[0].end_location.lat()},${currentDirection.routes[0].legs[0].end_location.lng()}&travelmode=${travelMode}`}>
                                    <TwitterIcon round size={32} />
                                </TwitterShareButton>
                                <EmailShareButton subject='遅刻報告' body={`${answer}https://www.google.com/maps/dir/?api=1&origin=${currentDirection.routes[0].legs[0].start_location.lat()},${currentDirection.routes[0].legs[0].start_location.lng()}&destination=${currentDirection.routes[0].legs[0].end_location.lat()},${currentDirection.routes[0].legs[0].end_location.lng()}&travelmode=${travelMode}`}>
                                    <EmailIcon round size={32} />
                                </EmailShareButton>
                            </div>


                        </div>
                        {/* <div className="mt-7">
                            <button className="btn bg-red-400 text-white py-2 px-4 bg-emerald-500 font-semibold rounded-lg shadow-md focus:outline-none"><Link to="/map">OK！</Link></button>
                        </div> */}
                    </div>
                </section>
            </article>
        </>
    )
}
export default Share;