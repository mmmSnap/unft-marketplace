import React, { useState } from 'react'
import cn from 'classnames'
import AppLink from '../AppLink'
import styles from './Card.module.sass'
import Icon from '../Icon'
import Image from '../Image'
import { cardConst } from './cardConst'

const Card = ({ className, item }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className={cn(styles.card, className)} aria-hidden="true">
      <AppLink className={styles.link} href={`/item/${item?.slug}` || '/'}>
        <div className={styles.preview}>
          <Image
            size={{ width: '100%', height: '360px' }}
            src={item?.images?.[0]??'https://cdn.discordapp.com/attachments/989739723151007764/1142453498508750868/mmojahid_mmm_text_logo_camera_mmm_text_at_bottom_white_backgrou_8759878f-0d1f-4ef2-a64c-8098313dbea8.png'}
            alt="Card"
            objectFit="cover"
          />
          <div className={styles.control}>
            <div className={styles.category}>{item?.name.substring(0, 10)}</div>
            <button
              className={cn(styles.favorite, { [styles.active]: visible })}
              onClick={() => setVisible(!visible)}
            >
              <Icon name="heart" size="20" />
            </button>
            <button className={cn('button-small', styles.button)}>
              <span>{`${item?.name}`.substring(0, 10) }</span>
              <Icon name="scatter-up" size="16" />
            </button>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            <p>{cardConst.name} :{`${item?.name}`.substring(0, 10) }</p>
            <p className={styles.count}>
              {item?.rating_count > 0
                ? `${cardConst.photCount} -${item?.rating_count} Items`
                : 'Not Available'}
            </p>
          </div>
          <div
            className={styles.bid}
            dangerouslySetInnerHTML={{ __html: item?.rating_count??0 }}
          />
          <span className={styles.price}>{`${cardConst.rating} ${item?.rating}`}</span>
        </div>
      </AppLink>
    </div>
  )
}

export default Card
