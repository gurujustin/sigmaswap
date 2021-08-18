import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: 'white';
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 500;
`


const Blurb = styled(Text)`
  color: #c2542b;
  font-size: 20px;
  font-weight: 500;
`

const StyledHero = styled.div`
  // background-image: linear-gradient(180deg, #53dee9 0%, #1fc7d4 100%);
  // background-image: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-bottom: 40px;
  padding-top: 40px;
  display: flex;
  flex-direction: row;
`

const StyledContainer = styled(Container)`
  flex: 1;
  padding-right: 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledContainer>
        <Title>{TranslateString(999, 'Invite your friends to SigmaFarm and earn rewards')}</Title>
        <Blurb>{TranslateString(999, `Earn 3% of your friends's earnings! Share this link to invite friends:`)}</Blurb>
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
