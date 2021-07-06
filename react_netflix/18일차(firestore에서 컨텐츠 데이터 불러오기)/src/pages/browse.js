import React from 'react';
import useContent from '../hooks/use-content';

export default function Browse() {
    const { series } = useContent('series');
    console.log(series);

    return <p>Hello from the browse!</p>;
}