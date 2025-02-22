import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { heroSectionInfo, commonButton } from './descriptionsConst'
import styles from './Description.module.sass'

const Description = ({}) => {
  const { push } = useRouter()

  const handleClick = href => {
    push(href)
  }

  return (
    <div className={styles.section}>
      <div className={cn('container', styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>
            {heroSectionInfo?.metadata?.subtitle}
          </div>
          <h1 className={cn('h1', styles.title)}>
            {heroSectionInfo?.metadata?.title}
          </h1>
          <div className={styles.text}>
            {heroSectionInfo?.metadata?.description}
          </div>
          <div className={styles.btns}>
            <button
              aria-hidden="true"
              onClick={() => handleClick(`/search`)}
              className={cn('button-stroke', styles.button)}
            >
              {commonButton.explore}
            </button>
            <button
              aria-hidden="true"
              onClick={() => handleClick('/upload-details')}
              className={cn('button', styles.button)}
            >
              {commonButton.getPhotoGrapher}
            </button>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.heroWrapper}>
            <Image
              quality={60}
              className={styles.preview}
              layout="fill"
              src={heroSectionInfo?.metadata?.image?.imgix_url}
              placeholder="blur"
              blurDataURL={`${heroSectionInfo?.metadata?.image?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
              objectFit="cover"
              alt="Team"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description
