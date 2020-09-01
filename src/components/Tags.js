import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Tags = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  max-width: 100%;
  padding: 10px 0;
`
const Tag = styled.button`
  border: none;
  padding: 10px 15px;
  color: #444;
  background-color: #f8f8f8;
  margin: 0 5px;
  border-radius: 10px;
  cursor: pointer;
`
const Form = styled.form`
  display: flex;
`
const TagInput = styled.input`
  padding: 10px 15px;
  min-width: 65px;
  border: none;
  color: #444;
  background-color: #f8f8f8;
  width: ${p => p.width * 8}px;
`
const Select = styled.select`
  margin-left: 15px;
  padding: 5px;
  background-color: #f8f8f8;
  border: 1px solid transparent;
  text-transform: capitalize;
  cursor: pointer;
`
const Option = styled.option``

export default ({ tags = [], onTagsChange, tagOptions }) => {
  const [showTagInput, setShowTagInput] = useState(false)
  const [tagValue, setTagValue] = useState("")

  const onAddTag = tag => onTagsChange([tag, ...tags.filter(t => t !== tag)])
  const onRemoveTag = tag => onTagsChange(tags.filter(t => t !== tag))

  useEffect(() => {
    if (showTagInput) {
      document.getElementById("tag-input").focus()
    }
  }, [showTagInput])

  return (
    <Tags>
      {showTagInput && (
        <Form
          onBlur={() => {
            setTimeout(() => {
              if (
                document.getElementById("tag-dropdown") ===
                document.activeElement
              )
                return
              if (tagValue) onAddTag(tagValue)
              setShowTagInput(false)
            }, 100)
          }}
          onSubmit={e => {
            e.preventDefault()
            onAddTag(tagValue)
            setShowTagInput(false)
          }}
        >
          <TagInput
            id="tag-input"
            placeholder="Free text"
            onChange={e => setTagValue(e.target.value)}
            width={tagValue.length}
          />
          <Select
            id="tag-dropdown"
            onChange={e => {
              onAddTag(e.target.value)
              setShowTagInput(false)
            }}
          >
            <Option value="" selected disabled hidden>
              Select filter
            </Option>
            {tagOptions.map(option => (
              <Option>{option}</Option>
            ))}
          </Select>
        </Form>
      )}
      {!showTagInput && (
        <Tag onClick={() => setShowTagInput(true)}>+ Filter search</Tag>
      )}
      {tags.map(tag => (
        <Tag onClick={() => onRemoveTag(tag)}>{tag} &times;</Tag>
      ))}
    </Tags>
  )
}
