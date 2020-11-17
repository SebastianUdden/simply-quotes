import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 0 -5px;
`

const AddTags = styled.div`
  display: flex;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`
const Tag = styled.button`
  border: none;
  padding: 10px 15px;
  color: #444;
  background-color: #f8f8f8;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
`
const Text = styled.span`
  white-space: nowrap;
`
const Close = styled.span`
  margin-left: 10px;
`
const Form = styled.form``
const Search = styled.input`
  padding: 9px 10px 9px 15px;
  min-width: 45px;
  border: 1px solid transparent;
  color: #444;
  background-color: #f8f8f8;
  width: ${p => p.width * 8}px;
  margin: 5px;
`
const Select = styled.select`
  appearance: none;
  padding: 5px 35px 5px 15px;
  margin: 5px;
  color: #444;
  border-radius: 10px;
  background-color: #f8f8f8;
  border: 1px solid transparent;
  text-transform: capitalize;
  background-image: ${p =>
    `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${p.arrowHexColor}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`};
  background-repeat: no-repeat, repeat;
  background-position: right 15px top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  cursor: pointer;
`
const Option = styled.option``

export default ({ tags = [], onTagsChange, tagOptions }) => {
  const [defaultSelected, setDefaultSelected] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [tagValue, setTagValue] = useState("")
  const [width, setWidth] = useState(tagValue.length)

  const onAddTag = tag => onTagsChange([tag, ...tags.filter(t => t !== tag)])
  const onRemoveTag = tag => onTagsChange(tags.filter(t => t !== tag))

  useEffect(() => {
    if (showSearch) {
      document.getElementById("search").focus()
    }
  }, [showSearch])

  return (
    <Wrapper>
      <AddTags>
        <Select
          id="filter"
          arrowHexColor="444"
          onChange={e => {
            onAddTag(e.target.value)
            setDefaultSelected(false)
            setTimeout(() => setDefaultSelected(true), 10)
          }}
        >
          <Option value="" selected={defaultSelected} disabled>
            Add Filter
          </Option>
          {tagOptions.map(option => (
            <Option>{option}</Option>
          ))}
        </Select>
        {/* {!showSearch && <Tag onClick={() => setShowSearch(true)}>Search</Tag>}
        {showSearch && (
          <Form
            onBlur={() => {
              if (tagValue) {
                onAddTag(tagValue)
                setTagValue("")
              }
              setShowSearch(false)
            }}
            onSubmit={e => {
              e.preventDefault()
              onAddTag(tagValue)
              setTagValue("")
              setShowSearch(false)
            }}
          >
            <Search
              id="search"
              placeholder="Search"
              onChange={e => setTagValue(e.target.value)}
              width={tagValue.length}
            />
          </Form>
        )} */}
      </AddTags>
      <Tags>
        {tags.map(tag => (
          <Tag onClick={() => onRemoveTag(tag)}>
            <Text>{tag}</Text>
            <Close>&times;</Close>
          </Tag>
        ))}
      </Tags>
    </Wrapper>
  )
}
