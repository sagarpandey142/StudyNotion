import React from 'react'
import { BsArrowRightShort} from "react-icons/bs"
import BTN from './BTN'
import {TypeAnimation} from "react-type-animation"

const CodeBlock = ({position,heading,subHeading,ctabtn1,ctabtn2,codeblock,blockcolor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        {/*section 1*/}
        <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold mt-[-8px] '>
                {subHeading}
            </div>
            <div className='flex gap-7 mt-7'>
                <BTN active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex items-center'>
                          {ctabtn1.btntext}
                          <BsArrowRightShort/>
                    </div>
                </BTN>

                <BTN active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div>
                          {ctabtn2.btntext}
                    </div>
                </BTN>
            </div>
        </div>
        {/*section 2*/}
        <div className='relative h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] bg-gradient-blue  shadow-2xl '>
        <div className='hi h-[45px] w-[43px] absolute'></div>
        <div className=' relative text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold '>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

           <div className={` relative w-[90%] flex flex-col gap-2 font-bold font-mono ${blockcolor} pr-2 `}>
                <TypeAnimation 
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}

                    style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
              omitDeletionAnimation={true}
                />
          
        </div>
      </div>
    </div>
  )
}

export default CodeBlock