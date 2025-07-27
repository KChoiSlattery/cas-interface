import { MathQuillLoader } from 'mathquill-typescript';
import $ from 'jquery';
import katex from 'katex';

const select2 = require('select2');
select2($);

console.log("Running main.ts...")

// Define functions that call the Python app.
// function python_sum(a: number, b: number, output_element: HTMLSpanElement) {
//     return $.ajax({
//         type: "POST",
//         url: '/python_sum',
//         contentType: 'application/json',
//         data: JSON.stringify({
//             a: a,
//             b: b
//         }),
//         traditional: true,
//         success: function (data) {
//             // optional log of output JSON
//             // console.log(data);

//             let output = JSON.parse(data);

//             if (output["error_msg"] != "") {
//                 console.error(output["error_msg"]);
//             }
//             else {
//                 output_element.innerHTML = output["output"];
//             }
//         }
//     });
// }

function load_example(mathfield: any) {
  mathfield.latex("v^2=\\mu \\left(\\frac{2}{r}-\\frac{1}{a}\\right)");
}

function fake_solve(output_span: HTMLSpanElement, copy_output_button: HTMLElement) {
  katex.render("r=\\frac{2a\\mu }{av^2+\\mu }", output_span, { output: 'mathml' });
  output_span.classList.remove('waiting');
  copy_output_button.classList.remove('hidden');

}

function format_math_select(tex) {
  if (!tex.id) {
    return tex.text;
  }
  var $tex = $(katex.renderToString(tex.text, {
    output: 'mathml',
    throwOnError: true
  }));
  return $tex;
};

$(document).ready(function () {
  const body = document.body;
  const mathfield_span = document.getElementById("mathfield_span");
  const example_button = document.getElementById("example_button");
  const solve_button = document.getElementById("solve_button");
  const output_span = document.getElementById("output_span");
  const copy_output_button = document.getElementById("copy_output_button");

  MathQuillLoader.loadMathQuill({ mode: 'dev' }, mathquill => {
    var MQ = mathquill.getInterface(2);
    var mathfield = MQ.MathField(mathfield_span, {
      spaceBehavesLikeTab: false, // configurable
    });

    example_button.addEventListener("click", function () {
      load_example(mathfield);
    });

    solve_button.addEventListener("click", function () {
      fake_solve(output_span, copy_output_button);
    });
  });

  $('.math-select').select2({
    templateResult: format_math_select,
    templateSelection: format_math_select,
    minimumResultsForSearch: 20
  });

  body.classList.remove('loading'); // Remove the hiding class
});

console.log("Successfully ran main.ts!")