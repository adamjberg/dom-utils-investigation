import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </div>
  );
}
