/* eslint-disable */
export function splitText(element, options) {
  function createWrapper() {
    return `<${elementTag} style='position:relative;display:inline-block;'>`;
  }

  function isAbsolutePositioned(el) {
    return el.style.position === "absolute" || el.absolute === true;
  }

  function findDelimiterIndex(text, delimiters) {
    for (let i = delimiters.length - 1; i >= 0; i--) {
      if (text.startsWith(delimiters[i])) return i;
    }
    return -1;
  }

  function removeDoublePlus(input) {
    return input.replace(/\+\+/g, "");
  }

  function traverseAndSplit(node) {
    const nodeType = node.nodeType;
    if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
      if (typeof node.textContent === "string") {
        return node.textContent;
      }
      let textContent = "";
      for (node = node.firstChild; node; node = node.nextSibling) {
        textContent += traverseAndSplit(node);
      }
      return textContent;
    } else if (nodeType === 3 || nodeType === 4) {
      return node.nodeValue.split(delimitersRegExp).join(delimiter);
    }
    return "";
  }

  function splitTextNodes(element, delimiters) {
    const childNodes = Array.from(element.childNodes);

    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];
      if (childNode.nodeType === 3) {
        const text = childNode.nodeValue;
        const delimiterIndex = findDelimiterIndex(text, delimiters);
        if (delimiterIndex !== -1) {
          const parts = text.split(delimiters[delimiterIndex]);
          const wrapper = createWrapper();
          element.insertBefore(wrapper, childNode);
          let isFirstPart = true;
          parts.forEach((part) => {
            if (part !== "") {
              if (!isFirstPart) {
                const space = document.createTextNode(" ");
                element.insertBefore(space, childNode);
              }
              const textNode = document.createTextNode(part);
              wrapper.appendChild(textNode);
              isFirstPart = false;
            }
          });
          element.removeChild(childNode);
        }
      } else if (childNode.nodeType === 1) {
        splitTextNodes(childNode, delimiters);
      }
    }
  }

  function wrapLines(element) {
    const wrapper = document.createElement(elementTag);
    wrapper.style.cssText = `display:block;text-align:${textAlign};position:${
      isAbsolute ? "absolute" : "relative"
    };`;

    if (linesClass) {
      wrapper.className = linesClass;
    }

    const lines = [];
    let currentLine = [];

    for (let i = 0; i < element.childNodes.length; i++) {
      const childNode = element.childNodes[i];
      if (childNode._isSplit) {
        if (childNode._wordEnd) {
          currentLine.push(childNode);
        }
      } else if (childNode.nodeName === "BR" || isLineBreak(childNode)) {
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        currentLine = [];
      } else {
        currentLine.push(childNode);
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    lines.forEach((lineNodes, index) => {
      if (index > 0) {
        const lineBreak = document.createElement("br");
        wrapper.appendChild(lineBreak);
      }
      lineNodes.forEach((node) => {
        wrapper.appendChild(node);
      });
    });

    element.appendChild(wrapper);
  }

  const elementTag = options.tag || (options.span ? "span" : "div");
  const isAbsolute = isAbsolutePositioned(options);
  const delimiters = options.wordDelimiter || " ";
  const delimiter =
    delimiters === " " ? (isAbsolute ? "&#173; " : " ") : delimiters;
  const delimitersRegExp = new RegExp(
    delimiters === " " ? /\s\s+/g : `[${delimiters}]`
  );
  const textAlign = options.textAlign || "left";
  const linesClass = options.linesClass || "";
  const lines = options.type || options.split || "chars,words,lines";

  const elements = Array.isArray(element) ? element : [element];

  elements.forEach((el) => {
    if (el && el.childNodes.length > 0) {
      const textContent = traverseAndSplit(el);
      el.innerHTML = "";
      const wrapper = document.createElement(elementTag);
      wrapper.style.cssText = `position:relative;display:inline-block;`;
      el.appendChild(wrapper);
      splitTextNodes(wrapper, delimiters);
      wrapLines(wrapper);
    }
  });
}

// Example usage:
// splitText(document.getElementById('myElement'), { span: true });
