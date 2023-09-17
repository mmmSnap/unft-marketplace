import { useEffect, useCallback } from 'react'
import { useStateContext } from '../utils/context/StateContext'
import Layout from '../components/Layout'
import {
  Intro,
  Selection,
  Partners,
  HotBid,
  Categories,
  Discover,
  Description,
} from '../screens/Home'
import chooseBySlug from '../utils/chooseBySlug'
import { getDataByCategory, getAllDataByType } from '../lib/cosmic'

const Home = ({
  reviews,
  landing,
  categoriesGroup,
  categoryTypes,
  navigationItems,
}) => {
  const { categories, onCategoriesChange, setNavigation } = useStateContext()

  const handleContextAdd = useCallback(
    (category, data, navigation) => {
      onCategoriesChange({ groups: category, type: data })
      setNavigation(navigation)
    },
    [onCategoriesChange, setNavigation]
  )

  useEffect(() => {
    let isMounted = true

    if (!categories['groups']?.length && isMounted) {
      handleContextAdd(
        categoriesGroup?.groups,
        categoriesGroup?.type,
        navigationItems[0]?.metadata
      )
    }

    return () => {
      isMounted = false
    }
  }, [
    categories,
    categoriesGroup,
    categoryTypes,
    handleContextAdd,
    navigationItems,
  ])

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <Description info={chooseBySlug(landing, 'marketing')} />
      <HotBid classSection="section" info={categoriesGroup['groups'][0]} />
      <Discover
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
      <Categories
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
      <Intro info={chooseBySlug(landing, 'introduction')} />
      
      <Partners info={reviews} />
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  //const reviews = (await getAllDataByType('reviews')) || []
  console.log("--------------------------------------------------------");
  //console.log(reviews);
  const landing = (await getAllDataByType('landings')) || []
  const categoryTypes = (await getAllDataByType('categories')) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )
  const navigationItems = (await getAllDataByType('navigation')) || []

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  let reviewsData = [
    {
      id: '64d8bce20908fa0008122654',
      slug: 'uihf',
      title: 'Aadil Hussain',
      metadata: {
        name: 'Aadil Hussain',
        image: "[Object]",
        position: 'Photographer',
        comment: 'It was nice experience with Make my memories '
      }
    },
    {
      id: '64d882a007970f72960079c3',
      slug: 'review-5',
      title: 'Review-5',
      metadata: {
        name: 'Odell Hane',
        image: "[Object]",
        position: 'Content creator',
        comment: 'Lorem ipsum is placeholder text commonly used in the graphic.'
      }
    },
    {
      id: '64d882a007970f72960079c4',
      slug: 'review-4',
      title: 'Review-4',
      metadata: {
        name: 'Payton Kunde',
        image: "[Object]",
        position: 'Software designer',
        comment: 'Lorem ipsum is placeholder text commonly used in the graphic'
      }
    },
    {
      id: '64d882a007970f72960079c5',
      slug: 'review-3',
      title: 'Review-3',
      metadata: {
        name: 'Marlee Kuphal',
        image: "[Object]",
        position: 'Creative Designer',
        comment: 'Lorem ipsum is placeholder text commonly used in the graphic'
      }
    },
    {
      id: '64d882a107970f72960079c7',
      slug: 'review-2',
      title: 'Review-2',
      metadata: {
        name: 'Odell Hane',
        image: "[Object]",
        position: 'Graphic designer',
        comment: 'Lorem ipsum is placeholder text commonly used in the graphic.'
      }
    },
    {
      id: '64d882a107970f72960079c6',
      slug: 'review-1',
      title: 'Review-1',
      metadata: {
        name: 'Edd Harris',
        image: "[Object]",
        position: 'UI/UX',
        comment: 'Lorem ipsum is placeholder text commonly used in the graphic.'
      }
    }
  ]
  const reviews = reviewsData

  return {
    props: {
      reviews,
      landing,
      categoriesGroup,
      categoryTypes,
      navigationItems,
    },
  }
}
