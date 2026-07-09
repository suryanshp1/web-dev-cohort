import { useState } from "react";
import { useRandomUser } from "./hooks/use-random-user.tsx";
import Counter from "./components/counter.tsx";

function App() {

    const { user, fetchRandomUser, isFetching, error } = useRandomUser();

    // const [count, setCount] = useState(1);

    const [flag, setFlag] = useState(true);

    return (
        <div>

            {/* {new Array(2).fill(null).map((_, i) => <Counter key={i} />)} */}
            {flag ? <Counter key="v" playerName="Virat" /> : <Counter key="r" playerName="Rohit" />}
            <button onClick={() => setFlag(!flag)}>Toggle</button>

            {/* <button onClick={() => setCount(count + 1)}>Add Counter</button>
            <div>
                {new Array(count).fill(null).map((_, i) => <Counter key={i} />)}
            </div> */}
            <div>
                <br />
                <button onClick={fetchRandomUser}>Fetch Random User</button>
                {user ? (
                    isFetching ? (
                        <h1>Loading...</h1>
                    ) : (
                        <h1>
                            {user.name.first} {user.name.last}
                        </h1>
                    )
                    ) : (
                        "No user found"
                )}
            </div>
            {error && <div>Error: {error}</div>}
        </div>
    );
}

export default App;