import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Link, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import useI18n from 'hooks/useI18n'

interface TitledLink{
    title:string;
    link:string
}

interface LinksModalProps {
    title:string;
    links:TitledLink[]
}

const LinksModal: React.FC<LinksModalProps> = ({title, links}) => {
  const TranslateString = useI18n()

  return (
    <Modal title={title} >
        {links.map((link) => 
            <>
            <h2>{link.title}</h2>
            <Link href={link.link} target="blank"/>
            </>)
     }
    </Modal>
  )
}

export default LinksModal
