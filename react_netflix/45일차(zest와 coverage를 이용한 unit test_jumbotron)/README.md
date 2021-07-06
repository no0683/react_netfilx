## Netflix 클론 사이트 만들기(ver.2021/06/29)

[code coverage를 이용한 unit test 진행상황]
<img src="public/images/misc/react_netflix_20210629.jpg" width="90%" height="80%" alt="react_netflix"></img>

* 오늘은 home 페이지화면에서 jumbotron영역의 요소들이 정상적으로 작동하는지 테스트 했습니다.
* jumbotron에서 테스트할 요소는 아래와같고 이것들이 정상적으로 작동(true)하는지에대한 검증입니다.
-getByText, getByAltText, getByTestId를 이용하여 해당 엘리먼트를 찾은 후 정상적으로 truthy하게 렌더링되는지여부 

[src/__tests__/components/jumbotron.test.js]
```javascript
import React from 'react';
import { render } from '@testing-library/react';
import Jumbotron from '../../components/jumbotron/index';
import jumboData from '../../fixtures/jumbo.json';

describe('<Jumbotron />', () => {
    it('renders the <Jumbotron /> with populated data', () => {
        const { container, getByText, getByAltText, getByTestId } = render(
            <Jumbotron.Container>
                {jumboData.map((item) => (
                <Jumbotron key={item.id}>
                    <Jumbotron.Pane>
                        <Jumbotron.Title>{item.title}</Jumbotron.Title>
                        <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
                    </Jumbotron.Pane>
                    <Jumbotron.Pane>
                        <Jumbotron.Image src={item.image} alt={item.alt} data-testid={`${item.id}-jumbo-image`}/>
                    </Jumbotron.Pane>
                </Jumbotron>
                ))}
            </Jumbotron.Container>
        );

        expect(getByText('Enjoy on your TV.')).toBeTruthy();
        expect(getByAltText('Tiger King on Netflix')).toBeTruthy();
        expect(getByTestId('1-jumbo-image')).toBeTruthy();
        expect(getByText('Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.')).toBeTruthy();
        expect(container.firstChild).toMatchSnapshot();
    });
});
```