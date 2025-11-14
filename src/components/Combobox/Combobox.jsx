// src/components/Combobox/Combobox.jsx
import { useState } from "react";
import { IgrComboModule, IgrCombo } from "igniteui-react";
import styled from "styled-components";
import "igniteui-webcomponents/themes/light/bootstrap.css";

IgrComboModule.register();

const Combobox = ({
  options = [],
  valueKey = "id",
  displayKey = "name",
  placeholder = "",
  singleSelect = true,
  value,           // 선택값 (controlled)
  defaultValue = [], // uncontrolled 초기값
  onChange,        // (id, item) 또는 (ids, items)
}) => {
  const [internal, setInternal] = useState(
    value !== undefined ? (Array.isArray(value) ? value : [value]) : defaultValue
  );
  const selected =
    value !== undefined ? (Array.isArray(value) ? value : [value]) : internal;

  const handleSelectionChanged = (sender, args) => {
    const newSel = args.newSelection ?? [];
    console.log("[Combobox] newSelection:", newSel);

    // 내부 상태 업데이트 (uncontrolled일 때만)
    if (value === undefined) setInternal(newSel);

    if (singleSelect) {
      const id = newSel[0] ?? null;
      const item = options.find((o) => o[valueKey] === id) ?? null;
      console.log("[Combobox] single select ->", id, item);
      onChange?.(id, item);
    } else {
      const items = options.filter((o) => newSel.includes(o[valueKey]));
      console.log("[Combobox] multi select ->", newSel, items);
      onChange?.(newSel, items);
    }
  };

  return (
    <ComboboxWrap>
      <StyledCombo
        data={options}
        valueKey={valueKey}
        displayKey={displayKey}
        placeholder={placeholder}
        singleSelect={singleSelect}
        value={selected}
        selectionChanged={handleSelectionChanged}
      />
    </ComboboxWrap>
  );
};

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

  &::part(toggle-icon),
  &::part(suffix) {
    background: transparent !important;
    color: #5a5e6b !important;
  }

  &::part(clear-icon) {
    display: none !important;
  }
`;