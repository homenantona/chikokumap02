import React, { useState, useContext, useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { InputData } from '../App';

const Map = () => {
    const { travelMode, currentDirection, setCurrentDirection } = useContext(InputData);

    const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
    const [dstLat, setDstLat] = useState(0);
    const [dstLng, setDstLng] = useState(0);
    let destination = { lat: dstLat, lng: dstLng };
    const origin = { lat: latLng.lat, lng: latLng.lng };


    const containerStyle = {
        width: "100%",
        height: "400px",
    };


    const Direction = () => {
        if (currentDirection) {
            return (
                <section className="space-y-3">

                    <div className="flex justify-between flex-wrap">
                        <div className="w-full text-left">
                            <p>現在地</p>
                        </div>
                        <div className="w-full text-left mt-1">
                            <p className="text-sm">{currentDirection.routes[0].legs[0].start_address}</p>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <div className="w-full text-left">
                            <p>目的地</p>
                        </div>
                        <div className="w-full text-left mt-1">
                            <p className="text-sm">{currentDirection.routes[0].legs[0].end_address}</p>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <div className="w-full text-left">
                            <p>距離</p>
                        </div>
                        <div className="w-full text-left mt-1">
                            <p className="text-sm">{currentDirection.routes[0].legs[0].distance.text}</p>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <div className="w-full text-left">
                            <p>所要時間</p>
                        </div>
                        <div className="w-full text-left mt-1">
                            <p className="text-sm">{currentDirection.routes[0].legs[0].duration.text}</p>
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <section><p>目的地を選択してください</p></section>
            )
        }
    }



    const directionsCallback = useCallback((googleResponse) => {
        console.log(googleResponse)
        if (googleResponse) {
            if (currentDirection) {
                if (
                    googleResponse.status === "OK" &&
                    googleResponse.geocoded_waypoints.slice(-1)[0].place_id !== currentDirection.geocoded_waypoints.slice(-1)[0].place_id
                ) {
                    console.log("ルートが変更されたのでstateを更新する");
                    setCurrentDirection(googleResponse);
                } else {
                    console.log("前回と同じルートのためstateを更新しない");
                }
            } else {
                if (googleResponse.status === "OK") {
                    console.log("初めてルートが設定されたため、stateを更新する");
                    setCurrentDirection(googleResponse);

                } else {
                    console.log("前回と同じルートのためstateを更新しない");
                }
            }
        }
    });
    // (1) DirectionsServiceコンポーネントはレンダーされるとルート検索し、結果をcallbackとして返す。
    // (2) このAPIレスポンスを今回のようにstateに保存すると、stateが変わったことにより、DirecitonsServiceコンポーネントが再度レンダーされる。
    // (3) DirectionsServiceコンポーネントがレンダーされると再度APIコールを行う。
    // 上記(1)~(3)の無限ループを防ぐため、(3)の結果がstateと変わらなければstateを更新しない、という処理を上記に実装した

    const setDstLatLng = (clickPotion) => {
        if (clickPotion) {
            setDstLat(clickPotion.latLng.lat())
            setDstLng(clickPotion.latLng.lng())
        }
    };


    //初回ロード
    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {
            setLatLng({ ...latLng, lat: position.coords.latitude, lng: position.coords.longitude });

        },
            (err) => {
                console.log(err);
            })
    }, []);
    return (
        <>
            <article className="bg-red-200 py-12">
                <section className="innerSection">
                    <div>
                        <LoadScript googleMapsApiKey="AIzaSyAQTg1YKQh36zrJ_tdRpHRgvBnXxoUunKI">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={origin}
                                zoom={15}
                                onClick={setDstLatLng}
                            >
                                {/* 現在地 */}
                                <Marker position={origin} label={""} />
                                {/*<Marker position={positionIwamotocho} label={markerLabelIwamotocho} /> */}
                                {/* <InfoWindow position={positionAkiba}>
                            <div style={divStyle}>
                                <h1>秋葉原オフィス</h1>
                            </div>
                            </InfoWindow>
                            <InfoWindow position={positionIwamotocho}>
                            <div style={divStyle}>
                                <h1>岩本町オフィス</h1>
                            </div>
                            </InfoWindow> */}
                                <DirectionsService
                                    options={{
                                        origin,
                                        destination,
                                        travelMode: travelMode,
                                        // 走行モードを指定する。今回は自動車に設定
                                        optimizeWaypoints: true,
                                        // 経由地の順序を最適化する場合はtrueに設定する
                                        // waypoints: transitPoints,
                                    }}
                                    callback={directionsCallback}
                                />
                                {currentDirection !== null && (
                                    <DirectionsRenderer
                                        options={{
                                            directions: currentDirection,
                                        }}
                                    />
                                    // DirectionsServiceのAPI検索の結果としてcurrenctDirectionがあれば、その結果をDirectionsRendererで表示する。
                                    // 予めルート情報を持っていれば、DirecitonsServiceでAPIコールする必要はない。
                                )}
                            </GoogleMap>
                        </LoadScript>
                        <div className="mt-7">
                            <Direction />
                        </div>
                        <div className="mt-7">
                            <button className="btn bg-green-400 text-white py-2 px-4 bg-emerald-500 font-semibold rounded-lg shadow-md focus:outline-none"><Link to="/reason">OK！</Link></button>
                        </div>

                    </div>
                </section>
            </article>
        </>
    )
}
export default Map;