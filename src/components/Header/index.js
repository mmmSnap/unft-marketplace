import React, { useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import AppLink from '../AppLink'
import Icon from '../Icon'
import Image from 'next/image'
import User from './User'
import Theme from '../Theme'
import Modal from '../Modal'
import OAuth from '../OAuth'
import { useStateContext } from '../../utils/context/StateContext'
import { getToken } from '../../utils/token'
import { navbarMenuItems } from './consts/headerConst'
import styles from './Header.module.sass'
import {signIn} from "next-auth/react";

const Headers = ({ navigation }) => {
  const [visibleNav, setVisibleNav] = useState(false)
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)

  const { cosmicUser, setCosmicUser } = useStateContext()

  const handleOAuth = useCallback(
    user => {
      !cosmicUser.hasOwnProperty('id') &&
        user?.hasOwnProperty('id') &&
        setCosmicUser(user)
    },
    [cosmicUser, setCosmicUser]
  )

  useEffect(() => {
    let isMounted = true
    const uNFTUser = getToken()

    if (
      isMounted &&
      !cosmicUser?.hasOwnProperty('id') &&
      uNFTUser?.hasOwnProperty('id')
    ) {
      setCosmicUser(uNFTUser)
    }

    return () => {
      isMounted = false
    }
  }, [cosmicUser, setCosmicUser])

  return (
    <>
      <header className={styles.header}>
        <div className={cn('container', styles.container)} aria-hidden="true">
          <AppLink className={styles.logo} href="/">
            <Image
              width={396}
              height={140}
              objectFit='contain'
              className={styles.pic}
              src={'https://cdn.discordapp.com/attachments/989739723151007764/1142453498508750868/mmojahid_mmm_text_logo_camera_mmm_text_at_bottom_white_backgrou_8759878f-0d1f-4ef2-a64c-8098313dbea8.png'}
              alt="Logo"
              priority
            />
          </AppLink>
          <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
            <nav className={styles.nav}>
              {navbarMenuItems.map((x, index) => (
                <AppLink
                  aria-label="navigation"
                  className={styles.link}
                  href={x?.url || `/search`}
                  key={index}
                >
                  {x.title}
                </AppLink>
              ))}
            </nav>
          </div>
          <div className={styles.version}>
            <Theme className="theme-big" />
          </div>
          <AppLink
            aria-label="search"
            aria-hidden="true"
            className={cn('button-small', styles.button)}
            href={`/search`}
          >
            <Icon name="search" size="20" />
            Search
          </AppLink>
          {cosmicUser?.['id'] ? (
            <User className={styles.user} user={cosmicUser} />
          ) : (
            <button
              aria-label="login"
              aria-hidden="true"
              className={cn('button-small', styles.button, styles.login)}
              onClick={() => signIn({
                callbackUrl: "/",
              })}
            >
              Login1
            </button>
          )}
          <button
            aria-label="user-information"
            aria-hidden="true"
            className={cn(styles.burger, { [styles.active]: visibleNav })}
            onClick={() => setVisibleNav(!visibleNav)}
          />
        </div>
      </header>
      <Modal
        visible={visibleAuthModal}
        onClose={() => setVisibleAuthModal(false)}
      >
        <OAuth
          className={styles.steps}
          handleOAuth={handleOAuth}
          handleClose={() => setVisibleAuthModal(false)}
        />
      </Modal>
    </>
  )
}

export default Headers
