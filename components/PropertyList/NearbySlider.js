import React, { Component } from "react";
import Slider from "react-slick";

import PropertyListItem from './PropertyListItem';
import SearchAlertBox from '../SearchAlertBox';
import Row from 'react-bootstrap/Row'
import styles from './PropertyList.module.scss'

const NearbySlider = props => {
  const {slideData, router } = props;

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      cssEase: "linear",
      pauseOnHover: true
    };
    return (
      <div>

        <Slider {...settings}>

        {slideData.content &&
                      slideData.content.slice(0, 3).map((item, index) => {
                        return (
          <div>
          
          <Row
            style = {
                {
                  padding: '0 4px'
                }
              } >
            
                  <>
                    <div
                      className={styles['PropertyList__item--wrapper']}
                      key={index}
                    >
                      <PropertyListItem
                        data={item}
                        router={router}
                        index={index}
                        url={
                          (router.asPath && /buy/.test(router.asPath)) ||
                          /beli/.test(router.asPath)
                            ? 'buy'
                            : 'rent'
                        }
                      />
                    </div>

                    {slideData.content.length > 10 &&
                    Math.floor(slideData.content.length / 2) ===
                      index ? (
                      <Col
                        xs={12}
                        className='d-sm-none'
                        style={{
                          marginBottom: '1rem'
                        }}
                      >
                        <SearchAlertBox
                          mobile={true}
                          handleOpenAlertModal={() =>
                            setShowAlertModal(true)
                          }
                          openUpdateEmailPopUpModal={() =>
                            setOpenEmailPopUpModal(true)
                          }
                        />
                      </Col>
                    ) : null}
                  </>
                
          </Row>

          </div>

          )
                      })}
          
        </Slider>
      </div>
    );

}

export default NearbySlider