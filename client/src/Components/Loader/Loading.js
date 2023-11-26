import React from "react";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";

const Loading = () => {
  const override = css`
    margin-bottom: 5px;
  `;

  return (
    <PropagateLoader
      css={override}
      color={"black"}
      size={10}
      loading={true} // or just loading without assigning it to a variable
    />
  );
};

export default Loading;
