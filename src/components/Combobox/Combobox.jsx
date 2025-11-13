import { useState } from "react"
import { IgrComboModule, IgrCombo } from "igniteui-react";
import styled from "styled-components";
import "igniteui-webcomponents/themes/light/bootstrap.css";

IgrComboModule.register();

const Combobox = ({
    options = [],
    valueKey = 'id',
    displayKey = 'name',
    placeholder = '', 
    singleSelect = true, 
    value, //선택값
    defaultValue = [], //uncontrolled 초기값
    onChange, //(id, item) => {}
}) => {
    const [internal, setInternal] = useState(
            value !== undefined ? (Array.isArray(value) ? value : [value]) : defaultValue
        );
    const selected = value !== undefined ? (Array.isArray(value) ? value : [value]) : internal;
    
    return (
        <ComboboxWrap>
            <StyledCombo
                data={options}
                valueKey={valueKey}
                displayKey={displayKey}
                placeholder={placeholder}
                singleSelect={singleSelect}
                value={selected}
                onSelectionChanged={(e)=>{
                    const newSel = e.detail.newSelection ?? [];
                    if (value===undefined) setInternal(newSel);

                    if(singleSelect){
                        const id = newSel[0] ?? null;
                        const item = options.find(o => o[valueKey] === id) ?? null;
                        onChange?.(id, item);
                    } else{
                        const items = options.filter(o => newSel.includes(o[valueKey]));
                        onChange?.(newSel, items);
                    }
                }}
            />
        </ComboboxWrap>
    )
}

export default Combobox;

const ComboboxWrap = styled.div`
    width: 427px;
    height: 43px;
    background: #fff;
    border-radius: 10px;

    display: flex;
    align-items: center;
`;

const StyledCombo = styled(IgrCombo)`
    width: 100%;
    height: 100%;

    /* 보더/밑줄 전부 제거 */
     --ig-input-border-color: transparent;
     
    &::part(input) {
        color: #111;
        font-size: 14px;
        font-family: "Noto Sans", Regular;
        font-weight: 500;
    }

    &::part(container),
    &::part(control) {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
    }

    /* ▼ 이 부분이 핵심 ▼ */
    &::part(toggle-icon),
    &::part(suffix) {
        background: transparent !important;
        color: #5A5E6B !important;
    }

    &::part(clear-icon) {
    display: none !important;
  }
`;

