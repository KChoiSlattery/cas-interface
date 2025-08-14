import { MathQuillLoader } from 'mathquill-typescript';
import $ from 'jquery';
import katex from 'katex';

console.log("Running index.ts...")

$(document).ready(function () {
  const body = document.body;

  body.classList.remove('loading'); // Remove the hiding class
});

console.log("Successfully ran index.ts!")