import React, { useState } from "react";

function useForceUpdate() {
  const [value, setValue] = useState();

  return () => setValue((value) => value + 1);
}

export default useForceUpdate;
