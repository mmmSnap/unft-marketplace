import React from 'react'
import cn from 'classnames'
import Slider from 'react-slick'
import Icon from '../Icon'
import Card from '../Card'
import { axionInstace } from '../../globalServices/axionInstace'
import styles from './HotBid.module.sass'
import MuiLoader from '../MuiComponent/MuiLoader/MuiLoader'

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button aria-label="arrow" aria-hidden="true" {...props}>
    {children}
  </button>
)

const settings = {
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
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
      breakpoint: 1179,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
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

const Hot = ({ classSection, info }) => {
  const [photGapherList, setPhotoGrapherList] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const getPhotGrapherDeatisl = () => {
    axionInstace.get(`/search?query=${'A'}`)
      .then((result) => {
        console.log("result,", result.data)
        setPhotoGrapherList([...result.data.items])
        setLoading(false)
      }).catch((e) => {
        console.log(e)
      })
  }

  React.useEffect(() => {
    getPhotGrapherDeatisl()
  }, [])

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.wrapper}>
          <h2 className={cn('h3', styles.title)}>Top Photographer in {'Mumbai'}</h2>
          <div className={styles.inner}>
            {loading ? (<MuiLoader loading={loading} />) :
              <Slider className="bid-slider" {...settings}>
                {photGapherList &&
                  photGapherList?.map((x, index) => (
                    <Card key={index} className={styles.card} item={x} />
                  ))}
              </Slider>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hot
