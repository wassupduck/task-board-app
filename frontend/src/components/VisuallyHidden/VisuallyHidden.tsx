import styles from "./VisuallyHidden.module.css";

import React from "react";

export function VisuallyHidden({
  children,
  ...delegated
}: {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (!import.meta.env.PROD) {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keydown", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return (
    <div className={styles.wrapper} {...delegated}>
      {children}
    </div>
  );
}

export default VisuallyHidden;
