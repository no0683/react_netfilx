import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from '../../components/card/index';
import Player from '../../components/player/index';

const category = 'series';

const slideRows = [
    {
        title: "Documentaries",
        data: [
            {
                id: "4f8b816f-7784-446d-900f-1780ad55c81a",
                maturity: "18",
                slug: "tiger-king",
                title: "Tiger King",
                genre: "documentaries",
                description: "Tiger King description",
                docId: "LS2Ysn2RsDUFZegkAvbR"
            }
        ]
    },
    {
        title: "Feel Good",
        data: [
            {
                maturity: "11",
                title: "Juno",
                description: "Juno description",
                slug: "juno",
                id: "55117438-a1f1-4840-aca0-ca1eba10c199",
                genre: "feel-good",
                docId: "QemeXfLYh0GdsdQkGph4"
            }
        ]
    }
];

describe('<Card />', () => {
    it('renders the <Card /> with populated data', () => {
        const { container, getByText } = render (
            <Card.Group>
                {slideRows.map((slideItem) => (
                    <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                        <Card.Title>{slideItem.title}</Card.Title>
                        <Card.Entities>
                            {slideItem.data.map((item) => (
                                <Card.Item key={item.docId} item={item}>
                                    <Card.Image 
                                        src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                                    />
                                    <Card.Meta>
                                        <Card.SubTitle>{item.title}</Card.SubTitle>
                                        <Card.Text>{item.description}</Card.Text>
                                    </Card.Meta>
                                </Card.Item>
                            ))}
                        </Card.Entities>
                        <Card.Feature category={category}>
                            <Player>
                                <Player.Button />
                                <Player.Video src="/videos/bunny.mp4" />
                            </Player>
                        </Card.Feature>
                    </Card>
                ))}
            </Card.Group>
        );

        expect(getByText('Documentaries')).toBeTruthy();
        expect(getByText('Tiger King')).toBeTruthy();
        expect(getByText('Tiger King description')).toBeTruthy();

        expect(getByText('Feel Good')).toBeTruthy();
        expect(getByText('Juno')).toBeTruthy();
        expect(getByText('Juno description')).toBeTruthy();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the <Card /> with toggles the card feature', () => {
        const { container, queryByText, getByAltText, getByTestId } = render (
            <Card.Group>
                {slideRows.map((slideItem) => (
                    <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                        <Card.Title>{slideItem.title}</Card.Title>
                        <Card.Entities>
                            {slideItem.data.map((item) => (
                                <Card.Item key={item.docId} item={item} data-testid={`${item.slug}-item-feature`}>
                                    <Card.Image 
                                        src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                                    />
                                    <Card.Meta>
                                        <Card.SubTitle>{item.title}</Card.SubTitle>
                                        <Card.Text>{item.description}</Card.Text>
                                    </Card.Meta>
                                </Card.Item>
                            ))}
                        </Card.Entities>
                        <Card.Feature category={category}>
                            <Player>
                                <Player.Button />
                                <Player.Video src="/videos/bunny.mp4" />
                            </Player>
                        </Card.Feature>
                    </Card>
                ))}
            </Card.Group>
        );

        expect(queryByText('18')).toBeFalsy();
        fireEvent.click(getByTestId('tiger-king-item-feature'));
        expect(queryByText('18')).toBeTruthy();

        fireEvent.click(getByAltText('Close'));
        expect(queryByText('18')).toBeFalsy();

        expect(queryByText('PG')).toBeFalsy();
        fireEvent.click(getByTestId('juno-item-feature'));
        expect(queryByText('PG')).toBeTruthy();

        fireEvent.click(getByAltText('Close'));
        expect(queryByText('PG')).toBeFalsy();
        expect(container.firstChild).toMatchSnapshot();
    });
});