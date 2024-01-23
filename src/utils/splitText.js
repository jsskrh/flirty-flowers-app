/* eslint-disable */
class SplitText {
  constructor(elements, options) {
    this.elements = this.toArray(elements);
    this.chars = [];
    this.words = [];
    this.lines = [];
    this._originals = [];
    this.vars = options || {};
    this.split(this.vars);
  }

  toArray(obj) {
    if (Array.isArray(obj)) {
      return obj;
    } else if (typeof obj === "string") {
      return Array.from(document.querySelectorAll(obj));
    } else if (obj instanceof NodeList || obj instanceof HTMLCollection) {
      return Array.from(obj);
    } else if (obj instanceof Element) {
      return [obj];
    } else {
      return [];
    }
  }

  split(options) {
    if (this.isSplit) {
      this.revert();
    }

    this.vars = options = options || this.vars;
    this._originals.length =
      this.chars.length =
      this.words.length =
      this.lines.length =
        0;

    const tag = options.tag ? options.tag : options.span ? "span" : "div";
    const wordsClass = this.createStyleClass(options.wordsClass, tag);
    const charsClass = this.createStyleClass(options.charsClass, tag);

    for (let i = this.elements.length - 1; i >= 0; i--) {
      const element = this.elements[i];
      this._originals[i] = element.innerHTML;
      const clientHeight = element.clientHeight;
      const clientWidth = element.clientWidth;
      this.wrapText(element, options, wordsClass, charsClass);
      this.processText(element, options, clientWidth, clientHeight);
    }

    this.chars.reverse();
    this.words.reverse();
    this.lines.reverse();
    this.isSplit = true;
    return this;
  }

  createStyleClass(className, tag) {
    if (!className) {
      return "";
    }
    const css = `.${className} { display: ${
      tag === "span" ? "inline" : "inline-block"
    }; position: relative; }`;
    const style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    return className;
  }

  wrapText(element, options, wordsClass, charsClass) {
    const content = element.innerHTML;
    const wordsDelimiter = options.wordDelimiter || " ";
    const nonBreakingSpace = wordsDelimiter === " " ? "&#173; " : " ";

    let result = "";
    let inWord = false;
    let charCount = 0;

    for (let i = 0; i < content.length; i++) {
      const char = content.charAt(i);

      if (char === wordsDelimiter && content.charAt(i - 1) !== wordsDelimiter) {
        result += inWord ? "</" + options.tag + ">" : "";
        inWord = false;
        charCount = 0;
      } else {
        if (!inWord) {
          result +=
            "<" +
            options.tag +
            ' class="' +
            wordsClass +
            (charCount === 0 ? "" : charCount) +
            '">';
          inWord = true;
        }
        result += char;
        charCount++;
      }
    }

    result += inWord ? "</" + options.tag + ">" : "";
    element.innerHTML = result;
  }

  processText(element, options, clientWidth, clientHeight) {
    const content = element.childNodes;
    const numNodes = content.length;
    const isAbsolute = this.isAbsolutePosition(options);
    const wordDelimiter = options.wordDelimiter || " ";

    let lineHeight = 0;
    let lineWidth = 0;
    let currentLine = [];

    for (let i = 0; i < numNodes; i++) {
      const node = content[i];

      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.className.includes(options.wordsClass)) {
          this.words.push(node);
        } else if (node.className.includes(options.charsClass)) {
          this.chars.push(node);
          node.style.display = "inline";
          node.style.position = isAbsolute ? "absolute" : "relative";
          node.style.width = node.offsetWidth + 1 + "px"; // Add 1px to prevent collapsing inline blocks
          node.style.height = node.offsetHeight + "px";

          if (isAbsolute) {
            if (
              i === 0 ||
              (i > 0 &&
                content[i - 1].nodeType === Node.ELEMENT_NODE &&
                content[i - 1].tagName !== "BR")
            ) {
              node.style.top = "0px";
              node.style.left = lineWidth + node.offsetWidth + "px";
            }
          } else {
            if (
              i === 0 ||
              (i > 0 &&
                content[i - 1].nodeType === Node.ELEMENT_NODE &&
                content[i - 1].tagName !== "BR")
            ) {
              node.style.top = "0px";
              node.style.left = "0px";
            }
          }

          lineWidth += node.offsetWidth;

          if (wordDelimiter !== " " && node.textContent === wordDelimiter) {
            lineWidth += 1;
          }
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const words = text.split(wordDelimiter);
        const numWords = words.length;

        for (let j = 0; j < numWords; j++) {
          const word = words[j];
          const wordNode = document.createElement(options.tag);
          wordNode.className = options.wordsClass;
          wordNode.textContent = word;
          this.words.push(wordNode);

          if (isAbsolute) {
            wordNode.style.position = "absolute";
            wordNode.style.top = "0px";
            wordNode.style.left = lineWidth + wordNode.offsetWidth + "px";
          } else {
            wordNode.style.position = "relative";
            wordNode.style.top = "0px";
            wordNode.style.left = "0px";
          }

          if (lineWidth > clientWidth) {
            lineWidth = 0;
            lineHeight += clientHeight;
            currentLine.forEach((charNode) => {
              charNode.style.top = lineHeight + "px";
            });
            currentLine = [];
          }

          lineHeight = Math.max(lineHeight, clientHeight);

          if (j === 0 || (j > 0 && wordDelimiter !== " ")) {
            lineWidth += wordNode.offsetWidth;
          }

          currentLine.push(wordNode);
        }
      }
    }

    this.lines.push(...currentLine);
  }

  isAbsolutePosition(options) {
    return options.position === "absolute" || options.absolute === true;
  }

  revert() {
    if (!this._originals) {
      throw "revert() call wasn't scoped properly.";
    }

    this.elements.forEach((element, index) => {
      element.innerHTML = this._originals[index];
    });

    this.chars = [];
    this.words = [];
    this.lines = [];
    this.isSplit = false;
    return this;
  }

  static create(elements, options) {
    return new SplitText(elements, options);
  }
}

export default SplitText;
