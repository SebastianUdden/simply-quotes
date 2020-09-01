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
`
const Form = styled.form``
const TagInput = styled.input`
  padding: 10px 15px;
  min-width: 65px;
  border: none;
  color: #444;
  background-color: #f8f8f8;
  width: ${p => p.width * 8}px;
`

export default ({ tags = [], onTagsChange }) => {
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
          onSubmit={e => {
            e.preventDefault()
            onAddTag(tagValue)
            setShowTagInput(false)
          }}
        >
          <TagInput
            id="tag-input"
            onChange={e => setTagValue(e.target.value)}
            width={tagValue.length}
          />
        </Form>
      )}
      {!showTagInput && (
        <Tag onClick={() => setShowTagInput(true)}>+ Add filter</Tag>
      )}
      {tags.map(tag => (
        <Tag onClick={() => onRemoveTag(tag)}>{tag}</Tag>
      ))}
    </Tags>
  )
}
