import React from 'react'
import cn from 'classnames'
import AppLink from '../AppLink'
import Group from './Group'
import Theme from '../Theme'
import Image from '../Image'
import SocialMedia from '../SocialMedia'

import styles from './Footer.module.sass'

const Footers = ({ navigation }) => {
  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.container)}>
        <div className={styles.row}>
          <div className={styles.col} aria-hidden="true">
            <AppLink className={styles.logo} href="/">
              <Image
                size={{ width: '92px', height: '92px' }}
                className={styles.pic}
                // src={navigation['logo']?.imgix_url}
                src={'https://cdn.discordapp.com/attachments/989739723151007764/1142453498508750868/mmojahid_mmm_text_logo_camera_mmm_text_at_bottom_white_backgrou_8759878f-0d1f-4ef2-a64c-8098313dbea8.png'}
                srcDark={navigation['logo']?.imgix_url}
                alt="Logo"
                objectFit="cntain"
              />
            </AppLink>
            <div className={styles.info}>The New Creative Economy.</div>
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
            <Group className={styles.group} item={navigation?.['menu']} />
          </div>
          <div className={styles.col}>
            <AppLink href={`https://makemymemories.vercel.app/about`}>
              <p className={styles.category}>About Make My Memories</p>
            </AppLink>
            <AppLink href={`https://makemymemories.vercel.app/about`}>
              <p className={styles.text}>Survey</p>
            </AppLink>
            <AppLink href={`https://makemymemories.vercel.app/contact`}>
              <p className={styles.text}>Contact Us</p>
            </AppLink>
            <SocialMedia className={styles.form} />
            <AppLink
              href={`https://cosmicjs.us5.list-manage.com/subscribe/post?u=15433aab34aefd5450c23fd94&id=028c29b6ca`}
            >
              <button
                aria-hidden="true"
                className={cn('button', styles.button)}
              >
                Subscribe Newsletter
              </button>
            </AppLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footers
