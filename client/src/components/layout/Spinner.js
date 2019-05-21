import React, {Fragment} from "react";
import spinner from "./spinner.gif";

export default () => {
  const style= {
    width: "200px",
    margin: "auto",
    display: "block"
  };
  
 return ( 
  <Fragment>
    <img src={spinner} alt="loading..." style={style}/>
  </Fragment>
 );
};