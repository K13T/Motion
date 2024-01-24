import React from 'react'; const Dashboard = () => {
    const dashboardUrl = "https://charts.mongodb.com/charts-gia-tri-jnfzh/public/dashboards/e738bb8a-3e0c-4a87-a96a-2a3afa3016c5";

    return (
        <div>

            <iframe
                title="Dashboard"
                width="100%"
                height="3400"
                src={dashboardUrl}
                frameBorder="0"
            ></iframe>
        </div>
    );
}; export default Dashboard;
