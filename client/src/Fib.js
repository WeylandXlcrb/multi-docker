import React, {useEffect, useState} from 'react';
import axios from 'axios';

function renderSeenIndexes(indexes) {
    return indexes.map(({number}) => number).join(', ');
}

function renderValues(values) {
    return Object.keys(values).map((key) => (
        <div key={key}>For index {key} I calculated {values[key]}</div>
    ));
}

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    async function fetchValues() {
        const values = await axios.get('/api/values/current');
        setValues(values.data)
    }

    async function fetchIndexes() {
        const indexes = await axios.get('/api/values/all');
        setSeenIndexes(indexes.data)
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        await axios.post('/api/values', {index});

        setIndex('');
        fetchValues();
        fetchIndexes();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="asd">Enter your index:</label>
                <input
                    type="text"
                    id="asd"
                    value={index}
                    onChange={(evt) => setIndex(evt.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes(seenIndexes)}
            <h3>Calculated Values</h3>
            {renderValues(values)}
        </div>
    );
};

export default Fib;