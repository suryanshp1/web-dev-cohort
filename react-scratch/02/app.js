import React from "https://esm.sh/react@19.0.0";
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";

const Chai = (props) => {
    return React.createElement(
        'div',
        {},
        [
            React.createElement(
                'h1',
                null,
                props.name || 'name not found'
            ),
            React.createElement(
                'p',
                null,
                props.desc || 'description not found'
            )
        ]
    )
}

const App = () => {
    return React.createElement(
        'div',
        { className: 'container' },
        [
            React.createElement(
                'h1',
                null,
                'Hello React'
            ),
            React.createElement(Chai, { name: 'Chai', desc: 'Chai is a tea' })
        ]
    )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
    React.createElement(App)
)