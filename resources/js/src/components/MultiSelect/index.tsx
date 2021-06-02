import React, { useEffect, useState } from 'react'
import * as Fi from 'react-icons/fi'

import {
  Container,
  InputContainer,
  Input,
  SelectedTag,
  SelectedTags,
  SelectContainer,
  SelectList,
  SelectItem,
} from './styles'

interface MultiSelectProps {
  collection: object[]
  labelKey: string
  valueKey?: string
  name?: string
  inputId?: string
  selectedItems: object[]
  onSelect: (item: object) => void
  onRemove: (index: number) => void
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  collection,
  labelKey,
  valueKey,
  name,
  inputId,
  selectedItems,
  onSelect,
  onRemove,
}) => {
  const [showList, setShowList] = useState(false)
  const [selectionFilter, setSelectionFilter] = useState('')

  useEffect(() => {
    const listener = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement
      if (showList) {
        if (!target.matches('.keep-focus, input.keep-focus, svg.keep-focus')) {
          setShowList(false)
        }
      } else {
        if (target.matches('.keep-focus')) {
          setShowList(true)
        }
      }
    }

    window.addEventListener('click', listener)

    return () => {
      window.removeEventListener('click', listener)
    }
  }, [showList])

  return (
    <Container>
      <InputContainer className={`keep-focus ${showList ? 'focused' : ''}`}>
        <SelectedTags className="keep-focus">
          {selectedItems.map((item, index) => {
            return (
              <SelectedTag color={item['color'] ?? null} className="keep-focus" key={index}>
                {item[labelKey]}

                <span onClick={() => onRemove(index)} className="keep-focus">
                  <Fi.FiX size={14} />
                </span>
              </SelectedTag>
            )
          })}
        </SelectedTags>
        <Input
          id={inputId}
          name={name}
          onFocus={() => setShowList(true)}
          placeholder="Categorias"
          className={'keep-focus'}
          value={selectionFilter}
          onChange={(ev) => setSelectionFilter(ev.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </InputContainer>

      {showList &&
        collection
          .filter((item) => !selectedItems.includes(item))
          .filter((item) => item[labelKey].toLowerCase().includes(selectionFilter.toLowerCase()))
          .length > 0 && (
          <SelectContainer>
            <SelectList>
              {collection
                .filter((item) => !selectedItems.includes(item))
                .filter((item) =>
                  item[labelKey].toLowerCase().includes(selectionFilter.toLowerCase())
                )
                .map((item, index) => {
                  return (
                    <SelectItem
                      color={item['color'] ?? null}
                      key={index}
                      onClick={() => {
                        onSelect(valueKey ? item[valueKey] : item)
                        setShowList(false)
                        setSelectionFilter('')
                      }}
                      className="keep-focus"
                    >
                      {item[labelKey]}
                    </SelectItem>
                  )
                })}
            </SelectList>
          </SelectContainer>
        )}
    </Container>
  )
}

export default MultiSelect
