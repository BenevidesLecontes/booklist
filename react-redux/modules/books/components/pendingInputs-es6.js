import React from 'react';

export const InputForPending = props => {
    let name = props.name,
        actionName = `setPending${name[0].toUpperCase()}${name.slice(1)}`,
        parentProps = props.parentProps;
    return <input { ...props } className={`form-control ${props.className || ''}`} onKeyDown={parentProps[actionName]} onChange={parentProps[actionName]} value={parentProps.pending[name]} />;
}

export const RadioForPending = props => {
    let {name, value, parentProps, ...rest} = props,
        actionName = `setPending${name[0].toUpperCase()}${name.slice(1)}`;

    return <input { ...rest } type="radio" className={`${props.className || ''}`} onClick={parentProps[actionName]} checked={parentProps.pending[name] === value} value={value} />;
}