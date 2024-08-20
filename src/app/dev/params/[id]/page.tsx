import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function Params(props: Props) {
  return <div>{props.params.id}</div>;
}
