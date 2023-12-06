import React, { useState, useCallback, useEffect } from 'react'
import { Grid } from '@mui/material'
import cn from 'classnames'
import { useRouter } from 'next/router'
import useFetchData from '../../../utils/hooks/useFetchData'
import useDebounce from '../../../utils/hooks/useDebounce'
import handleQueryParams from '../../../utils/queryParams'
import MuiChip from '../../../components/MuiComponent/MuiChip/MuiChip'
import Slider from 'react-slick'
import Icon from '../../../components/Icon'
import Card from '../../../components/Card'
import Dropdown from '../../../components/Dropdown'
import priceRange from '../../../utils/constants/priceRange'
import { OPTIONS } from '../../../utils/constants/appConstants'
import MuiFilter from '../../../components/MuiComponent/MuiFilter/MuiFilter'
import MediaCard from '../../../components/MuiComponent/MuiCard/card'
import { getPhotoGrapherDetails } from '../../../globalServices/getPhotoGrapherDetails'

import styles from './Discover.module.sass'

const ChipItem = [
  {
    label: "All",
    id: 1,
    isSelected: true
  },
  {
    label: "Wedding",
    id: 1,
    isSelected: false
  },
  {
    label: "E commerce",
    id: 2,
    isSelected: false
  },
  {
    label: "Newborn",
    id: 3,
    isSelected: false
  },

]


const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button aria-label="arrow" aria-hidden="true" {...props}>
    {children}
  </button>
)

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 2,
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
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 100000,
      settings: 'unslick',
    },
  ],
}

const Discover = ({ info, type }) => {
  const { push } = useRouter()
  const [photGapherList, setPhotoGrapherList] = React.useState([])
  const { data: filterResult, fetchData } = useFetchData([])
  const [chipList, setChipList] = React.useState(ChipItem)

  React.useEffect(() => {
    getPhotoGrapherDetails()
      .then((result) => {
        setPhotoGrapherList([...result.items.slice(0, 8)])
      })

  }, [])

  const handleSelectChip = (id) => {
    const updatedList = chipList.map((chip) => {
      if (chip.id === id) {
        return {
          ...chip,
          isSelected: !chip.isSelected
        }
      }
      return chip
    })
    setChipList([...updatedList])
  }

  const [activeIndex, setActiveIndex] = useState(
    type ? Object.entries(type)[0]?.[0] : ''
  )
  const [option, setOption] = useState(OPTIONS[0])
  const [visible, setVisible] = useState(false)

  const [{ min, max }, setRangeValues] = useState(() => priceRange)
  const debouncedMinTerm = useDebounce(min, 700)
  const debouncedMaxTerm = useDebounce(max, 700)

  const handleClick = href => {
    push(href)
  }

  const handleFilterDataByParams = useCallback(
    async ({
      category = activeIndex,
      color = option,
      min = debouncedMinTerm,
      max = debouncedMaxTerm,
    }) => {
      const params = handleQueryParams({
        category,
        color,
        min: min.trim(),
        max: max.trim(),
      })

      const filterParam = Object.keys(params).reduce(
        (acc, key) => acc + `&${key}=` + `${params[key]}`,
        ''
      )

      fetchData(`/api/filter?${filterParam}`)
    },
    [activeIndex, debouncedMinTerm, debouncedMaxTerm, fetchData, option]
  )

  const handleCategoryChange = useCallback(
    async category => {
      setActiveIndex(category)
      handleFilterDataByParams({ category })
    },
    [handleFilterDataByParams]
  )

  const handleChange = ({ target: { name, value } }) => {
    setRangeValues(prevFields => ({
      ...prevFields,
      [name]: value,
    }))
  }

  const getDataByFilterOptions = useCallback(
    async color => {
      setOption(color)
      handleFilterDataByParams({ color })
    },
    [handleFilterDataByParams]
  )

  useEffect(() => {
    let isMount = true

    if (isMount && (debouncedMinTerm?.length || debouncedMaxTerm?.length)) {
      handleFilterDataByParams({ min: debouncedMinTerm, max: debouncedMaxTerm })
    } else {
      handleFilterDataByParams({ category: activeIndex })
    }

    return () => {
      isMount = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMaxTerm, debouncedMinTerm])

  const handleBookPhotoGrapher = (key)=>{

    router.push({
     pathname: `/photographerbooking/${key}`,
     query:{
      startDate: new Date().toString() ,
      endDate: new Date().toString(),
     }
    })
  }

  return (
    <div className={cn('section', styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.head}>
          <div className={styles.stage}>
            Create, explore, & collect digital art.
          </div>
          <div className={styles.header}>
            <h3 className={cn('h3', styles.title)}>Discover</h3>
            <button
              onClick={() => handleClick(`/search?category=${activeIndex}`)}
              className={cn('button-stroke', styles.button)}
            >
              Start search
            </button>
          </div>
        </div>
        <div className={styles.top}>
          <div className={styles.dropdown}>


            <div className={styles.nav}>
              <MuiChip setChipList={handleSelectChip} chipList={chipList} />
            </div>
          </div>
          <button
            className={cn(styles.filter, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <div className={styles.text}>Filter</div>
            <div className={styles.toggle}>
              <Icon name="filter" size="18" />
              <Icon name="close" size="10" />
            </div>
          </button>
        </div>
        <div className={cn(styles.filters, { [styles.active]: visible })}>
          <div className={styles.sorting}>
            <div className={styles.cell}>
              <MuiFilter />

            </div>
          </div>
        </div>
        <div className={styles.list}>
          <Slider
            aria-hidden="true"
            className={cn('discover-slider', styles.slider)}
            {...settings}
          >
            {photGapherList?.length ? (
              photGapherList?.map((info, index) => (
                <Grid item xs={3} md={3} key={index} sx={{width:"260px",margin:"15px 13px"}}>
                  <MediaCard key={index} items={info} bookNowHandler={handleBookPhotoGrapher} />
                </Grid>
              ))
            ) : (
              <p className={styles.inform}>Try another category!</p>
            )}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Discover
