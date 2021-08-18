import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { TranslateString } from 'utils/translateTextHelpers'
import { BSC_BLOCK_TIME } from 'config'
import { getWeb3 } from 'utils/web3'
import styled from 'styled-components'
import { useMasterchef } from 'hooks/useContract'
import { CardHeader, Heading, Link } from '@pancakeswap-libs/uikit'
import { getMasterChefAddress } from 'utils/addressHelpers'
import useBlock from '../hooks/useBlock'
import getTimePeriods from '../utils/getTimePeriods'
import useBlockCountdown from '../hooks/useGetBlockCountdown'

const minuteSeconds = 60
const hourSeconds = 3600
const daySeconds = 86400

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 15,
  trailColor: '#E9EAEB',
}

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  )
}

// eslint-disable-next-line no-bitwise
const getTimeSeconds = (time) => (minuteSeconds - time) | 0
// eslint-disable-next-line no-bitwise
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0
// eslint-disable-next-line no-bitwise
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0
// eslint-disable-next-line no-bitwise
const getTimeDays = (time) => (time / daySeconds) | 0


function secondsToDhms(sec) {
    const days = Math.floor(sec / (3600*24));
    const hours = Math.floor(sec % (3600*24) / 3600);
    const minutes = Math.floor(sec % 3600 / 60);
    const seconds = Math.floor(sec % 60);
    return {days, hours, minutes, seconds};
}
const TimerBox = styled.div`
  display: flex;
  justify-content: center;
  align: center;
  font-family: sans-serif;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 40px;
`
// START BLOCK: 15751269
// END BLOCK: 18751269

const BEGIN_TIME = 1655854697; // Tue Jun 15 2021 12:45:08 GMT-0400
const HomePageCountdown =() => {
    // const currentBlock = useBlock();
    const tarBlock = 15751269
    const startTime = Date.now() / 1000
    const remainingTime = (BEGIN_TIME - startTime);
    const days = Math.ceil(remainingTime / daySeconds)

    const daysDuration = days * daySeconds
    return (
      <TimerBox>
        <Heading size="xxl" mb="24px">
          Farming starts:
        </Heading>
        {/*         
        <Heading size="xl" mb="24px" >
        {TranslateString(999, `${daysDuration} days`)}
        </Heading>
        
        <Heading size="xl" mb="24px" >
        {TranslateString(999, `${ getTimeHours(remainingTime)} hours`)}
        </Heading>
        <Heading size="xl" mb="24px" >
        {TranslateString(999, `${ getTimeMinutes(remainingTime)} minutes`)}
        </Heading>
        <Heading size="xl" mb="24px" >
        {TranslateString(999, `${ getTimeSeconds(remainingTime)} seconds`)}
    </Heading> */}

        <CountdownCircleTimer
          {...timerProps}
          colors="#51c4d3"
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime }) => renderTime('days', getTimeDays(daysDuration - elapsedTime))}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#51c4d3"
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > hourSeconds, 10]}
        >
          {({ elapsedTime }) => renderTime('hours', getTimeHours(daySeconds - elapsedTime))}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#51c4d3"
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > minuteSeconds, 10]}
        >
          {({ elapsedTime }) => renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#51c4d3"
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > 0, 10]}
        >
          {({ elapsedTime }) => renderTime('seconds', getTimeSeconds(elapsedTime))}
        </CountdownCircleTimer>
      </TimerBox>
    )
}

export default HomePageCountdown
