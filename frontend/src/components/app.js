import React, {Component} from "react";
import * as ReactDOMClient from 'react-dom/client';

export default class App extends Component{
    constructor(props){
        super(props);
    }


    render (){
        return <h1>Test</h1>;
    }
}


const appDiv = document.getElementById("app");
const root = ReactDOMClient.createRoot(appDiv);

root.render(<App/>)