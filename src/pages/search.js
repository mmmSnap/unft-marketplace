import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Grid } from '@mui/material'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useStateContext } from '../utils/context/StateContext'
import useDebounce from '../utils/hooks/useDebounce'
import useFetchData from '../utils/hooks/useFetchData'
import { getAllDataByType, getDataByCategory } from '../lib/cosmic'
import MuiSearchComponent from '../components/MuiComponent/MuiSearchComponent/MuiSearchComponent'
import MuiChip from '../components/MuiComponent/MuiChip/MuiChip'
import Layout from '../components/Layout'
import Divider from '@mui/material/Divider';
import priceRange from '../utils/constants/priceRange'
import handleQueryParams from '../utils/queryParams'
import { OPTIONS } from '../utils/constants/appConstants'
import MuiVerticleFilter from '../components/MuiComponent/MuiFilter/MuiVerticleFilter'
import { ChipItem } from '../GlobalConst/ChipConst'
import styles from '../styles/pages/Search.module.sass'
import { PageMeta } from '../components/Meta'
import { axionInstace } from '../globalServices/axionInstace'
import {
  FilterConstData,
  EXPERTISE,
  GENDER,
  PRICE,
  SKILLS,
} from "../GlobalConst/consts";
import MuiLoader from '../components/MuiComponent/MuiLoader/MuiLoader'
import MediaCard from '../components/MuiComponent/MuiCard/card'
import MuiDateComponent from '../components/MuiComponent/MuiDateComponent/MuiDateComponent'
import useMuiDateHook from '../components/MuiComponent/MuiDateComponent/useMuiDateHook'

const Search = ({ categoriesGroup, navigationItems, categoryData }) => {
  const { query, push } = useRouter()
  const { categories } = useStateContext()
  const [updateList, setUpdatedList] = React.useState([]);
  const [orignalList, setOrignalList] = React.useState([])
  const [loader, setLoader] = React.useState(true)
  const { data: searchResult, fetchData } = useFetchData(
    categoryData?.length ? categoryData : []
  )
  const {fieldsForm,form}  = useMuiDateHook({})

  const categoriesTypeData = categoriesGroup['type'] || categories['type']
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 600)
  const router = useRouter()

  function intersect(a, b) {
    return !!a.filter(Set.prototype.has, new Set(b)).length;
  }
  const valeExtractFromObject = (objectArray) => {
    return objectArray.map(({ label }) => label);
  };

  const [chipList, setChipList] = React.useState(ChipItem)

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

  

  const filterData = (listData, filterType) => {
    const gender = listData;
    const localData = JSON.parse(JSON.stringify(orignalList));
    let filterList = [];
    switch (filterType) {
      case GENDER:
        filterList = localData.filter((item) => {
          FilterConstData.gender = valeExtractFromObject(listData);

          return intersect([item.gender], FilterConstData.gender);
        });
        break;
      case PRICE:
        filterList = localData.filter((item) => {
          FilterConstData.price = valeExtractFromObject(listData);

          return intersect([item.price?.label || ""], FilterConstData.price);
        });
        break;

      case EXPERTISE:
        filterList = localData.filter((item) => {
          FilterConstData.expertise = valeExtractFromObject(listData);
          return intersect(item.expertise, FilterConstData.expertise);
        });
        break;
      case SKILLS:

        filterList = localData.filter((item) => {
          FilterConstData.skills = valeExtractFromObject(listData);
          return intersect(item.skills, FilterConstData.skills);
        });
        break;
      default:
    }
    if (
      FilterConstData.gender.length ||
      FilterConstData.skills.length ||
      FilterConstData.expertise.length ||
      FilterConstData.price.length
    ) {
      setUpdatedList([...filterList]);
    } else {
      setUpdatedList([...localData]);
    }
  };

  const getPhotGrapherDeatisl = () => {
    setLoader(true)
    axionInstace.get(`/v1/search?query=${search || 'A'}`)
      .then((result) => {
        orignalList = JSON.parse(JSON.stringify(result.data.items))
        setUpdatedList([...result.data.items])
        setOrignalList([...result.data.items])
        setLoader(false)
      }).catch((e) => {
        setLoader(false)
      })
  }

  React.useEffect(() => {

    getPhotGrapherDeatisl()

  }, [])

 

  const handleBookPhotoGrapher = (key)=>{
   const {getValues} = form
   const dateValue = getValues()
    router.push({
     pathname: `/photographerbooking/${key}`,
     query:{
      startDate: dateValue.startDate.toString() ,
      endDate: dateValue.endDate.toString(),
     }
    })
  }


  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'Discover | uNFT Marketplace'}
        description={
          'uNFT Marketplace built with Cosmic CMS, Next.js, and the Stripe API'
        }
      />
      <div className={cn('section-pt80', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.row}>
            <div className={styles.filters}>
              <div className={styles.top}>
                <div className={styles.title}>Search</div>
              </div>

              <div className={styles.form}>
                <div className={styles.label}>Search keyword</div>
                <MuiSearchComponent search={search} setSearch={setSearch} getPhotGrapherDeatisl={getPhotGrapherDeatisl} />
                <div>
                  <MuiDateComponent colSize={12} fieldsForm={fieldsForm} />
                </div>
              </div>
              <div className={styles.label}>Filter</div>
              <Divider color="primary" textAlign='left' />


              <div className={styles.sorting}>

                <div className={styles.dropdown}>
                  <MuiVerticleFilter filterData={filterData} />

                </div>
              </div>


            </div>
            <div className={styles.wrapper}>
              <div className={styles.nav}>
                <MuiChip setChipList={handleSelectChip} chipList={chipList} />

              </div>
              <div className={styles.list}>
                {loader ? (<div className={styles.loader}>
                  <MuiLoader loading={loader} height={400} />
                </div>) :
                  <Grid
                    container
                    display="flex"
                    // justifyContent="center"
                    // alignItems="center"
                    spacing={1}
                    sx={{ marginTop: '50px' }}
                  >{updateList?.length ? (
                    updateList?.map((x, index) => (
                      // <Card className={styles.card} item={x} key={index} />
                      <Grid item xs={4} md={4} key={index}>
                        <MediaCard items={x} bookNowHandler={handleBookPhotoGrapher} />
                      </Grid>

                    ))
                  ) : (
                    <p className={styles.inform}>Try another category!</p>
                  )}</Grid>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search

export async function getServerSideProps({ query }) {
  const navigationItems = (await getAllDataByType('navigation')) || []

  const categoryTypes = (await getAllDataByType('categories')) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )

  const categoryData = query?.hasOwnProperty('category')
    ? await getDataByCategory(query['category'])
    : []

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  return {
    props: { navigationItems, categoriesGroup, categoryData },
  }
}
