import { MathQuillLoader } from 'mathquill-typescript';
import $ from 'jquery';
import katex from 'katex';

const select2 = require('select2');
select2($);

console.log("Running solver.ts...")

let currently_opening_variable_selection = false;
function get_free_symbols(mathfield: any) {
  let latex = mathfield.latex();
  // console.log(latex)
  return $.ajax({
    type: "POST",
    url: '/get_free_symbols',
    contentType: 'application/json',
    data: JSON.stringify({
      latex: latex,
    }),
    traditional: true,
    success: function (data) {
      // optional log of output JSON
      // console.log(data);

      let output = JSON.parse(data);

      if (output["error_msg"] == "") {
        // Do this on successful run of the Python function
        let free_symbols = output["free_symbols"];

        // Save currently-selected option
        let current_selection = $('.math-select').select2('data')[0].id;

        // If the currently-selection option isn't in the list, add it in
        if (!free_symbols.includes(current_selection)) {
          free_symbols.push(current_selection);
        }

        // Sort the list of symbols
        free_symbols.sort();

        // Remove all options
        $('.math-select').empty().trigger("change");

        // Add all options from the list
        for (let i = 0; i < free_symbols.length; i++) {
          let new_option = new Option(free_symbols[i], free_symbols[i], false, false);
          $('.math-select').append(new_option).trigger('change');
        }

        // Select the one that was previously selected
        $('.math-select').val(current_selection);

        // Open the selection
        $('.math-select').select2('open');
      }
      else {
        // If the python function errors, just put the Python error message in the javascript terminal.
        console.error(output["error_msg"]);
        alert("Your equation is invalid. Please fix any syntax errors before selecting a variable.")
      }
    }
  });
}

function solve_equation(mathfield: any, output_span: HTMLSpanElement, copy_output_button: HTMLElement) {
  let equation_latex = mathfield.latex();
  let solve_var_latex = $('.math-select').select2('data')[0].id;

  return $.ajax({
    type: "POST",
    url: '/solve_equation',
    contentType: 'application/json',
    data: JSON.stringify({
      equation_latex: equation_latex,
      solve_var_latex: solve_var_latex
    }),
    traditional: true,
    success: function (data) {
      // optional log of output JSON
      // console.log(data);

      let output = JSON.parse(data);

      if (output["error_msg"] == "") {
        // Do this on successful run of the Python function
        let solved_equation = output["solved_equation"];

        katex.render(solve_var_latex+"="+solved_equation, output_span, { output: 'mathml' });
        output_span.classList.remove('waiting');
        copy_output_button.classList.remove('hidden');
      }
      else {
        // If the python function errors, just put the Python error message in the javascript terminal.
        let error_message = output["error_msg"];
        console.error(error_message);
        if (error_message == "ValueError('The selected variable is not in the submitted equation.')") {

          alert("The selected variable is not in the equation. Please select another variable to solve for.")
        }
        else if (error_message == "ValueError('Please enter an equation before attempting to solve.')") {
          alert("Please enter an equation before attempting to solve.")
        }
        else {
          alert("Your equation is invalid. Please fix any syntax errors before selecting a variable.")
        }
      }
    }
  });
}

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
      spaceBehavesLikeTab: true, // configurable
      // handlers: {
      // edit: function () {
      // }
      // }
    });

    example_button.addEventListener("click", function () {
      load_example(mathfield);
    });

    solve_button.addEventListener("click", function () {
      solve_equation(mathfield, output_span, copy_output_button);
    });

    // Set up variable selector
    $('.math-select').select2({
      templateResult: format_math_select,
      templateSelection: format_math_select,
      minimumResultsForSearch: 99
    });


    $('.math-select').on('select2:opening', function (e) {
      if (currently_opening_variable_selection) {
        currently_opening_variable_selection = false;
      }
      else {
        // Prevent default opening until data is ready
        e.preventDefault();

        get_free_symbols(mathfield);
        currently_opening_variable_selection = true;
      }
    });

    body.classList.remove('loading'); // Remove the hiding class
  });
});

console.log("Successfully ran solver.ts!")