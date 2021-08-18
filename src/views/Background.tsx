import React, { Component } from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Particles from 'react-particles-js'
import { useMediaQuery } from 'react-responsive'
// import ParticlesBg, {ConfigProp}  from 'particles-bg'
// const config : ConfigProp = {
//     num: [4, 7],
//     rps: 0.1,
//     radius: [5, 40],
//     life: [1.5, 3],
//     v: [2, 3],
//     tha: [-40, 40],
//     // body: "./img/icon.png", // Whether to render pictures
//     // rotate: [0, 20],
//     alpha: [0.6, 0],
//     scale: [1, 0.1],
//     position: "center", // all or center or {x:1,y:1,width:100,height:100}
//     color: ["random", "#ff0000"],
//     cross: "dead", // cross or bround
//     random: 15,  // or null,
//     g: 5,    // gravity
//     // f: [2, -1], // force
//     onParticleUpdate: (ctx, particle) => {
//         ctx.beginPath();
//         ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
//         ctx.fillStyle = particle.color;
//         ctx.fill();
//         ctx.closePath();
//     }
//   };
//  const Background:React.FC<unknown> = ()=>   {
//     return (
//       <>
//         <ParticlesBg type="square" num={100} color="#31D0AA" config={config} bg />
//       </>
//     )
// }

interface BackgroundProps {
    enableConsent?:boolean
}

const Background: React.FC<BackgroundProps> = (props) => {
  const {enableConsent} = props;
  const opacity = enableConsent? .1 : .3;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  return (
    <>
    {isDesktopOrLaptop?
    <Particles
      params={{
        fullScreen: {
          enable: true,
        },
        particles: {
          lineLinked:{
            enable:true,
            triangles:{
              enable:true
            }

          },
          orbit:{
            enable:true,
             opacity:0

          },
          life:{
            count:30,
            duration:{
              value:500000
            }
          },
          shape: {
            type: "none",
          },
          links: {
            frequency:10000,
            consent:enableConsent,
            enable: true,
            distance:340,
            color:'random',
            width:3,
            opacity,
            blink:false,
            warp:true,
            
            triangles:{
              enable:true,
              frequency:100000,
              opacity:0.1,
            }
          },
          color: {
            value: [
              "#ac30ff",
              "#7943ff",
              "#30acff",
              "#2aff2a",
              "#fff136",
              "#ff8534",
              "#ff3535",
              
            ],
          },
          opacity:{
            value:{
              min:opacity/10,
              max:opacity/10+.01
            },
            random:true
          },
          number: {
            value: 30,
          },
          size: {
            value: {
              min:3,
              max:8
            },
          },
          move: {
            // drift:{max:-.05, min:.05},
            enable: true,
            speed: {min:.1,max:.4},
            collisions:true,
            outMode: "bounce",
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'repulse',
            },
            
          },
        },
      }}
      />:null
     }
      </>
  )
}

//  const Background:React.FC<unknown> = ()=>   {
//     return (
//       <>
//         <ParticlesBg type="square" num={100} color="#31D0AA" config={config} bg />
//       </>
//     )
// }

export default Background
