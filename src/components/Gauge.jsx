import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

const fetchGaugeData = async () => {
    try {
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-khcpn/endpoint/Get_Gauge');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        return {
            Acc_X: data[0]?.public?.input?.jsonData?.x,
            Acc_Y: data[0]?.public?.input?.jsonData?.y,
            // Roll_bap_chan_trai_moi: data?.Roll_bap_chan_trai_moi || 0,
            // Roll_bap_chan_phai_moi: data?.Roll_bap_chan_phai_moi || 0,
        };
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
};

const GaugeExample = () => {
    const [gaugeData, setGaugeData] = useState({
        Acc_X: 0,
        Acc_Y: 0,

    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchGaugeData();
            if (data) {
                setGaugeData(data);
            }
        };

        fetchData();
    }, []); // Chạy một lần khi component được mount

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: 'auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Roll Angle - Left Leg</h2>
                <GaugeChart
                    id="gauge-chart1"
                    percent={(gaugeData.Acc_X + Math.PI) / (2 * Math.PI)}
                    needleColor="red"
                    textColor="black"
                />
                <h2>Roll Angle - Left Leg Knee</h2>
                <GaugeChart
                    id="gauge-chart3"
                    percent={(gaugeData.Acc_Y + Math.PI) / (2 * Math.PI)}
                    needleColor="green"
                    textColor="black"
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                <h2>Roll Angle - Right Leg</h2>
                <GaugeChart
                    id="gauge-chart2"
                    percent={(gaugeData.Roll_dui_phai_moi + Math.PI) / (2 * Math.PI)}
                    needleColor="red"
                    textColor="black"
                />
                <h2>Roll Angle - Right Leg Knee</h2>
                <GaugeChart
                    id="gauge-chart4"
                    percent={(gaugeData.Roll_bap_chan_phai_moi + Math.PI) / (2 * Math.PI)}
                    needleColor="blue"
                    textColor="black"
                />
            </div>
        </div>
    );
};

export default GaugeExample;