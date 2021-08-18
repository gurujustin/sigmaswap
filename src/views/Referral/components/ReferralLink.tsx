import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Link, Text, Heading } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import copy from 'copy-to-clipboard';
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import rot13 from '../../../utils/encode'

const StyledLink = styled(Link)`
    cursor: pointer;
    align-self: center;
    margin: 0px auto;
`

const StyledFooter = styled(CardFooter)`
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
  min-height: 85px;
`

const StyledButton = styled(Button)`
    color: ${(props) => props.theme.colors.primary};
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    height: 32px;
    padding: 0px 16px;
    opacity: 1;

    &:hover {
        background-color: transparent !important;
        opacity: 0.8;
    }

    &:focus {
        box-shadow: none;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`

const ReferralLink = () => {
    const { account }: { account: string } = useWallet()
    const [text, setText] = useState("Copy");

    const { toastSuccess } = useToast()

    const onClick = () => {
        copy(`https://sigmafarm.finance/?ref=${rot13(account)}`);

        setText("Copied");
        toastSuccess('', 'Copied')
        setTimeout(() => { 
            setText("Copy"); 
        }, 1000);
    }

    return (
        <Card>
            <CardBody>
                <Container>
                    <Heading size="sm">Your Referral Link</Heading>
                    <StyledButton onClick={onClick}>{text}</StyledButton>
                </Container>
            </CardBody>
            <StyledFooter>
                <StyledLink>{`https://sigmafarm.finance/?ref=${rot13(account)}`}</StyledLink>
            </StyledFooter>
        </Card>
    )
}

export default ReferralLink
