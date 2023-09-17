import React, { useState } from 'react'
import cn from 'classnames'
import Slider from 'react-slick'
import Icon from '../../../components/Icon'
import Image from '../../../components/Image'

import styles from './Partners.module.sass'

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button aria-label="arrow" aria-hidden="true" {...props}>
    {children}
  </button>
)

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: (
    <SlickArrow>
      <Icon name="arrow-next" size="14" />
    </SlickArrow>
  ),
  prevArrow: (
    <SlickArrow>
      <Icon name="arrow-prev" size="14" />
    </SlickArrow>
  ),
  responsive: [
    {
      breakpoint: 1340,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
  ],
}

const Partners = ({ info }) => {
  return (
    <section className="section-bg">
      <div className={styles.section}>
        <div className={cn('container', styles.container)}>
          <div className={styles.top}>
            <div className={styles.box}>
              <div className={styles.stage}>Happy Customers!</div>
              <h2 className={cn('h3', styles.title)}>Reviews</h2>
            </div>
          </div>
          <div className={styles.wrapper}>
            <Slider className="popular-slider" {...settings}>
              {info?.map((x, index) => (
                <div className={styles.slide} key={index}>
                  <div className={styles.item}>
                    <div className={styles.body}>
                      <div className={styles.avatar}>
                        <Image
                          size={{ width: '86px', height: '86px' }}
                          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=996&t=st=1694971127~exp=1694971727~hmac=4b9d7f6068e77449d6637c3bb29c3ffc0a030a387e1f3821eea9293ec03c3711"
                          alt="Avatar"
                          objectFit="cover"
                        />
                        <div className={styles.reward}>
                          <Image
                            size={{ width: '28px', height: '28px' }}
                            src="/images/content/reward-1.svg"
                            alt="Reward"
                          />
                        </div>
                      </div>
                      <div className={styles.name}>{x?.metadata?.name}</div>
                      <div
                        className={styles.price}
                        dangerouslySetInnerHTML={{
                          __html: x?.metadata?.position,
                        }}
                      />
                      <div className={styles.name}>{x?.metadata?.comment}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
