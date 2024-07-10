import React, { useState, useEffect } from 'react';
import LoginWithFacebook from './components/LoginWithFacebook';
import axios from 'axios';

const App = () => {
    const [userData, setUserData] = useState(null);
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [pageInsights, setPageInsights] = useState(null);

    const handleLogin = async (data) => {
        setUserData(data);
        const pagesResponse = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${data.accessToken}`);
        setPages(pagesResponse.data.data);
    };

    const handlePageSelect = async (pageId) => {
        setSelectedPage(pageId);
        const insightsResponse = await axios.get(`https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_reactions&access_token=${userData.accessToken}&since=YYYY-MM-DD&until=YYYY-MM-DD&period=total_over_range`);
        setPageInsights(insightsResponse.data.data);
    };

    return (
        <div>
            {!userData ? (
                <LoginWithFacebook onLogin={handleLogin} />
            ) : (
                <div>
                    <h1>Welcome, {userData.name}</h1>
                    <img src={userData.picture.data.url} alt="Profile" />
                    <select onChange={(e) => handlePageSelect(e.target.value)}>
                        <option value="">Select a page</option>
                        {pages.map(page => (
                            <option key={page.id} value={page.id}>{page.name}</option>
                        ))}
                    </select>
                    {pageInsights && (
                        <div>
                            <div>Total Followers: {pageInsights.find(metric => metric.name === 'page_fans').values[0].value}</div>
                            <div>Total Engagement: {pageInsights.find(metric => metric.name === 'page_engaged_users').values[0].value}</div>
                            <div>Total Impressions: {pageInsights.find(metric => metric.name === 'page_impressions').values[0].value}</div>
                            <div>Total Reactions: {pageInsights.find(metric => metric.name === 'page_reactions').values[0].value}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;