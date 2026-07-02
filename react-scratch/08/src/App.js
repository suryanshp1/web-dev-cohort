import React from "react";

export default function App() {
    return React.createElement(
        'div',
        { style: { color: 'orange' } },
        [
            React.createElement('h1', { key: 'h1' }, 'Hello World'),
            React.createElement('p', { key: 'p' }, 'Hello World'),
        ]
    )
}