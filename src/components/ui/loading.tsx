import React from 'react';
import ReactLoading from 'react-loading';

type Props = {
    scope?: "body" | "component";
    type?: "spokes" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles";
    color?: string;
};
const Loading = ({ scope = "body", type = "bars", color = "#2563eb", ...rest }: React.PropsWithChildren<Props>) => {
    const isBodyScope = scope === "body" as const;
    return (
        <div className={`${isBodyScope ? "fixed" : "absolute"} backdrop-blur-sm grid place-content-center inset-0 bg-white z-30`}>
            <ReactLoading type={type} color={color}  {...rest} />
        </div>
    );
};

export default Loading;