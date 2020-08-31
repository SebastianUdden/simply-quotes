import React from "react"
import styled from "styled-components"
import Quotes from "../components/Quotes"

const H1 = styled.h1`
  height: 80px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const WrapWord = styled.span`
  border-bottom: 1px solid ${p => p.color};
`
const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  max-height: 500px;
  text-align: center;
`

export default () => {
  return (
    <Container>
      <H1>
        Simply<WrapWord color="orange">Quotes</WrapWord>
      </H1>
      <Quotes />
    </Container>
  )
}
