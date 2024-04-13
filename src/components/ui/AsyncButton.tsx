import { Button, ButtonProps } from "@/components/ui/button";
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
type Props = ButtonProps & {
  onClick?: (e: React.MouseEvent) => void;
  loadingText?: string;
  loading?: boolean;
  disabled?: boolean;
};

const AsyncButton = ({
  onClick = async () => await new Promise((resolve) => setTimeout(resolve, 4000)),
  children, loading, disabled, loadingText, ...rest
}: React.PropsWithChildren<Props>) => {
  const [isLoading, setIsLoading] = useState(loading);

  const handleClick = async (e: React.MouseEvent) => {
    if (!onClick) return;
    setIsLoading(true);

    try {
      await onClick(e);
    } catch (error) {
    }

    setIsLoading(false);
  };

  return (
    <Button type="submit" onClick={handleClick} disabled={isLoading || disabled} className="flex items-center gap-4" {...rest}>
      {isLoading ? loadingText : children}
      {isLoading && <ReactLoading type="spin" color="#fff" height={20} width={20} />}
    </Button>
  );
};

export default AsyncButton;