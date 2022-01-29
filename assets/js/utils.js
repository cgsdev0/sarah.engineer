export const asyncMap = async (arr, fn) => {
  return await Promise.all(arr.map(fn));
};

export function isLetter(str) {
  return (
    str.length === 1 &&
    str.match(/[|~=`;:'"a-z .0-9\s-.,<>\\\/$\-_+?\^*@!&#%\(\)\[\]{}]/i)
  );
}

export function createSpan(str, color = undefined) {
  const span = document.createElement("span");
  span.innerText = str;
  if (color) {
    span.style = `color: ${color};`;
  }
  return span;
}

export function createSpanWithClasses(str, classes = []) {
  const span = document.createElement("span");
  span.innerText = str;
  classes.forEach((clazz) => {
    span.classList.add(clazz);
  });
  return span;
}

export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
