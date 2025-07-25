import { MathQuillLoader } from 'mathquill-typescript';
import $ from 'jquery';
import 'select2';

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


$(function () {
    // Set up HTML elements in the page. They need to be casted to HTMLInputElement in order to call the .value attribute.
    // const a_input = <HTMLInputElement>document.getElementById("a_input");
    // const b_input = <HTMLInputElement>document.getElementById("b_input");
    // const calculate_button = document.getElementById("calculate_button");
    // const output_element = document.getElementById("output_element");
    const mathfield_span = document.getElementById("mathfield_span");

    // Set up event listeners.
    // calculate_button.addEventListener("click", function () {
    //     python_sum(parseFloat(a_input.value), parseFloat(b_input.value), output_element);
    // });

    MathQuillLoader.loadMathQuill({ mode: 'dev' }, mathquill => {
        var MQ = mathquill.getInterface(2);
        var mathfield = MQ.MathField(mathfield_span, {
            spaceBehavesLikeTab: false, // configurable
        });
        // mathfield.latex gets the content of the mathfield
    });

    $('.math-select').select2();
});

console.log("Successfully ran main.ts!")