import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Col,
  Input,
  Row,
  notification
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash'

import { GetCards, SetCardsState } from './reducers/cards';

import './App.css'
import NoImage from './images/no-image-placeholder.png'

const App = () => {
  const dispatch = useDispatch();

  const {
    cards,
    total,
    err,
    loading
  } = useSelector((state) => state.cards);

  const scrollVariable = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageLimit, setPageLimit] = useState(20);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title, mess) => {
    api[type]({
      message: title,
      description: mess
    });
  };

  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (cards?.length < total) {
        if (searchKeyword) {
          if (cards.length >= 20) {
            setPageLimit(pageLimit + 20)
          }
        } else {
          setPageLimit(pageLimit + 20)
        }
      }
    }
  };

  const handleSearch = debounce((value) => {
    setSearchKeyword(value);
    setPageLimit(20)
  }, 500);

  useEffect(() => {
    dispatch(GetCards({
      searchKeyword,
      limit: pageLimit,
    }))
  }, [searchKeyword, pageLimit]);

  useEffect(() => {
    if (scrollVariable && scrollVariable.current) {
      scrollVariable.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cards]);

  useEffect(() => {
    if (err) {
      openNotificationWithIcon('error', 'Error', err);
      dispatch(SetCardsState({ field: 'err', value: '' }));
    }
  }, [err]);

  return(
    <div style={{maxWidth: '1366px', margin: '0 auto'}} ref={scrollVariable}>
      {contextHolder}
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        addonBefore={<SearchOutlined />}
        placeholder="Enter a name ..."
      />
      {
        loading ? (
          <div className="loader-main">
            <div class="loader"></div>
          </div>
        )
        : (
          <div>
            <Row gutter={[16,24]}>
              {cards?.map((element, i) => (
                <Col span={4}>
                <Card
                  key={i}
                  bordered={false}
                  hoverable
                  cover={<img alt={element.name} src={element.imageUrl || NoImage} height={250} />}
                >
                  {element.name}
                </Card>
                </Col>
              ))}
            </Row>
          </div>
        )
      }

    </div>
  )
};
export default App;