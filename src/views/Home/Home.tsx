import React, { useState } from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie';
import { Heading, Text, BaseLayout , Button, ToastContainer, Image} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useQueryParam, StringParam } from 'use-query-params';
import useToast from 'hooks/useToast'
import Page from 'components/layout/Page'
import Divider from 'views/Farms/components/Divider'
import { isAddress } from '../../utils/web3'
import rot13 from '../../utils/encode'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import SpecialCard from './components/SpecialCard'
import Background from '../Background'
import HomePageCountdown from '../HomePageCountdown'
import DexStats from './components/DexStats';
import LpStats from './components/LpStats';

const Hero = styled.div`
  align-items: center;

  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 0px;
  text-align: center;

`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`




const Home: React.FC = () => {
  const TranslateString = useI18n()
  const cookies = new Cookies();
  const [ref, setNum] = useQueryParam('ref', StringParam);

  if(ref) {
    if(isAddress(rot13(ref))) {
      cookies.set("ref", ref)
    }
  }

  return (
    <>

    <Page>
      <Hero>
        <Image src='/images/egg/LogoTextNewDark.png' alt='logo' width={250} height={52}  />
        <Text mt="16px" mb="16px">Built by Sigma Farmers, Built for Sigma Farmers</Text>
      
      </Hero>

      <div>
          {/* <SpecialCard /> */}
        <Cards>
          <FarmStakingCard />
          <TwitterCard/>
          <CakeStats />
          <div>
            <LpStats />
            <TotalValueLockedCard />
          </div>
        </Cards>
      </div>
    </Page>
    {/* <Background/> */}

    </>
    )
  }
    
  export default Home
    