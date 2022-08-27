import React from "react";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '508376920089-dfal13i14s4tlhmlsle995pr5ucdns1s.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: "streamy"
            });
        });
    }

    render() {
        return <div>GoogleAuth</div>;
    }
}

export default GoogleAuth;
