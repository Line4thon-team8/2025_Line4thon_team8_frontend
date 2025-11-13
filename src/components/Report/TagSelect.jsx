import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

export const T_POST = "post";
export const T_REVIEW = "review";

const T_OPTIONS = [
    { value: T_POST, label: "게시" },
    { value: T_REVIEW, label: "검토" },
];

const TagSelect =({
    value, //외부에서 제어할때 현재 선택값
    defaultValue = T_POST, // 기본값 게시
    onChange,
    options = T_OPTIONS, //옵션목록
    className,
}) => {
    const [selected, setSelected] = useState(value || defaultValue);
    const [open, setOpen] = useState(false);
    const ref = useRef(null); //외부 클릭 감지

  // 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        setSelected(val);
        onChange?.(val);
        setOpen(false);
    };

    const current = options.find((opt) => opt.value === selected);

    return (
        <TagSelectWrap ref={ref} className={className}>
        <TagSelectBtn className="ts-btn" onClick={() => setOpen((v) => !v)} $open={open}>
            {current?.label || "선택"}
        </TagSelectBtn>

        {open && (
            <TagSelectList>
            {options.map((opt) => (
                <TagSelectItem
                    className="ts-item"
                    key={opt.value}
                    $active={opt.value === selected}
                    onClick={() => handleSelect(opt.value)}
                    >
                    {opt.label}
                </TagSelectItem>
            ))}
            </TagSelectList>
        )}
        </TagSelectWrap>
    );
}

export default TagSelect;

const TagSelectWrap = styled.div`
    position: relative;
    display: inline-block;
`;

const TagSelectBtn = styled.button`
    width: 62px;
    background: #EFF0F3;
    padding: 3px 16px;
    border-radius: 5px;
    border: none;

    color: #000;
    font-family: "Noto Sans", Medium;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;


const TagSelectList = styled.ul`
    position: absolute;
    top: calc(100% + 7.5px);
    left: 0;

    width: 118px;
    height: 74px;
    padding: 7px 8px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const TagSelectItem = styled.li`
    list-style: none;
    width: 62px;
    height: 27px;
    padding: 3px 16px;
    border-radius: 5px;
    text-align: center;

    font-size: 15px;
    font-weight: 600;
    color: #111;
    background: #EFF0F3;
`;