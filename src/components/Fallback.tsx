import React from 'react';

import { Button } from './index'

interface FallbackProps {
  error: any;
  resetErrorBoundary: () => void;
}

const Fallback: React.FC<FallbackProps> = ({error, resetErrorBoundary}) => {
  return (
  <div role="alert" className="flex flex-1 flex-col justify-center items-center">
    <span className="mt-4 mb-2 font-bold text-xl">Oops an error has ocurred </span>
    <pre className="mt-2 mb-4" style={{ color: "red"}}>{error.message}</pre>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </div>
  )
};

export default Fallback;