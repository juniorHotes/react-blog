import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { Container } from './styles'

import ArrowLeft from '../../assets/icons/bx-arrow-to-left.svg'
import ArrowRight from '../../assets/icons/bx-arrow-to-right.svg'

export default function PageNavigation({ url, count, set }) {
    return (
        <Container >
            <Button as={Link} to={url + 1} onClick={() => set(1)}>
                <img width='20px' src={ArrowLeft} />
            </Button>

            {[...Array(count)].map((_, idx) => {
                idx++
                return (
                    <Button as={Link}
                        key={idx}
                        to={url + idx}
                        onClick={() => set(idx)}
                    >{idx}</Button>
                )
            })}

            <Button as={Link} to={url + count} onClick={() => set(count)}>
                <img width='20px' src={ArrowRight} />
            </Button>
        </Container>
    )
}