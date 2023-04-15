import { useEffect } from "react";

export const numberToKilo = (number) => {
  const numStr = String(number);

  if (numStr.length <= 3) {
    return numStr;
  } else if (numStr.length >= 4 && numStr.length <= 5) {
    return `${numStr.slice(0, -3)}.${numStr.slice(-3, -2)}k`;
  } else if (numStr.length === 6) {
    return `${numStr.slice(0, -3)}k`;
  } else {
    return `${numStr.slice(0, -6)}M`;
  }
};


// useKeyboardAccessibility.js

function useKeyboardAccessibility(tabBtns) {
  useEffect(() => {
    function handleKeyDown(e) {
      const nextElement = e.target.nextElementSibling;
      const previousElement = e.target.previousElementSibling;

      if (e.key === "ArrowRight" && nextElement) {
        e.target.setAttribute("tabindex", "-1");
        nextElement.setAttribute("tabindex", "0");
        nextElement.focus();
      } else if (e.key === "ArrowLeft" && previousElement) {
        e.target.setAttribute("tabindex", "-1");
        previousElement.setAttribute("tabindex", "0");
        previousElement.focus();
      }
    }

    const handleKeyDownWrapper = (e) => {
      handleKeyDown(e);
    };

    tabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("keydown", handleKeyDownWrapper);
    });

    return () => {
      tabBtns.forEach((tabBtn) => {
        tabBtn.removeEventListener("keydown", handleKeyDownWrapper);
      });
    };
  }, [tabBtns]);
}

export default useKeyboardAccessibility;
