import React, { useState, useEffect } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import Thermometer from 'react-thermometer-component';
import forward from './forward.png';
import backward from './backward.png';
import rightward from './rightward.png';
import leftward from './leftward.png';
import led_on from './led_on.png';
import led_off from './led_off.png';
import rice from './rice.png';
import water from './water.png';
import sleep from './sleep.png';
import wc from './wc.png';
import fun from './fun.png';
import sad from './sad.png';
const Temp = ({ value, title }) => {
    // Hàm để xác định màu sắc dựa trên giá trị nhiệt độ
    const getBackgroundColor = (temp) => {
        if (temp >= 0 && temp <= 37.5) {
            return 'green';
        } else if (temp > 37.5 && temp <= 40) {
            return 'orange';
        } else {
            return 'red';
        }
    }; const backgroundColor = getBackgroundColor(value);
    return (
        <div style={{ display: 'inline-block', textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '5px', background: backgroundColor }}>
            <Thermometer
                theme="light"
                value={value}
                max="100"
                steps="1"
                format="°C"
                size="normal"
                height="180"
            />
            <div style={{ fontSize: '1em', color: '#333', marginTop: '15px', color: 'yellow', fontWeight: 'bold' }}>
                {title}: {value}°C
            </div>
        </div>
    );
};

const GaugeExample = () => {
    const [gaugeData, setGaugeData] = useState({
        Roll: 0,
        Pitch: 0,
        Yaw: 0,
        Acc_X: 0,
        Acc_Y: 0,
        Acc_Z: 0,
        Nhiet_Do_Phong: 0,
        Nhiet_Do_Dau: 0,
    });
    const fetchData = async () => {
        try {
            const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-khcpn/endpoint/Get_Gauge');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setGaugeData({
                Roll: data[0]?.public?.output?.jsonData?.Roll,
                Pitch: data[0]?.public?.output?.jsonData?.Pitch,
                Yaw: data[0]?.public?.output?.jsonData?.Yaw,
                Acc_X: data[0]?.public?.output?.jsonData?.Acc_X,
                Acc_Y: data[0]?.public?.output?.jsonData?.Acc_Y,
                Acc_Z: data[0]?.public?.output?.jsonData?.Acc_Z,
                Nhiet_Do_Phong: data[0]?.public?.output?.jsonData?.Nhiet_phong_C,
                Nhiet_Do_Dau: data[0]?.public?.output?.jsonData?.Nhiet_nguoi_C,
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    //////
    // return (
    //     <div>
    //         <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', marginTop: '20px', width: '100%', alignItems: 'center' }}>
    //             <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginRight: '25px' }}>
    //                 <h2>Cúi Đầu</h2>
    //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
    //                     <ReactSpeedometer
    //                         value={parseFloat(gaugeData.Roll.toFixed(2))}
    //                         needleTransition="easeQuadIn"
    //                         needleTransitionDuration={1000}
    //                         needleColor="blue"
    //                         startColor="red"
    //                         maxValue={180}
    //                         minValue={-180}
    //                         segments={10}
    //                         endColor="green"
    //                     />
    //                 </div>
    //                 <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Roll.toFixed(2))}°</p>
    //             </div>
    //             <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginRight: '25px' }}>
    //                 <h2>Nghiêng Đầu</h2>
    //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
    //                     <ReactSpeedometer
    //                         value={parseFloat(gaugeData.Pitch.toFixed(2))}
    //                         needleTransition="easeQuadIn"
    //                         needleTransitionDuration={1000}
    //                         needleColor="blue"
    //                         startColor="red"
    //                         maxValue={180}
    //                         minValue={-180}
    //                         segments={10}
    //                         endColor="green"
    //                     />
    //                 </div>
    //                 <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Pitch.toFixed(2))}°</p>
    //             </div>
    //             <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginRight: '25px' }}>
    //                 <h2>Xoay Đầu</h2>
    //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
    //                     <ReactSpeedometer
    //                         value={parseFloat(gaugeData.Yaw.toFixed(2))}
    //                         needleTransition="easeQuadIn"
    //                         needleTransitionDuration={1000}
    //                         needleColor="blue"
    //                         startColor="red"
    //                         maxValue={180}
    //                         minValue={-180}
    //                         segments={10}
    //                         endColor="green"
    //                     />
    //                 </div>
    //                 <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Yaw.toFixed(2))}°</p>
    //             </div>


    //             <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginTop: '20px', marginRight: '34px', marginBottom: '20px' }}>
    //                 <h2 style={{ display: 'inline-block', marginBottom: '0px' }}>QUY ƯỚC TÍN HIỆU</h2>
    //                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '200px', marginTop: '8px' }}>

    //                     {/* CÚI ĐẦU */}
    //                     {gaugeData.Roll >= 25 && gaugeData.Roll <= 34 && (
    //                         <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>ĐI VỀ TRƯỚC <img src={forward} alt="forward" style={{ width: '72px', height: '72px' }} /></p>
    //                     )}
    //                     {gaugeData.Roll <= -25 && gaugeData.Roll >= -34 && (
    //                         <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>ĐI VỀ SAU <img src={backward} alt="backward" style={{ width: '72px', height: '72px' }} /></p>
    //                     )}

    //                     {/* Điều kiện lớn */}
    //                     {gaugeData.Roll > 34 && (
    //                         <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
    //                             BẬT ĐÈN <img src={led_on} alt="led_on" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
    //                     )}
    //                     {gaugeData.Roll < -34 && (
    //                         <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
    //                             TẮT ĐÈN <img src={led_off} alt="led_off" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
    //                     )}

    //                     {/* NGHIÊNG ĐẦU */}
    //                     {gaugeData.Pitch >= 25 && gaugeData.Pitch <= 34 && (
    //                         <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}> ĐI VỀ PHẢI <img src={rightward} alt="rightward" style={{ width: '72px', height: '72px' }} /></p>
    //                     )}
    //                     {gaugeData.Pitch <= -25 && gaugeData.Pitch >= -34 && (
    //                         <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>ĐI VỀ TRÁI <img src={leftward} alt="leftward" style={{ width: '72px', height: '72px' }} /></p>
    //                     )}

    //                     {/* Điều kiện lớn */}
    //                     {gaugeData.Pitch > 34 && (
    //                         <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
    //                             ĐÓI BỤNG <img src={rice} alt="rice" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
    //                     )}
    //                     {gaugeData.Pitch < -34 && (
    //                         <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
    //                             KHÁT NƯỚC <img src={water} alt="water" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
    //                     )}

    //                     {/* Điều kiện nhỏ */}
    //                     {gaugeData.Yaw >= 25 && gaugeData.Yaw <= 34 && (
    //                         <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}> VUI <img src={fun} alt="fun" style={{ width: '72px', height: '72px' }} /></p>
    //                     )}
    //                     {gaugeData.Yaw <= -25 && gaugeData.Yaw >= -34 && (
    //                         <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>BUỒN <img src={sad} alt="sad" style={{ width: '72px', height: '72px' }} /></p>
    //                     )}

    //                     {/* Điều kiện lớn */}
    //                     {gaugeData.Yaw > 34 && (
    //                         <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
    //                             BUỒN NGỦ <img src={sleep} alt="sleep" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
    //                     )}
    //                     {gaugeData.Yaw < -34 && (
    //                         <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
    //                             ĐI VỆ SINH <img src={wc} alt="wc" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //         <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', width: '100%' }}>
    //             <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '40%', height: '340px', position: 'relative', marginRight: '16px' }}>
    //                 <h2>Acc_X</h2>
    //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
    //                     <ReactSpeedometer
    //                         maxValue={100}
    //                         minValue={-100}
    //                         value={parseFloat(gaugeData.Acc_X.toFixed(2))}
    //                         needleTransition="easeQuadIn"
    //                         needleTransitionDuration={1000}
    //                         needleColor="black"
    //                         startColor="green"
    //                         segments={10}
    //                         endColor="blue"
    //                     />
    //                 </div>
    //                 <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Acc_X.toFixed(2))}m/s²</p>
    //             </div>

    //             <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '40%', height: '340px', position: 'relative', marginLeft: '9px', marginRight: '62px', }}>
    //                 <h2>Acc_Y</h2>
    //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
    //                     <ReactSpeedometer
    //                         maxValue={100}
    //                         minValue={-100}
    //                         value={parseFloat(gaugeData.Acc_Y.toFixed(2))}
    //                         needleTransition="easeQuadIn"
    //                         needleTransitionDuration={1000}
    //                         needleColor="black"
    //                         startColor="green"
    //                         segments={10}
    //                         endColor="blue"
    //                     />
    //                 </div>
    //                 <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Acc_Y.toFixed(2))}m/s²</p>
    //             </div>

    //             <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '100%', height: '340px', position: 'relative', marginRight: '223px', marginLeft: '34px' }}>
    //                 <h2>Nhiệt Độ</h2>
    //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '16px' }}>
    //                     <Temp value={gaugeData.Nhiet_Do_Dau} title={<span style={{ color: 'yellow' }}>Nhiet_Do_Dau</span>} />
    //                     {gaugeData.Nhiet_Do_Dau < 37.5 ? <p style={{ color: 'green' }}>KHỎE MẠNH</p> : (gaugeData.Nhiet_Do_Dau > 37.5 ? <p style={{ color: 'red' }}>BỊ ỐM</p> : <p></p>)}
    //                 </div>
    //                 <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Nhiet_Do_Dau.toFixed(2))}°</p>
    //             </div>
    //         </div>

    //     </div >
    // );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', width: '100%' }}>
                <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', marginTop: '25px', width: '40%', height: '340px', position: 'relative', marginRight: '16px' }}>
                    <h2>Acc_X</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
                        <ReactSpeedometer
                            maxValue={100}
                            minValue={-100}
                            value={parseFloat(gaugeData.Acc_X.toFixed(2))}
                            needleTransition="easeQuadIn"
                            needleTransitionDuration={1000}
                            needleColor="black"
                            startColor="green"
                            segments={10}
                            endColor="blue"
                        />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Acc_X.toFixed(2))}m/s²</p>
                </div>

                <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '40%', marginTop: '25px', height: '340px', position: 'relative', marginLeft: '9px', marginRight: '62px', }}>
                    <h2>Acc_Y</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
                        <ReactSpeedometer
                            maxValue={100}
                            minValue={-100}
                            value={parseFloat(gaugeData.Acc_Y.toFixed(2))}
                            needleTransition="easeQuadIn"
                            needleTransitionDuration={1000}
                            needleColor="black"
                            startColor="green"
                            segments={10}
                            endColor="blue"
                        />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Acc_Y.toFixed(2))}m/s²</p>
                </div>

                <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '100%', height: '340px', position: 'relative', marginTop: '25px', marginRight: '241px', marginLeft: '34px' }}>
                    <h2>Nhiệt Độ</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '16px' }}>
                        <Temp value={gaugeData.Nhiet_Do_Dau} title={<span style={{ color: 'yellow' }}>Nhiet_Do_Dau</span>} />
                        {gaugeData.Nhiet_Do_Dau < 37.5 ? <p style={{ color: 'green' }}>KHỎE MẠNH</p> : (gaugeData.Nhiet_Do_Dau > 37.5 ? <p style={{ color: 'red' }}>BỊ ỐM</p> : <p></p>)}
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Nhiet_Do_Dau.toFixed(2))}°</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', width: '100%', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginRight: '25px' }}>
                    <h2>Cúi Đầu</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
                        <ReactSpeedometer
                            value={parseFloat(gaugeData.Roll.toFixed(2))}
                            needleTransition="easeQuadIn"
                            needleTransitionDuration={1000}
                            needleColor="blue"
                            startColor="red"
                            maxValue={180}
                            minValue={-180}
                            segments={10}
                            endColor="green"
                        />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Roll.toFixed(2))}°</p>
                </div>
                <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginRight: '25px' }}>
                    <h2>Nghiêng Đầu</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
                        <ReactSpeedometer
                            value={parseFloat(gaugeData.Pitch.toFixed(2))}
                            needleTransition="easeQuadIn"
                            needleTransitionDuration={1000}
                            needleColor="blue"
                            startColor="red"
                            maxValue={180}
                            minValue={-180}
                            segments={10}
                            endColor="green"
                        />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Pitch.toFixed(2))}°</p>
                </div>
                <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginRight: '25px' }}>
                    <h2>Xoay Đầu</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginTop: '68px' }}>
                        <ReactSpeedometer
                            value={parseFloat(gaugeData.Yaw.toFixed(2))}
                            needleTransition="easeQuadIn"
                            needleTransitionDuration={1000}
                            needleColor="blue"
                            startColor="red"
                            maxValue={180}
                            minValue={-180}
                            segments={10}
                            endColor="green"
                        />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '24px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>{parseFloat(gaugeData.Yaw.toFixed(2))}°</p>
                </div>

                <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px', width: '80%', height: '340px', position: 'relative', marginTop: '20px', marginRight: '34px', marginBottom: '20px' }}>
                    <h2 style={{ display: 'inline-block', marginBottom: '0px' }}>QUY ƯỚC TÍN HIỆU</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '200px', marginTop: '8px' }}>

                        {/* CÚI ĐẦU */}
                        {gaugeData.Roll >= 25 && gaugeData.Roll <= 34 && (
                            <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>ĐI VỀ TRƯỚC <img src={forward} alt="forward" style={{ width: '72px', height: '72px' }} /></p>
                        )}
                        {gaugeData.Roll <= -25 && gaugeData.Roll >= -34 && (
                            <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>ĐI VỀ SAU <img src={backward} alt="backward" style={{ width: '72px', height: '72px' }} /></p>
                        )}

                        {/* Điều kiện lớn */}
                        {gaugeData.Roll > 34 && (
                            <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
                                BẬT ĐÈN <img src={led_on} alt="led_on" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
                        )}
                        {gaugeData.Roll < -34 && (
                            <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
                                TẮT ĐÈN <img src={led_off} alt="led_off" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
                        )}

                        {/* NGHIÊNG ĐẦU */}
                        {gaugeData.Pitch >= 25 && gaugeData.Pitch <= 34 && (
                            <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}> ĐI VỀ PHẢI <img src={rightward} alt="rightward" style={{ width: '72px', height: '72px' }} /></p>
                        )}
                        {gaugeData.Pitch <= -25 && gaugeData.Pitch >= -34 && (
                            <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>ĐI VỀ TRÁI <img src={leftward} alt="leftward" style={{ width: '72px', height: '72px' }} /></p>
                        )}

                        {/* Điều kiện lớn */}
                        {gaugeData.Pitch > 34 && (
                            <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
                                ĐÓI BỤNG <img src={rice} alt="rice" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
                        )}
                        {gaugeData.Pitch < -34 && (
                            <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
                                KHÁT NƯỚC <img src={water} alt="water" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
                        )}

                        {/* Điều kiện nhỏ */}
                        {gaugeData.Yaw >= 25 && gaugeData.Yaw <= 34 && (
                            <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}> VUI <img src={fun} alt="fun" style={{ width: '72px', height: '72px' }} /></p>
                        )}
                        {gaugeData.Yaw <= -25 && gaugeData.Yaw >= -34 && (
                            <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>BUỒN <img src={sad} alt="sad" style={{ width: '72px', height: '72px' }} /></p>
                        )}

                        {/* Điều kiện lớn */}
                        {gaugeData.Yaw > 34 && (
                            <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
                                BUỒN NGỦ <img src={sleep} alt="sleep" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
                        )}
                        {gaugeData.Yaw < -34 && (
                            <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
                                ĐI VỆ SINH <img src={wc} alt="wc" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>
                        )}
                    </div>
                </div>
            </div>
        // </div>
        // </div >
    );

};

export default GaugeExample;

