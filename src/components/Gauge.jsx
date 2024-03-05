

import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import Thermometer from 'react-thermometer-component';
import forward from './forward.png';
import backward from './backward.png';
import rightward from './rightward.png';
import leftward from './leftward.png';
import fun from './fun.png';
import sad from './sad.png';
import rice from './rice.png';
import water from './water.png';
import sleep from './sleep.png';
import wc from './wc.png';

// Hàm chuyển đổi giá trị độ thành phần trăm
function degreeToPercentage(degree) {
    return (degree + 180) / 360;
}
// Hàm chuyển đổi giá trị gia tốc thành phần trăm
function accToPercentage(acc) {
    return (acc + 16) / 32;
}

// Component hiển thị nhiệt độ
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
    };

    // Lấy màu nền dựa trên giá trị nhiệt độ
    const backgroundColor = getBackgroundColor(value);

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

    return (
        <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '100px' }}>
            <tbody>
                <tr>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', padding: '8px' }}>
                        <h2>Cúi_Đầu</h2>
                        {/* Label cho Roll */}
                        {gaugeData.Roll > 20.62 ? <p style={{ color: 'green' }}>TRƯỚC</p> : (gaugeData.Roll < -20.62 ? <p style={{ color: 'red' }}>SAU</p> : <p></p>)}
                        <GaugeChart
                            id="gauge-chart1"
                            percent={degreeToPercentage(gaugeData.Roll)}
                            needleColor="black"
                            textColor="black"
                            arcWidth={0.2}
                            colors={['#FF0000', '#00FF00']}
                        // style={{ width: '200px', height: '200px' }} // Chỉnh kích thước đồng hồ
                        />
                        <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '0px' }}>{gaugeData.Roll.toFixed(2)}°</p>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', padding: '8px' }}>
                        <h2>Nghiêng_Đầu</h2>
                        {gaugeData.Pitch > 20.62 ? <p style={{ color: 'green' }}>PHẢI</p> : (gaugeData.Pitch < -20.62 ? <p style={{ color: 'red' }}>TRÁI</p> : <p></p>)}
                        <GaugeChart
                            id="gauge-chart3"
                            percent={degreeToPercentage(gaugeData.Pitch)}
                            needleColor="black"
                            textColor="black"
                            arcWidth={0.2}
                            colors={['#FF0000', '#00FF00']}
                        />
                        <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '0px' }}>{gaugeData.Pitch.toFixed(2)}°</p>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', padding: '8px' }}>
                        <h2>Xoay_Đầu</h2>
                        {gaugeData.Yaw > 20.62 ? <p style={{ color: 'green' }}>PHẢI</p> : (gaugeData.Yaw < -20.62 ? <p style={{ color: 'red' }}>TRÁI</p> : <p></p>)}
                        <GaugeChart
                            id="gauge-chart2"
                            percent={degreeToPercentage(gaugeData.Yaw)}
                            needleColor="black"
                            textColor="black"
                            arcWidth={0.2}
                            colors={['#FF0000', '#00FF00']}
                        />
                        <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '0px' }}>{gaugeData.Yaw.toFixed(2)}°</p>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', padding: '8px' }}>
                        <h2>Acc_X</h2>
                        <GaugeChart
                            id="gauge-chart4"
                            percent={accToPercentage(gaugeData.Acc_X)}
                            needleColor="black"
                            textColor="black"
                            arcWidth={0.2}
                            colors={['#FF0000', '#00FF00']}
                        />
                        <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '0px' }}>{gaugeData.Acc_X.toFixed(2)}m/s²</p>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', padding: '8px' }}>
                        <h2>Acc_Y</h2>
                        <GaugeChart
                            id="gauge-chart5"
                            percent={accToPercentage(gaugeData.Acc_Y)}
                            needleColor="black"
                            textColor="black"
                            arcWidth={0.2}
                            colors={['#FF0000', '#00FF00']}
                        // style={{ width: '150px', height: '150px' }} // Chỉnh kích thước đồng hồ
                        />
                        <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '0px' }}>{gaugeData.Acc_Y.toFixed(2)}m/s²</p>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', padding: '8px' }}>
                        <h2>Acc_Z</h2>
                        <GaugeChart
                            id="gauge-chart6"
                            percent={accToPercentage(gaugeData.Acc_Z)}
                            needleColor="black"
                            textColor="black"
                            arcWidth={0.2}
                            colors={['#FF0000', '#00FF00']}
                        />
                        <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '0px' }}>{gaugeData.Acc_Z.toFixed(2)}m/s²</p>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', border: '1px solid #ddd', padding: '8px', verticalAlign: 'top' }}>

                        {/* Bảng QUY ƯỚC TÍN HIỆU */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2 style={{ marginBottom: '0' }}>QUY ƯỚC TÍN HIỆU</h2>

                            {/* CÚI ĐẦU */}
                            {gaugeData.Roll >= 20 && gaugeData.Roll <= 37 ? (
                                <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>MUỐN ĐI VỀ TRƯỚC <img src={forward} alt="forward" style={{ width: '72px', height: '72px' }} /></p>
                            ) : (gaugeData.Roll <= -20 && gaugeData.Roll >= -37 ? (
                                <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>MUỐN ĐI VỀ SAU <img src={backward} alt="backward" style={{ width: '72px', height: '72px' }} /></p>
                            ) : <p></p>)}
                            {/* Điều kiện lớn */}
                            {gaugeData.Roll > 37 ? (
                                <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
                                    SỰ ĐỒNG Ý <img src={fun} alt="fun" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>) : null}
                            {gaugeData.Roll < -37 ? (
                                <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
                                    KHÔNG ĐỒNG Ý <img src={sad} alt="sad" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>) : null}
                            {/* //////////////////////////////////////////////////////// */}

                            {/* NGHIÊNG ĐẦU */}
                            {gaugeData.Pitch >= 20 && gaugeData.Pitch <= 37 ? (
                                <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>MUỐN ĐI BÊN PHẢI <img src={rightward} alt="rightward" style={{ width: '72px', height: '72px' }} /></p>
                            ) : (gaugeData.Pitch <= -20 && gaugeData.Pitch >= -37 ? (
                                <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>MUỐN ĐI BÊN TRÁI <img src={leftward} alt="leftward" style={{ width: '72px', height: '72px' }} /></p>
                            ) : <p></p>)}

                            {/* Điều kiện lớn */}
                            {gaugeData.Pitch > 37 ? (
                                <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
                                    MUỐN ĐI ĂN <img src={rice} alt="rice" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>) : null}
                            {gaugeData.Pitch < -37 ? (
                                <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
                                    MUỐN UỐNG NƯỚC <img src={water} alt="water" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>) : null}
                            {/* //////////////////////////////////////////////////////// */}


                            {/* Điều kiện nhỏ */}
                            {gaugeData.Yaw >= 20 && gaugeData.Yaw <= 37 ? (
                                <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>CẢM THẤY VUI <img src={fun} alt="fun" style={{ width: '72px', height: '72px' }} /></p>
                            ) : (gaugeData.Yaw <= -20 && gaugeData.Yaw >= -37 ? (
                                <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>CẢM THẤY MỆT <img src={sad} alt="sad" style={{ width: '72px', height: '72px' }} /></p>
                            ) : <p></p>)}
                            {/* Điều kiện lớn */}
                            {gaugeData.Yaw > 37 ? (
                                <p style={{ color: 'green', fontSize: '27px', fontWeight: 'bold' }}>
                                    MUỐN ĐI NGỦ <img src={sleep} alt="sleep" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>) : null}
                            {gaugeData.Yaw < -37 ? (
                                <p style={{ color: 'red', fontSize: '27px', fontWeight: 'bold' }}>
                                    MUỐN ĐI VỆ SINH <img src={wc} alt="wc" style={{ width: '72px', height: '72px', display: 'block', margin: '0 auto' }} /></p>) : null}
                        </div>
                    </td>
                    <td colSpan="3" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', padding: '8px' }}>
                        <Temp value={gaugeData.Nhiet_Do_Phong} title={<span style={{ color: 'yellow' }}>Nhiet_Do_Phong</span>} />
                        <Temp value={gaugeData.Nhiet_Do_Dau} title={<span style={{ color: 'yellow' }}>Nhiet_Do_Dau</span>} />

                        {gaugeData.Nhiet_Do_Dau < 37.5 ? <p style={{ color: 'green' }}>KHỎE MẠNH</p> : (gaugeData.Nhiet_Do_Dau > 37.5 ? <p style={{ color: 'red' }}>BỊ ỐM</p> : <p></p>)}
                    </td>

                </tr>
            </tbody>
        </table>
    );
};

export default GaugeExample;


