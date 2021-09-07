import React, { useContext, useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
const Top = () => {
    // const {count, setCount} = useContext(InputData);
    return (
        <>
            <article className="topArticle py-12">
                <section>
                    <div>
                        <h2 className="text-3xl">遅刻しそう？</h2>
                        <div className="mt-7">
                            <button className="btn bg-purple-500 text-white py-2 px-4 bg-emerald-500 font-semibold rounded-lg shadow-md focus:outline-none"><Link to="/late">遅刻しそう！</Link></button>
                        </div>
                    </div>
                </section>
            </article>
        </>
    )
}

export default Top;