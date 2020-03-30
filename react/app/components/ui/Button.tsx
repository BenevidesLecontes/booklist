import React, { useState, useRef, useLayoutEffect, FC, Children, useEffect } from "react";

const cssPresets = {};
const buttonTypes = ["default", "primary", "success", "info", "warning", "danger"];
const buttonSizes = ["lg", "sm", "xs"];

buttonTypes.forEach(t => {
  cssPresets[t] = `btn-${t}`; //default size
  buttonSizes.forEach(s => {
    cssPresets[`${t}-${s}`] = `btn-${t} btn-${s}`;
  });
});

const cssFromPreset = props => (props.className || "") + " btn " + (cssPresets[props.preset] || props.css || "");

export const Button = props => (
  <button className={cssFromPreset(props)} style={{ ...props.style }} onClick={props.onClick} disabled={props.disabled}>
    {props.children}
  </button>
);

export const AnchorButton = props => (
  <a className={cssFromPreset(props)} style={{ ...props.style }} onClick={props.onClick}>
    {props.children}
  </a>
);

export const AjaxButton = props => {
  const controlled = props.hasOwnProperty("running");
  const [isRunning, setRunning] = useState(controlled ? props.running : false);
  const { style = {} } = props;

  if (!controlled) {
    return <AjaxButtonUnControlled {...props} />;
  }

  const onClick = (...args) => {
    if (controlled) {
      props.onClick(...args);
    } else {
      setRunning(true);
      Promise.resolve(props.onClick(...args)).then(() => setRunning(false));
    }
  };

  let isRunningAdjusted = controlled ? props.running : isRunning;

  return isRunningAdjusted ? (
    <button style={style} className={cssFromPreset(props)} disabled={true}>
      <i className="fa fa-fw fa-spin fa-spinner" />
      {props.runningText || props.text ? " " + props.runningText || props.text : props.children}
    </button>
  ) : (
    <button style={style} className={cssFromPreset(props)} disabled={props.disabled || false} onClick={onClick}>
      {props.children}
    </button>
  );
};

const AjaxButtonUnControlled = props => {
  const [isRunning, setRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const mounted = useRef(true);

  useLayoutEffect(() => () => (mounted.current = false), []);

  const onClick = (...args) => {
    setRunning(true);
    Promise.resolve(props.onClick(...args)).then(() => {
      if (!mounted.current) {
        return;
      }
      setFinished(true);
      setRunning(false);
      setTimeout(() => mounted.current && setFinished(false), 2000);
    });
  };

  const { onClick: unused, className, runningText, finishedText, children, ...allRemainingProps } = props;
  const { disabled, ...allNonDisabledProps } = allRemainingProps;

  return isRunning ? (
    <button className={cssFromPreset(props)} disabled={true} {...allNonDisabledProps}>
      {runningText || props.children}
      <i className="fa fa-fw fa-spin fa-spinner" style={{ marginLeft: "3px" }} />
    </button>
  ) : isFinished ? (
    <button className={cssFromPreset(props)} onClick={onClick} disabled={true} {...allNonDisabledProps}>
      {finishedText || props.children}
      <i className="fa fa-fw fa-check" style={{ marginLeft: "3px" }} />
    </button>
  ) : (
    <button className={cssFromPreset(props)} onClick={onClick} {...allRemainingProps}>
      {props.children}
    </button>
  );
};

type ActionButtonType = {
  className?: any;
  style?: any;
  baseWidth?: any;
  onClick: any;
  text: any;
  disabled?: boolean;
  preset?: string;
  runningText?: string;
  finishedText?: string;
  icon?: string;
};

export const ActionButton: FC<ActionButtonType> = props => {
  const active = useRef(true);
  const { style: originalStyle = {}, onClick: clickFn, text, disabled, icon, baseWidth, finishedText } = props;
  const [isRunning, setRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);

  useEffect(() => {
    return () => {
      active.current = false;
    };
  }, []);

  const style = {
    minWidth: baseWidth || `${text.length + 2}ch`,
    ...originalStyle
  };

  const iconStyles = {
    marginLeft: text.length ? "3px" : void 0
  };
  const finishedIconStyles = {
    marginLeft: text.length ? "5px" : void 0
  };

  const runningText = props.hasOwnProperty("runningText") ? props.runningText : props.text;

  const onClick = (...args) => {
    let result = clickFn(...args);
    
    if (!result.then){
      return;
    }
    
    setRunning(true);
    Promise.resolve(result).then(() => {
      if (!active.current) {
        return;
      }
      if (finishedText) {
        setFinished(true);
        setTimeout(() => {
          if (active.current) {
            setFinished(false);
            setRunning(false);
          }
        }, 2000);
      } else {
        setRunning(false);
      }
    });
  };

  return (
    <button
      onClick={onClick}
      style={style}
      disabled={isRunning || isFinished || disabled || false}
      className={cssFromPreset(props) + " bl-action-button"}
    >
      {isFinished ? finishedText : isRunning ? runningText || text : text}
      {isFinished ? (
        <i style={finishedIconStyles} className="fal fa-check" />
      ) : isRunning ? (
        <i style={iconStyles} className="fa fa-fw fa-spin fa-spinner" />
      ) : icon ? (
        <i style={iconStyles} className={icon} />
      ) : null}
    </button>
  );
};
